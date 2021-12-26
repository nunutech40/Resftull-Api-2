const res = require('express/lib/response');
const jwt = require('jsonwebtoken');
const config = require('../config/secret');

function verifikasi() {
    return function(req, rest, next) {
        // cek authorization header
        var role = req.body.role;
        var tokenWithBearer = req.headers.authorization;
        if(tokenWithBearer) {
            var token = tokenWithBearer.split(' ')[1];
            console.log(role)
            // verifikasi
            jwt.verify(token, config.secrets, function(err, decoded){
                if(err){
                    return rest.status(401).send({auth: false, message: "Token tidak terdaftar", err});
                } else {
                    if(role == 2) {
                        req.auth = decoded;
                        next();
                    } else {
                        return rest.status(401).send({auth: false, message: "Gagal mengauthorisasi role anda"});
                    }
                }
            });
        } else {
            return rest.status(401).send({auth: false, message: "Token tidak tersedia"});
        }
    }
}

module.exports = verifikasi;


