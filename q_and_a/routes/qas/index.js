var
  express = require('express'),
  router = express.Router(),
  QA = require('../../db/QA');

router.post('/', function(req, res) {
  var
    qa;

  qa = new QA({
    question: req.body.question,
    answer: req.body.answer
  });

  qa.save(function(err) {
    if (err) next(err);
    res.json({status: 'success'});
  });
});

router.get('/', function(req, res) {
  return QA.find().exec()
    .then(mapQAs)
    .then(function(qas) {
      res.send(qas);
    }, function(err) {
      next(err);
    });

  function mapQAs(qas) {
    return qas.map(mapQA);

    function mapQA(qa) {
      return {
        question: qa.question,
        answer: qa.answer,
        createdDT: qa.createdDT
      };
    }
  }
});

module.exports = router;
