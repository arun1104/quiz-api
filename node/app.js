let express = require('express');
let fs = require('fs');
let app = express();
let cookieParser = require('cookie-parser');
let cors = require("cors");
let morgan = require("morgan");
let swaggerTools = require('swagger-tools');
let yaml = require('js-yaml');
let routes = require('./routes.js');
let path = require('path');
app.use(cookieParser());
const envConstants = require('./env.json')[process.env.NODE_ENV || 'dev'];
app.use(morgan('[:date[clf]] :method :url :status :res[content-length] - :response-time ms'));

app.use(cors({
    origin: ["*"],
    methods: ["PUT", "DELETE", "GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

const ymlPath = path.join(__dirname, '..', 'swagger.yml');
const swaggerDoc = yaml.safeLoad(fs.readFileSync(ymlPath, 'utf8'));
const options = {
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
    const port = (process.env.PORT) ? process.env.PORT : 3000;
    app.listen(port, function() {
        console.log('Your server is listening on port %d', port);
    });
});