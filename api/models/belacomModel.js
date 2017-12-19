'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongoosePages = require('mongoose-pages')




//On définit ici le schéma principal de notre API.
var DailyStatSchema = new Schema({
  user: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now,
    required: 'Please enter a date at format YYYY-MM-DD'
  },
  steps: {
    type: Number
  },
  distance: {
    type: Number
  },
  floors: {
    type: Number
  },
  calories_in: {
    type: Number
  },
  calories_burned: {
    type: Number
  },
  weight: {
    type: Number
  },
  BMI: {
    type: Number
  },
  fat: {
    type: Number
  },
  minutes_sedentary: {
    type: Number
  },
  minutes_lightly_active: {
    type: Number
  },
  minutes_fairly_active: {
    type: Number
  },
  minutes_very_active: {
    type: Number
  },
  minutes_asleep: {
    type: Number
  },
  minutes_awake: {
    type: Number
  },
  number_of_awakenings: {
    type: Number
  },
  time_in_bed: {
    type: Number
  },
  activity_calories:{
    type: Number
  },
  active_score: {
    type: Number
  }

});

//On définit ici l'unicité de la paire "Date/Utilisateur", ainsi un utilisateur ne pourra avoir qu'un seul jeu de données journalières.
DailyStatSchema.index({ user: 1, date: 1}, { unique: true });

//On applique ici la méthode skip permettant de générer la pagination sur cette table.
mongoosePages.skip(DailyStatSchema);

/*
    On définit ici un schéma de message d'erreur normalisé pour notre application.
    L'idée étant de traiter les erreurs non détectables par notre API et résultant de facteurs différents.

*/
var ErrorSchema = new Schema({

  Created_date: {
    type: Date,
    default: Date.now
  },
  error: {
    type: [{
      type: String,
      enum: ['Data format', 'Ressource not found', 'Unknown error']
    }],
    default: ['Unknown error']
  }
});

var DailyStats = mongoose.model('DailyStats', DailyStatSchema);
var Errors =mongoose.model('Errors', ErrorSchema);


//On exporte nos deux modèles.
module.exports = {
  DailyStats:DailyStats,
  Errors:Errors
};


