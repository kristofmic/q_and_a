var
  express = require('express'),
  router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Q&A Platform' });
});

module.exports = router;
