var express = require('express');

var ect = require('ect');
var ectRenderer = ect({ watch: true, root: __dirname + '/views', ext : '.ect' });
var routes = require('./routes');

var app = express();


app.listen(3000, function () {
 		console.log('now listening on http://localhost:3000');
})
app.set('view engine', 'ect');
app.engine('ect', ectRenderer.render);
app.use('/', routes);
app.use(express.static('public'));
