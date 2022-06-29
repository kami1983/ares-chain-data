var express = require('express');
const {checkAndSendCrossChainEmails} = require("../lib");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/send_email', async function (req, res, next) {
  let result =await checkAndSendCrossChainEmails()
  res.render('msg', result)
});


module.exports = router;
