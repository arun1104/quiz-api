var assert = require('assert');
var chai = require('chai'),
    chaiHttp = require('chai-http');
chai.use(chaiHttp);
var mocha = require('mocha');
var describe = mocha.describe;
var it = mocha.it;
let req = { headers: {}, swagger: {} };

describe('addDomain positive suit', function() {
    it('should return 200 for valid domain', async function() {
        var res = await chai.request('http://localhost:4001').post('/v1/domain').set('Content-Type', 'application/json')
            .send({ name: '123', description: 'description' });
        assert.equal(res.status, 201);
    });
});

describe.only('addDomain negative suit', function() {
    it('should return 400 on bad request', async function() {
        try {
            var res = await chai.request('http://localhost:4001').post('/v1/domain').set('Content-Type', 'application/json')
                .send({ name1: '123', description1: 'description' });
            assert.equal(res.status, 400);
        } catch (ex) {
            assert.equal(res.status, 400);
        }

    });
});