'use strict'

var response = require('./res');
var connection = require('./koneksi');

exports.index = function(req, res) {
    response.ok('This app Restfull API 2 starting', res);
};