var assert = require('assert');
var chai = require('chai');
var mocha = require('mocha');
var describe = mocha.describe;
var it = mocha.it;
let getAllDomains = require('../../../controllers/getAllDomains.js');
let req = { headers: {}, swagger: {} };
let res = {
    httpCode: '',
    status: function(v) { this.httpCode = v; return this; },
    send: function(a) {}
};

describe('getAllDomains positive suit', function() {
    it('should return 200 for valid domain', function() {
        getAllDomains(req, res);
        assert.equal(res.httpCode, 200);
    });
});

describe('getAllDomains negative suit', function() {
    it('should return 500 if any error', function() {});
});