const express = require('express');
const res = require('express/lib/response');
const celebritiesRouter = express.Router();

const Celebrity = require('./../models/celebrity');

// Handle GET request for website root
celebritiesRouter.get('/', (req, res, next) => {
  res.render('index');
});

// Handle GET request for /celebrities to display list of celebritites
celebritiesRouter.get('/celebrities', (req, res, next) => {
  Celebrity.find()
    .then((celebrities) => {
      res.render('celebrities/index', { celebrities });
    })
    .catch((error) => {
      next(error);
    });
});

// Handle GET request for /celebrities/create to display form in order to create a celebrity
celebritiesRouter.get('/celebrities/create', (req, res, next) => {
  res.render('celebrities/create');
});

// Handle GET request for /celebrities/:id/edit to edit a celebrity
celebritiesRouter.get('/celebrities/:id/edit', (req, res, next) => {
  const { id } = req.params;
  Celebrity.findById(id)
    .then((celebrity) => {
      res.render('celebrities/edit', { celebrity });
    })
    .catch((error) => {
      next(error);
    });
});

// Handle GET request for /celebrities/:id to display details of chosen celebrity
celebritiesRouter.get('/celebrities/:id', (req, res, next) => {
  const { id } = req.params;
  Celebrity.findById(id)
    .then((celebrity) => {
      res.render('celebrities/show', { celebrity });
    })
    .catch((error) => {
      next(error);
    });
});

// Handle POST request for /celebrities/create to create and add celebrity to database
celebritiesRouter.post('/celebrities', (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;
  Celebrity.create({ name, occupation, catchPhrase })
    .then(() => {
      res.redirect('/celebrities');
    })
    .catch((error) => {
      res.render('celebrities/create');
    });
});

// Handle POST request for /celebrities/:id/edit to edit a celebrity
celebritiesRouter.post('/celebrities/:id/edit', (req, res, next) => {
  const { id } = req.params;
  const { name, occupation, catchPhrase } = req.body;
  Celebrity.findByIdAndUpdate(id, { name, occupation, catchPhrase })
    .then(() => {
      res.redirect('/celebrities/' + id);
    })
    .catch((error) => {
      next(error);
    });
});
// Handle POST request for /celebrities/:id/delete to delete a celebrity
celebritiesRouter.post('/celebrities/:id/delete', (req, res, next) => {
  const { id } = req.params;
  Celebrity.findByIdAndRemove(id)
    .then(() => {
      res.redirect('/celebrities/');
    })
    .catch((error) => {
      console.log('There was an error deleting the celebrity', error);
      next(error);
    });
});

module.exports = celebritiesRouter;
