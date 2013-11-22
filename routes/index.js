var url = require('url');
var querystring = require('querystring');

var momas = require('../modules/momas');

/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Kaduna EDC' });
};

exports.once = function(req, res) {
    res.render('once', {title: 'Kaduna EDC'})
};

/*
 * GET validate meter
 */

exports.validate = function(req, res) {
    var type = querystring.parse(url.parse(req.url).query).type;
    var meter = querystring.parse(url.parse(req.url).query).meter;
    
    momas.validate(meter, type, res);
};

/*
 * GET make payment
 */
exports.pay = function(req, res) {
    var type = querystring.parse(url.parse(req.url).query).type;
    var meter = querystring.parse(url.parse(req.url).query).meter;
    var amount = querystring.parse(url.parse(req.url).query).amount;
    var tref = querystring.parse(url.parse(req.url).query).tref;
    
    momas.pay(meter, type, amount, tref, res);
};

exports.payWithVoucher = function(req, res) {
    var type = querystring.parse(url.parse(req.url).query).type;
    var meter = querystring.parse(url.parse(req.url).query).meter;
    var pin = querystring.parse(url.parse(req.url).query).pin;
    
    momas.payWithVoucher(meter, type, pin, res);
};

exports.payViaSms = function(req, res) {
    var sourceaddr = querystring.parse(url.parse(req.url).query).SOURCEADDR;
    var destaddr = querystring.parse(url.parse(req.url).query).DESTADDR;
    var message = querystring.parse(url.parse(req.url).query).MESSAGE;
    var trx = querystring.parse(url.parse(req.url).query).TRX;
    
    var parts = message.split(' ');
    
    if( (parts.length == 4) && (parts[0].toLowerCase() == 'kedc')) {
        momas.payViaSms(parts[2], parts[3], parts[1], res);
    } else {
        res.send('Invalid message format. Send kedc PIN meter prepaid or kedc PIN account postpaid. Thanks for using Defcom Technologies.');
    }
};