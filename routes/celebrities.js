const express = require('express');
const celebritiesRouter = express.Router();

const Celebrity = require('./../models/celebrity');

// Handle GET request for website root
celebritiesRouter.get('/', (req, res, next) => {
  res.render('index');
});

celebritiesRouter.get('/celebrities', (req, res, next) => {
  Celebrity.find()
    .then((celebrities) => {
      res.render('celebrities/index', { celebrities });
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = celebritiesRouter;
