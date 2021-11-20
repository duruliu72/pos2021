const express = require('express');
var cors = require('cors');
const users = require('../routes/users');
const auth = require('../routes/auth');
const brands = require('../routes/brands');
const categories = require('../routes/categories');
const companies = require('../routes/companies');
const warehouses = require('../routes/warehouses');
const genders = require('../routes/genders');
const articletypes = require('../routes/articletypes');
const countries = require('../routes/countries');
const cities = require('../routes/cities');
const articles = require('../routes/articles');
const fileupload = require('../routes/fileupload');
const error = require('../middleware/error');
module.exports = function(app) {
    app.use(cors())
    app.use(express.json());
    app.use('/api/users', users);
    app.use('/api/auth', auth);
    app.use('/api/brands', brands);
    app.use('/api/categories', categories);
    app.use('/api/companies', companies);
    app.use('/api/warehouses', warehouses);
    app.use('/api/genders', genders);
    app.use('/api/articletypes', articletypes);
    app.use('/api/countries', countries);
    app.use('/api/cities', cities);
    app.use('/api/articles', articles);
    app.use('/api/upload', fileupload);
    app.use(error);
  }