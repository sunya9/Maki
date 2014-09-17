var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  // res.send('respond with a resource');
  res.send(process.env.NODE_ENV)
});

module.exports = router;
