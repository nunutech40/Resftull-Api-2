'use strict'

var response = require('./res');
var connection = require('./koneksi');

exports.index = function(req, res) {
    response.ok('This app Restfull API 2 starting', res);
};

// menampilkan semua data contact
exports.getAllContact = function(req, res){
    connection.query('Select * from tb_contact', function(error, rows, fields){
        if(error) {
            connection.log(error);
        } else {
            response.ok(rows, res);
        }
    });
};

// menampilkan data contact by id
exports.getcontactbyid = function(req, res) {
    let id = req.params.id
    connection.query('select * from tb_contact where id_contact = ?', [id],
        function(error, rows, fields) {
            if(error) {
                console.log(error);
            } else {
                response.ok(rows, res)
            }
        });
}

// menambahkan data contact
exports.addcontact = function(req, res) {
    let nama = req.body.nama;
    let nope = req.body.nope;

    connection.query('Insert into tb_contact (nama, nope) values (?, ?)',
        [nama, nope],
        function (error, rows, fields){
            if(error) {
                console.log(error);
            } else {
                response.ok("Berhasil menambahkan data contact!", res)
            }
        });
}

// mengubah data contact berdasarkan id
exports.editcontact = function(req, res) {
    let id = req.body.id_contact;
    let nama = req.body.nama;
    let nope = req.body.nope;

    connection.query("update tb_contact set nama=?, nope=? where id_contact=?", 
        [nama, nope, id],
        function(error) {
            if(error) {
                console.log(error);
            } else {
                response.ok("Berhasil mengubah data", res);
            }
        });
}

// menghapus data contact by id
exports.deletecontact = function(req, res) {
    let id = req.body.id_contact
    connection.query("delete from tb_contact where id_contact=?", [id],
        function(error) {
            if(error) {
                console.log(error);
            } else {
                response.ok("Berhasil menghapus data", res)
            }
        }
    )
}