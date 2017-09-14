var express = require('express');
var app = express();
var router = express.Router();
var request = require('request');
var bodyParser = require('body-parser');

app.use(bodyParser.json());

app.get('/space', function(req, res) {
	request.get({url: 'https://api.spacexdata.com/v1/launches/latest'}, function(error, data, body) {
    res.status(200).send(body)
  });
  });

// catch-all endpoint if client makes request to non-existent endpoint
app.use('*', function(req, res) {
  res.status(404).json({message: 'Not Found'});
});

let server;

function runServer(port) {
  return new Promise((resolve, reject) => {
    try {
      server = app.listen(port, () => {
        console.log(`App listening on port ${port}`);
        resolve();
      });
    }
    catch (err) {
      console.error(`Can't start server: ${err}`);
      reject(err);
    }
  });
}

function closeServer() {
  return new Promise((resolve, reject) => {
    console.log('Closing server');
    server.close(err => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });
}

if (require.main === module) {
  runServer(3000).catch(err => console.error(err));
};

module.exports = {app};