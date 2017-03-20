'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Specialty = mongoose.model('Specialty'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  specialty;

/**
 * Specialty routes tests
 */
describe('Specialty CRUD tests', function () {

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

    // Save a user to the test db and create new Specialty
    user.save(function () {
      specialty = {
        name: 'Specialty name'
      };

      done();
    });
  });

  it('should be able to save a Specialty if logged in', function (done) {
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

        // Save a new Specialty
        agent.post('/api/specialties')
          .send(specialty)
          .expect(200)
          .end(function (specialtySaveErr, specialtySaveRes) {
            // Handle Specialty save error
            if (specialtySaveErr) {
              return done(specialtySaveErr);
            }

            // Get a list of Specialties
            agent.get('/api/specialties')
              .end(function (specialtiesGetErr, specialtiesGetRes) {
                // Handle Specialties save error
                if (specialtiesGetErr) {
                  return done(specialtiesGetErr);
                }

                // Get Specialties list
                var specialties = specialtiesGetRes.body;

                // Set assertions
                (specialties[0].user._id).should.equal(userId);
                (specialties[0].name).should.match('Specialty name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Specialty if not logged in', function (done) {
    agent.post('/api/specialties')
      .send(specialty)
      .expect(403)
      .end(function (specialtySaveErr, specialtySaveRes) {
        // Call the assertion callback
        done(specialtySaveErr);
      });
  });

  it('should not be able to save an Specialty if no name is provided', function (done) {
    // Invalidate name field
    specialty.name = '';

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

        // Save a new Specialty
        agent.post('/api/specialties')
          .send(specialty)
          .expect(400)
          .end(function (specialtySaveErr, specialtySaveRes) {
            // Set message assertion
            (specialtySaveRes.body.message).should.match('Please fill Specialty name');

            // Handle Specialty save error
            done(specialtySaveErr);
          });
      });
  });

  it('should be able to update an Specialty if signed in', function (done) {
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

        // Save a new Specialty
        agent.post('/api/specialties')
          .send(specialty)
          .expect(200)
          .end(function (specialtySaveErr, specialtySaveRes) {
            // Handle Specialty save error
            if (specialtySaveErr) {
              return done(specialtySaveErr);
            }

            // Update Specialty name
            specialty.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Specialty
            agent.put('/api/specialties/' + specialtySaveRes.body._id)
              .send(specialty)
              .expect(200)
              .end(function (specialtyUpdateErr, specialtyUpdateRes) {
                // Handle Specialty update error
                if (specialtyUpdateErr) {
                  return done(specialtyUpdateErr);
                }

                // Set assertions
                (specialtyUpdateRes.body._id).should.equal(specialtySaveRes.body._id);
                (specialtyUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Specialties if not signed in', function (done) {
    // Create new Specialty model instance
    var specialtyObj = new Specialty(specialty);

    // Save the specialty
    specialtyObj.save(function () {
      // Request Specialties
      request(app).get('/api/specialties')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Specialty if not signed in', function (done) {
    // Create new Specialty model instance
    var specialtyObj = new Specialty(specialty);

    // Save the Specialty
    specialtyObj.save(function () {
      request(app).get('/api/specialties/' + specialtyObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', specialty.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Specialty with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/specialties/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Specialty is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Specialty which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Specialty
    request(app).get('/api/specialties/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Specialty with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Specialty if signed in', function (done) {
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

        // Save a new Specialty
        agent.post('/api/specialties')
          .send(specialty)
          .expect(200)
          .end(function (specialtySaveErr, specialtySaveRes) {
            // Handle Specialty save error
            if (specialtySaveErr) {
              return done(specialtySaveErr);
            }

            // Delete an existing Specialty
            agent.delete('/api/specialties/' + specialtySaveRes.body._id)
              .send(specialty)
              .expect(200)
              .end(function (specialtyDeleteErr, specialtyDeleteRes) {
                // Handle specialty error error
                if (specialtyDeleteErr) {
                  return done(specialtyDeleteErr);
                }

                // Set assertions
                (specialtyDeleteRes.body._id).should.equal(specialtySaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Specialty if not signed in', function (done) {
    // Set Specialty user
    specialty.user = user;

    // Create new Specialty model instance
    var specialtyObj = new Specialty(specialty);

    // Save the Specialty
    specialtyObj.save(function () {
      // Try deleting Specialty
      request(app).delete('/api/specialties/' + specialtyObj._id)
        .expect(403)
        .end(function (specialtyDeleteErr, specialtyDeleteRes) {
          // Set message assertion
          (specialtyDeleteRes.body.message).should.match('User is not authorized');

          // Handle Specialty error error
          done(specialtyDeleteErr);
        });

    });
  });

  it('should be able to get a single Specialty that has an orphaned user reference', function (done) {
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

          // Save a new Specialty
          agent.post('/api/specialties')
            .send(specialty)
            .expect(200)
            .end(function (specialtySaveErr, specialtySaveRes) {
              // Handle Specialty save error
              if (specialtySaveErr) {
                return done(specialtySaveErr);
              }

              // Set assertions on new Specialty
              (specialtySaveRes.body.name).should.equal(specialty.name);
              should.exist(specialtySaveRes.body.user);
              should.equal(specialtySaveRes.body.user._id, orphanId);

              // force the Specialty to have an orphaned user reference
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

                    // Get the Specialty
                    agent.get('/api/specialties/' + specialtySaveRes.body._id)
                      .expect(200)
                      .end(function (specialtyInfoErr, specialtyInfoRes) {
                        // Handle Specialty error
                        if (specialtyInfoErr) {
                          return done(specialtyInfoErr);
                        }

                        // Set assertions
                        (specialtyInfoRes.body._id).should.equal(specialtySaveRes.body._id);
                        (specialtyInfoRes.body.name).should.equal(specialty.name);
                        should.equal(specialtyInfoRes.body.user, undefined);

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
      Specialty.remove().exec(done);
    });
  });
});
