var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/lists', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/pic', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/lyric', function(req, res, next) {
  res.send('respond with a resource');
});
module.exports = router;
