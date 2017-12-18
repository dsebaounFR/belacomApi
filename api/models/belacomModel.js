'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var UserSchema = new Schema({
  id: {
    type: Number
  },
  name: {
    type: String,
    required: 'Please enter the name of the user'
  },
  Created_date: {
    type: Date,
    default: Date.now
  }
});

var DailyStatSchema = new Schema({
  id_user: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
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
  }

});


module.exports = mongoose.model('Users', UserSchema);
module.exports = mongoose.model('DailyStats', DailyStatSchema);
