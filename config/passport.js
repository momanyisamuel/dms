const Models = require('../models')
const LocalStrategy = require('passport-local').Strategy;

module.exports = function(passport) {

    passport.use(new LocalStrategy({
        usernameField: 'email'
    },
        function(email, password, done) {
            Models.User.findOne({ where: { email: email } }).then(user => {
                if (!user) {
                  return done(null, false, { message: 'Incorrect username.' });
                }
                if (!user.password === password) {
                  return done(null, false, { message: 'Incorrect password.' });
                }
                done(null, user);
              }).catch(err => done(err))
        }
    ));

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
    
    passport.deserializeUser(function(id, done) {
        Models.User.findOne({ id: id }).then(user => {
            done(null, user);
            console.log(id);
          }).catch(err => done(err))
    });

}