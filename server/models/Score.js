const
  mongoose = require('mongoose'),
  Schema = mongoose.Schema

module.exports = mongoose.model('hi_score', new Schema({
  name: {
    type: String,
    required: true
  },
  score: {
    type: Number,
    required: true
  },
  time: {
    type: String,
    default: '00:00'
  },
  date_added: {
    type: Date,
    default: Date.now
  }
}))