'use strict'

var connection = require('../koneksi');
var mysql = require('mysql');
var md5 = require('MD5');
var response = require('../res');
var jwt = require('jsonwebtoken');
var config = require('../config/secret');
var ip = require('ip');
const e = require('express');
const conn = require('../koneksi');

// function for register
exports.register = function(req, res) {
    var post = {
        username: req.body.username,
        email: req.body.email,
        password: md5(req.body.password),
        role: req.body.role,
    }

    var query = "select email from ?? where ??=?";
    var table = ["user", "email", post.email];

    query = mysql.format(query, table);

    connection.query(query, function(error, rows){
        if(error){
            console.log(error);
            console.log("error di cek email")
        } else {
            if(rows.length == 0) {
                var query = "insert into ?? set ?";
                var table = ["user"];
                query = mysql.format(query, table);

                connection.query(query, post, function(error, rows){
                    if(error){
                        console.log(error);
                        console.log("error di insert");
                    } else {
                        response.ok("Berhasil menambahkan data user", res);
                    }
                })
            } else {
                response.ok("User sudah terdaftar, gunakan email lainnya.", res);
            }
        }
    })
}

// controller untuk login
exports.login = function(req, res) {
    var post = {
        password: req.body.password,
        email: req.body.email
    }

    var query = "Select * from ?? where ??=? And ??=?";
    var table = ["user", "password", md5(post.password), "email", post.email];

    query = mysql.format(query, table);

    connection.query(query, function(error, rows) {
        if(error) {
            console.log("error di cek data")
            console.log(error)
        } else {
            if(rows.length == 1) {
                var token = jwt.sign({rows}, config.secrets, {
                    expiresIn: 25200 // lama token untuk expired
                });
                var id = rows[0].id_user;

                var data = {
                    id_user: id,
                    akses_token: token,
                    ip_address: ip.address()
                }

                var query = "insert into ?? set ?";
                var table = ["tb_akses_token"];

                query = mysql.format(query, table);
                connection.query(query, data, function(error, rows) {
                    if(error) {
                        console.log("error di insert akses token")
                        console.log(error);
                    } else {
                        res.json({
                            success: true,
                            message: "Token JWT Generated",
                            token: token,
                            currUser: data.id_user
                        });
                    }
                });
            } else {
                res.json({"Error": true, "Message" : "Password atau email salah."})
            }
        }
    });
}

exports.secretpage = function(req, res) {
    response.ok("Halaman ini hanya untuk user dengan role = 2!",res);
}