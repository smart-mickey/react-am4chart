var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var base64 = require('base-64');
var fetch = require('node-fetch');
var app = express();

var whitelist = ['http://localhost:3000']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(cors(corsOptions))
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.post('/data', async function (req, res, next) {
  await fetch(req.body.path, {
    headers: {
      'Accept': 'application/json',
      "Authorization": `Basic ${base64.encode(`tester:testing`)}`
    }
  })
    .then(res => res.json())
    .then(json => {
      res.send(json)
    })
    .catch(function (err) {
      res.send(err)
    });
})

app.listen(3002);
