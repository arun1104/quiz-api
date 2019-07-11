var assert = require('assert');
var chai = require('chai');
var mocha = require('mocha');
var describe = mocha.describe;
var it = mocha.it;
let addDomain = require('../../../controllers/addDomain.js');
let req = { headers: {}, swagger: {} };
let res = {
    httpCode: '',
    status: function(v) { this.httpCode = v; return this; },
    send: function(a) {}
};

describe('addDomain positive suit', function() {
    it('should return 201 for valid domain', function() {
        addDomain(req, res);
        assert.equal(res.httpCode, 201);
    });
});

describe('addDomain negative suit', function() {
    it('should return 500 if any error', function() {});
});