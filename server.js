var express = require('express'),
    path = require('path'),
    http = require('http'),
    cigarAndWines = require('./routes/cigarsandwines');

var app = express();

app.configure(function () {
    app.set('port', process.env.PORT || 5000);
    app.use(express.logger('dev'));  /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser()),
    app.use(express.static(path.join(__dirname, 'webroot')));
});

app.get('/cigars', cigarAndWines.findAllCigars);
app.get('/cigars/:id', cigarAndWines.findCigarById);
app.post('/cigars', cigarAndWines.addCigar);
app.put('/cigars/:id', cigarAndWines.updateCigar);
app.delete('/cigars/:id', cigarAndWines.deleteCigar);

app.get('/wines', cigarAndWines.findAllWines);
app.get('/wines/:id', cigarAndWines.findWineById);
app.post('/wines', cigarAndWines.addWine);
app.put('/wines/:id', cigarAndWines.updateWine);
app.delete('/wines/:id', cigarAndWines.deleteWine);

http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});
