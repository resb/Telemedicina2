'use strict';

/**
 * Module dependencies
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke tarjetas Permissions
 */
exports.invokeRolesPolicies = function () {
  acl.allow([{
    roles: ['admin'],
    allows: [{
      resources: '/api/tarjetas',
      permissions: '*'
    }, {
      resources: '/api/tarjetas/:tarjetaId',
      permissions: '*'
    }]
  },/*{
    roles: ['admin'],
    allows: [{
      resources: '/api/tarjetas',
      permissions: '*'
    }, {
      resources: '/api/tarjetas/:userId',
      permissions: '*'
    }]
  }*/, {
    roles: ['user'],
    allows: [{
      resources: '/api/tarjetas',
      permissions: ['get', 'post']
    }, {
      resources: '/api/tarjetas/:tarjetaId',
      permissions: ['get']
    }]
  }, {
    roles: ['guest'],
    allows: [{
      resources: '/api/tarjetas',
      permissions: ['get']
    }, {
      resources: '/api/tarjetas/:tarjetaId',
      permissions: ['get']
    }]
  }]);
};

/**
 * Check If tarjetas Policy Allows
 */
exports.isAllowed = function (req, res, next) {
  var roles = (req.user) ? req.user.roles : ['guest'];

  // If an Specialty is being processed and the current user created it then allow any manipulation
  if (req.tarjeta && req.user && req.tarjeta.user && req.tarjeta.user.id === req.user.id) {
    return next();
  }

  // Check for user roles
  acl.areAnyRolesAllowed(roles, req.route.path, req.method.toLowerCase(), function (err, isAllowed) {
    if (err) {
      // An authorization error occurred
      return res.status(500).send('Unexpected authorization error');
    } else {
      if (isAllowed) {
        // Access granted! Invoke next middleware
        return next();
      } else {
        return res.status(403).json({
          message: 'User is not authorized'
        });
      }
    }
  });
};