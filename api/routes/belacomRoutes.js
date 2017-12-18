'use strict';
module.exports = function(app) {
  var belacom = require('../controllers/belacomController');

  // belacom Routes
  app.route('/users')
    .get(belacom.list_all_users)
    .post(belacom.create_a_user);


  app.route('/users/:userId')
    .get(belacom.read_a_user_info)
    .put(belacom.update_a_user_info)
    .delete(belacom.delete_a_user);

};
