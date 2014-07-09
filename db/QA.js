var
  mongoose = require('mongoose'),
  schema,
  QA;

schema = new mongoose.Schema({
  question: String,
  answer: String,
  createdDT: { type: Date, default: Date.now }
});

QA = mongoose.model('QA', schema);

module.exports = QA;