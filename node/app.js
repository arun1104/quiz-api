require('dotenv').config();
let express = require('express');
let fs = require('fs');
let app = express();
let cookieParser = require('cookie-parser');
let cors = require("cors");
let morgan = require("morgan");
let swaggerTools = require('swagger-tools');
let YAML = require('yamljs');
let routes = require('./routes.js');

app.use(cookieParser());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(cors({
    origin: ["*"],
    methods: ["PUT", "DELETE", "GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

var swaggerDoc = YAML.load('./swagger.yml');
var options = {
    controllers: routes,
    useStubs: process.env.NODE_ENV === 'development' ? true : false // Conditionally turn on stubs (mock mode)
};
// Initialize the Swagger middleware
swaggerTools.initializeMiddleware(swaggerDoc, function(middleware) {
    // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
    app.use(middleware.swaggerMetadata());

    // Validate Swagger requests
    app.use(middleware.swaggerValidator());

    // Route validated requests to appropriate controller
    app.use(middleware.swaggerRouter(options));

    // Serve the Swagger documents and Swagger UI
    app.use(middleware.swaggerUi());

    // Start the server
    app.listen(process.env.PORT || 3000, function() {
        console.log('Your server is listening on port %d (http://localhost:%d)', process.env.PORT || 3000);
    });
});