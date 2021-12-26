'use strict'

module.exports = function(app) {
    var jsonku = require('./controller');

    app.route('/')
        .get(jsonku.index);

    app.route('/getallcontact')
        .get(jsonku.getAllContact);

    app.route('/getcontact/:id')
        .get(jsonku.getcontactbyid);

    app.route('/addcontact')
        .post(jsonku.addcontact);

    app.route('/editcontact')
        .put(jsonku.editcontact);

    app.route('/deletecontact')
        .delete(jsonku.deletecontact);

    app.route('/getschedulemeet')
        .get(jsonku.getschedulemeetgroup);
}