var assert = require('assert');
var chai = require('chai'),
    chaiHttp = require('chai-http');
chai.use(chaiHttp);
var mocha = require('mocha');
var describe = mocha.describe;
var it = mocha.it;
let req = { headers: {}, swagger: {} };
let serverUrl = 'http://localhost:4001';
let url = (process.env.apiUrl) ? process.env.apiUrl : serverUrl;
describe('getAllDomains positive suit', function() {
    it('should return 200', async function() {
        var res = await chai.request(url).get('/v1/domain').set('Content-Type', 'application/json')
            .send();
        assert.equal(res.status, 200);
    });
});