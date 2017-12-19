



'use strict';

//Regex utilisée pour vérifier le format des données avant leur traitement.
var Dateformat = new RegExp('^[0-9]{4}-[0-9]{2}-[0-9]{2}$');
//Paramètre utilisé pour la pagination.
var docsPerPage = 10;

var mongoose = require('mongoose'),
  Dailystat = mongoose.model('DailyStats'),
  Errors= mongoose.model('Errors');






//Fonction de moyennage utilisée notamment lors des statistiques.
function mean(arr,key) {
  var sum = 0;
  for (var i = 0, j = arr.length; i < j; i++) {
    sum += arr[i][key];
  }
  return sum / arr.length;
}





/* 
      La création d'une ligne dans notre jeu de données est effectuée dans cette requête.
      Celà correspond en fait à une journée de données pour un utilisateur donné.
*/
exports.create_a_dailystat = function(req, res) {
  var new_dailystat = new Dailystat(req.body);

  if(Dateformat.test(req.body.date)){
      new_dailystat.save(function(err, dailystat) {
      if (err)
        res.send(err);
      res.json(dailystat);
      });
  }else{
    res.json(new Errors());
  }
  
  
};


// Affiche le score moyen des utilisateurs sur une journée donnée.
exports.average_score_of_all_users_on_given_day = function(req, res){

  var query = Dailystat.find().where({'date': new Date(req.query.date)});
  query.exec(function (err, active_scores){
    
    if(err)
      res.send(err);
    var ans={};
    ans["date"]=req.query.date
    ans["average_score"]=mean(active_scores,'active_score');
    res.json(ans)
  })

}

// Affiche les utilisateurs ayant brulé plus de X calories sur une journée ciblée:
exports.users_calories_burned_sup = function(req, res) {
  Dailystat.find().where({calories_burned:{ $gte : req.query.amount }}).where({'date':new Date(req.query.date)}).distinct('user',function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};

// Affiche les utilisateurs ayant brulé moins de X calories sur une journée ciblée.
exports.users_calories_burned_min = function(req, res) {
  Dailystat.find().where({calories_burned:{ $lte : req.params.amount }}).exec(function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};

//Affiche l'ensemble des données d'un utilisateur trié par la date des données. 
exports.list_the_dailystats_of_user = function(req, res){
  Dailystat.find({ 'user': req.params.userId}).sort({date: 'desc'}).exec(function(err, dailystat) {
    if (err)
      res.send(err);
    res.json(dailystat);
  });
};

//Affiche l'ensemble des données journalières (pagination possible avec l'argument page dans l'url.
exports.list_all_dailystats = function(req, res) {
  if(req.query.page!=null){
    Dailystat.findPaginated({}, function (err, result) {
    if (err) throw err;
    res.json(result);
  }, docsPerPage, req.query.page);  
  }else{
    Dailystat.find().exec(function(err, dailystat) {
    if (err)
      res.send(err);
    res.json(dailystat);
  });
  }

};