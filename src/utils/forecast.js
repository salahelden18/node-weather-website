const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=4d66ca35f033aabcd0a4adcae264ee80&query=${latitude},${longitude}&units=f`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to wheather service', undefined);
    } else if (body.error) {
      callback(body.error.info, undefined);
    } else {
      callback(
        undefined,
        `${body.current.temperature} degrees out, it feels like ${body.current.feelslike}`
      );
    }
  });
};

module.exports = forecast;
