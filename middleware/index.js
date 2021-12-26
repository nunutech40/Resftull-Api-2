var express = require('express');
var auth = require('./auth');
var router = express.Router();
var verifikasi = require('./verifikasi');

// daftarkan menu registrasi
router.post('/api/v1/register', auth.register);
router.post('/api/v1/login', auth.login);

// alamat yang perlu authorization
router.get('/api/v1/secretpage', verifikasi(), auth.secretpage);

module.exports = router;