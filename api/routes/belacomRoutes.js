'use strict';

module.exports = function(app) {
  var belacom = require('../controllers/belacomController');

  /* belacom Routes
	On stockera ici l'ensemble des chemins vers le controller.
*/



  app.route('/dailystats')
  	.get(belacom.list_all_dailystats)
  	.post(belacom.create_a_dailystat);

  app.route('/dailystats/:userId')
  	.get(belacom.list_the_dailystats_of_user);

 
  app.route('/calories/sup')
  	.get(belacom.users_calories_burned_sup);


  app.route('/calories/min')
  	.get(belacom.users_calories_burned_min);


  app.route('/statistics/average')
  	.get(belacom.average_score_of_all_users_on_given_day);

};
