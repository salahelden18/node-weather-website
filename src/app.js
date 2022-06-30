const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

const port = process.env.PORT || 3000;
// Defines paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//setup handlebars engine nad views location
app.set('views', viewsPath);
app.set('view engine', 'hbs');
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'salahelden',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'salahelden',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    helptext: 'this is some helpful text',
    title: 'Help Page',
    name: 'salahelden',
  });
});

/* 
if (!address) {
  console.log("Please provide an addresss");
} else {
  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return console.log(error);
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) return console.log(error);

      console.log(location);
      console.log(forecastData);
    });
  });
}
*/

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'address must be provided',
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide search term',
    });
  }

  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    errorMessage: 'Help Article Not Found',
    name: 'salahelden',
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: 404,
    errorMessage: 'Page Not Found',
    name: 'salahelden',
  });
});

app.listen(port, () => {
  console.log('Starting listening on port ' + port);
});
