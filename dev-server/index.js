const path = require('path');
const express = require('express');
const app = express();
const winston = require('winston');
const expressWinston = require('express-winston');

app.use(expressWinston.logger({
  transports: [
    new winston.transports.Console({
      json: true,
      colorize: true
    })
  ],
  meta: true,
  msg: "HTTP {{req.method}} {{req.url}}",
  expressFormat: true,
  colorize: true,
}));

app.use('/', express.static(path.join(__dirname, './')));
app.use('/build', express.static(path.join(__dirname, 'build')));
app.set('port', 8080);

app.listen(app.get('port'), () => { });
