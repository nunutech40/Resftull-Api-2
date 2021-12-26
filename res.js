'use strict';

exports.ok = function(value, res) {
    var data = {
        'status' : 200,
        'values' : value
    };

    res.json(data);
    res.end();
}

exports.oknested = function(values, res) {
    // lakukan akumulasi
    const hasil = values.reduce((akumulasikan, item) => {
        // tentukan key group
        if(akumulasikan[item.category]){
            // buat variable group nama category
            const group = akumulasikan[item.category]
            // cek jika isi array adalah nama
            if(Array.isArray(group.nama)) {
                // tambahkan value ke dalam grup nama
                group.nama.push(item.nama);
            } else {
                group.nama = [group.nama, item.nama];
            }
        } else {
            akumulasikan[item.nama] = item;
        }
        return akumulasikan;
    }, {});

    var data = {
        'status':200,
        'values':hasil
    };

    res.json(data);
    res.end();

}