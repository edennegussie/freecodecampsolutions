// server.js
// where your node app starts

// init project
var express = require('express');
const Joi = require('joi');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

//solution to timestamp microservice 
app.get('/api/timestamp/:date_string?', (req, res) => {
  let date;
  if (req.params.date_string) {
    const schema = Joi.date();
    const result = schema.validate(req.params.date_string);
    if (result.error && result.error != null) {
      res.json({ error: "Invalid Date" });
      return;
    };
    date = new Date(req.params.date_string);
    if (date == 'Invalid Date') {
      date = new Date(parseInt(req.params.date_string));
    }
  } else {
    date = new Date();
  }
  res.json(
    {
      unix: date.getTime() / 1000,
      utc: date.toUTCString()
    }
  );
})