'use strict';

/*
 *  Generic require login routing middleware
 */

exports.requiresLogin = function (req, res, next) {
  if (req.isAuthenticated()) return next();
  if (req.method == 'GET') req.session.returnTo = req.originalUrl;
  res.redirect('/login');
};

/*
 *  User authorization routing middleware
 */

exports.user = {
  hasAuthorization: function (req, res, next) {
    if (req.profile.id != req.user.id) {
      req.flash('info', 'You are not authorized');
      return res.redirect('/users/' + req.profile.id);
    }
    next();
  }
};

/*
 *  Demanda authorization routing middleware
 */

exports.demanda = {
  hasAuthorization: function (req, res, next) {
    if (req.demanda.user.id != req.user.id) {
      req.flash('info', 'You are not authorized');
      return res.redirect('/demandas/' + req.demanda.id);
    }
    next();
  }
};

/**
 * Comment authorization routing middleware
 */

exports.comment = {
  hasAuthorization: function (req, res, next) {
    // if the current user is comment owner or demanda owner
    // give them authority to delete
    if (req.user.id === req.comment.user.id || req.user.id === req.demanda.user.id) {
      next();
    } else {
      req.flash('info', 'You are not authorized');
      res.redirect('/demandas/' + req.demanda.id);
    }
  }
};
