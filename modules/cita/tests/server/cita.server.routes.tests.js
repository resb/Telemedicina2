'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Cita = mongoose.model('Cita'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  cita;

/**
 * Cita routes tests
 */
describe('Cita CRUD tests', function () {

  before(function (done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);

    done();
  });

  beforeEach(function (done) {
    // Create user credentials
    credentials = {
      username: 'username',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create a new user
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: credentials.username,
      password: credentials.password,
      provider: 'local'
    });

    // Save a user to the test db and create new Cita
    user.save(function () {
      cita = {
        name: 'Cita name'
      };

      done();
    });
  });

  it('should be able to save a Cita if logged in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Cita
        agent.post('/api/cita')
          .send(cita)
          .expect(200)
          .end(function (citaSaveErr, citaSaveRes) {
            // Handle Cita save error
            if (citaSaveErr) {
              return done(citaSaveErr);
            }

            // Get a list of Cita
            agent.get('/api/cita')
              .end(function (citaGetErr, citaGetRes) {
                // Handle Cita save error
                if (citaGetErr) {
                  return done(citaGetErr);
                }

                // Get Cita list
                var cita = citaGetRes.body;

                // Set assertions
                (cita[0].user._id).should.equal(userId);
                (cita[0].name).should.match('Cita name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Cita if not logged in', function (done) {
    agent.post('/api/cita')
      .send(cita)
      .expect(403)
      .end(function (citaSaveErr, citaSaveRes) {
        // Call the assertion callback
        done(citaSaveErr);
      });
  });

  it('should not be able to save an Cita if no name is provided', function (done) {
    // Invalidate name field
    cita.name = '';

    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Cita
        agent.post('/api/cita')
          .send(cita)
          .expect(400)
          .end(function (citaSaveErr, citaSaveRes) {
            // Set message assertion
            (citaSaveRes.body.message).should.match('Please fill Cita name');

            // Handle Cita save error
            done(citaSaveErr);
          });
      });
  });

  it('should be able to update an Cita if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Cita
        agent.post('/api/cita')
          .send(cita)
          .expect(200)
          .end(function (citaSaveErr, citaSaveRes) {
            // Handle Cita save error
            if (citaSaveErr) {
              return done(citaSaveErr);
            }

            // Update Cita name
            cita.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Cita
            agent.put('/api/cita/' + citaSaveRes.body._id)
              .send(cita)
              .expect(200)
              .end(function (citaUpdateErr, citaUpdateRes) {
                // Handle Cita update error
                if (citaUpdateErr) {
                  return done(citaUpdateErr);
                }

                // Set assertions
                (citaUpdateRes.body._id).should.equal(citaSaveRes.body._id);
                (citaUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Cita if not signed in', function (done) {
    // Create new Cita model instance
    var citaObj = new Cita(cita);

    // Save the Cita
    citaObj.save(function () {
      // Request Cita
      request(app).get('/api/cita')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Cita if not signed in', function (done) {
    // Create new Cita model instance
    var citaObj = new Cita(cita);

    // Save the Cita
    citaObj.save(function () {
      request(app).get('/api/cita/' + citaObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', cita.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Cita with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/cita/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'CituCitam is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Cita which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Cita
    request(app).get('/api/cita/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Cita with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Cita if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Cita
        agent.post('/api/cita')
          .send(cita)
          .expect(200)
          .end(function (citaSaveErr, citaSaveRes) {
            // Handle Cita save error
            if (citaSaveErr) {
              return done(citaSaveErr);
            }

            // Delete an existing Cita
            agent.delete('/api/cita/' + citaSaveRes.body._id)
              .send(cita)
              .expect(200)
              .end(function (citaDeleteErr, citaDeleteRes) {
                // Handle Cita error error
                if (citaDeleteErr) {
                  return done(citaDeleteErr);
                }

                // Set assertions
                (citaDeleteRes.body._id).should.equal(citaSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Cita if not signed in', function (done) {
    // Set Cita user
    cita.user = user;

    // Create new Cita model instance
    var citaObj = new Cita(cita);

    // Save the Cita
    citaObj.save(function () {
      // Try deleting Cita
      request(app).delete('/api/cita/' + citaObj._id)
        .expect(403)
        .end(function (citaDeleteErr, citaDeleteRes) {
          // Set message assertion
          (citaDeleteRes.body.message).should.match('User is not authorized');

          // Handle Cita error error
          done(citaDeleteErr);
        });

    });
  });

  it('should be able to get a single Cita that has an orphaned user reference', function (done) {
    // Create orphan user creds
    var _creds = {
      username: 'orphan',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create orphan user
    var _orphan = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'orphan@test.com',
      username: _creds.username,
      password: _creds.password,
      provider: 'local'
    });

    _orphan.save(function (err, orphan) {
      // Handle save error
      if (err) {
        return done(err);
      }

      agent.post('/api/auth/signin')
        .send(_creds)
        .expect(200)
        .end(function (signinErr, signinRes) {
          // Handle signin error
          if (signinErr) {
            return done(signinErr);
          }

          // Get the userId
          var orphanId = orphan._id;

          // Save a new Cita
          agent.post('/api/cita')
            .send(cita)
            .expect(200)
            .end(function (citaSaveErr, citaSaveRes) {
              // Handle Cita save error
              if (citaSaveErr) {
                return done(citaSaveErr);
              }

              // Set assertions on new Cita
              (citaSaveRes.body.name).should.equal(cita.name);
              should.exist(citaSaveRes.body.user);
              should.equal(citaSaveRes.body.user._id, orphanId);

              // force the Cita to have an orphaned user reference
              orphan.remove(function () {
                // now signin with valid user
                agent.post('/api/auth/signin')
                  .send(credentials)
                  .expect(200)
                  .end(function (err, res) {
                    // Handle signin error
                    if (err) {
                      return done(err);
                    }

                    // Get the Cita
                    agent.get('/api/cita/' + citaSaveRes.body._id)
                      .expect(200)
                      .end(function (citaInfoErr, citaInfoRes) {
                        // Handle Cita error
                        if (citaInfoErr) {
                          return done(citaInfoErr);
                        }

                        // Set assertions
                        (citaInfoRes.body._id).should.equal(citaSaveRes.body._id);
                        (citaInfoRes.body.name).should.equal(cita.name);
                        should.equal(citaInfoRes.body.user, undefined);

                        // Call the assertion callback
                        done();
                      });
                  });
              });
            });
        });
    });
  });

  afterEach(function (done) {
    User.remove().exec(function () {
      Cita.remove().exec(done);
    });
  });
});
