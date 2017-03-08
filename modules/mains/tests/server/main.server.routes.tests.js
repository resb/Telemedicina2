'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Main = mongoose.model('Main'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  main;

/**
 * Main routes tests
 */
describe('Main CRUD tests', function () {

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

    // Save a user to the test db and create new Main
    user.save(function () {
      main = {
        name: 'Main name'
      };

      done();
    });
  });

  it('should be able to save a Main if logged in', function (done) {
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

        // Save a new Main
        agent.post('/api/mains')
          .send(main)
          .expect(200)
          .end(function (mainSaveErr, mainSaveRes) {
            // Handle Main save error
            if (mainSaveErr) {
              return done(mainSaveErr);
            }

            // Get a list of Mains
            agent.get('/api/mains')
              .end(function (mainsGetErr, mainsGetRes) {
                // Handle Mains save error
                if (mainsGetErr) {
                  return done(mainsGetErr);
                }

                // Get Mains list
                var mains = mainsGetRes.body;

                // Set assertions
                (mains[0].user._id).should.equal(userId);
                (mains[0].name).should.match('Main name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Main if not logged in', function (done) {
    agent.post('/api/mains')
      .send(main)
      .expect(403)
      .end(function (mainSaveErr, mainSaveRes) {
        // Call the assertion callback
        done(mainSaveErr);
      });
  });

  it('should not be able to save an Main if no name is provided', function (done) {
    // Invalidate name field
    main.name = '';

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

        // Save a new Main
        agent.post('/api/mains')
          .send(main)
          .expect(400)
          .end(function (mainSaveErr, mainSaveRes) {
            // Set message assertion
            (mainSaveRes.body.message).should.match('Please fill Main name');

            // Handle Main save error
            done(mainSaveErr);
          });
      });
  });

  it('should be able to update an Main if signed in', function (done) {
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

        // Save a new Main
        agent.post('/api/mains')
          .send(main)
          .expect(200)
          .end(function (mainSaveErr, mainSaveRes) {
            // Handle Main save error
            if (mainSaveErr) {
              return done(mainSaveErr);
            }

            // Update Main name
            main.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Main
            agent.put('/api/mains/' + mainSaveRes.body._id)
              .send(main)
              .expect(200)
              .end(function (mainUpdateErr, mainUpdateRes) {
                // Handle Main update error
                if (mainUpdateErr) {
                  return done(mainUpdateErr);
                }

                // Set assertions
                (mainUpdateRes.body._id).should.equal(mainSaveRes.body._id);
                (mainUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Mains if not signed in', function (done) {
    // Create new Main model instance
    var mainObj = new Main(main);

    // Save the main
    mainObj.save(function () {
      // Request Mains
      request(app).get('/api/mains')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Main if not signed in', function (done) {
    // Create new Main model instance
    var mainObj = new Main(main);

    // Save the Main
    mainObj.save(function () {
      request(app).get('/api/mains/' + mainObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', main.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Main with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/mains/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Main is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Main which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Main
    request(app).get('/api/mains/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Main with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Main if signed in', function (done) {
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

        // Save a new Main
        agent.post('/api/mains')
          .send(main)
          .expect(200)
          .end(function (mainSaveErr, mainSaveRes) {
            // Handle Main save error
            if (mainSaveErr) {
              return done(mainSaveErr);
            }

            // Delete an existing Main
            agent.delete('/api/mains/' + mainSaveRes.body._id)
              .send(main)
              .expect(200)
              .end(function (mainDeleteErr, mainDeleteRes) {
                // Handle main error error
                if (mainDeleteErr) {
                  return done(mainDeleteErr);
                }

                // Set assertions
                (mainDeleteRes.body._id).should.equal(mainSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Main if not signed in', function (done) {
    // Set Main user
    main.user = user;

    // Create new Main model instance
    var mainObj = new Main(main);

    // Save the Main
    mainObj.save(function () {
      // Try deleting Main
      request(app).delete('/api/mains/' + mainObj._id)
        .expect(403)
        .end(function (mainDeleteErr, mainDeleteRes) {
          // Set message assertion
          (mainDeleteRes.body.message).should.match('User is not authorized');

          // Handle Main error error
          done(mainDeleteErr);
        });

    });
  });

  it('should be able to get a single Main that has an orphaned user reference', function (done) {
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

          // Save a new Main
          agent.post('/api/mains')
            .send(main)
            .expect(200)
            .end(function (mainSaveErr, mainSaveRes) {
              // Handle Main save error
              if (mainSaveErr) {
                return done(mainSaveErr);
              }

              // Set assertions on new Main
              (mainSaveRes.body.name).should.equal(main.name);
              should.exist(mainSaveRes.body.user);
              should.equal(mainSaveRes.body.user._id, orphanId);

              // force the Main to have an orphaned user reference
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

                    // Get the Main
                    agent.get('/api/mains/' + mainSaveRes.body._id)
                      .expect(200)
                      .end(function (mainInfoErr, mainInfoRes) {
                        // Handle Main error
                        if (mainInfoErr) {
                          return done(mainInfoErr);
                        }

                        // Set assertions
                        (mainInfoRes.body._id).should.equal(mainSaveRes.body._id);
                        (mainInfoRes.body.name).should.equal(main.name);
                        should.equal(mainInfoRes.body.user, undefined);

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
      Main.remove().exec(done);
    });
  });
});
