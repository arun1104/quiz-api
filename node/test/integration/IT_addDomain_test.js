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
describe('addDomain positive suit', function() {
    it('should return 200 for valid domain', async function() {
        var res = await chai.request(url).post('/v1/domain').set('Content-Type', 'application/json')
            .send({ name: '123', description: 'description' });
        assert.equal(res.status, 201);
    });
});

describe('addDomain negative suit', function() {
    it('should return 400 on bad request', async function() {
        var res = await chai.request(url).post('/v1/domain').set('Content-Type', 'application/json')
            .send({ name1: '123', description1: 'description' });
        assert.equal(res.status, 400);
    });
});