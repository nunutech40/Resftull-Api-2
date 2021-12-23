var mysql = require('mysql');

// buat koneksi ke database
const conn = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password: '',
    database: 'contactApp'
});

conn.connect((err) => {
    if(err) throw err;
    console.log('My sql terkoneksi');
});

module.exports = conn;

