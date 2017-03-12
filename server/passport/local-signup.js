const User = require('mongoose').model('User');
const PassPortLocalStrategy = require('passport-local').Strategy;

/**
 * 패스포트 로컬 전략 오브젝트를 리턴
 */
module.exports = new PassPortLocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false,
  passReqToCallback: true
}, (req, email, password, done) => {
  const userData = {
    email: email.trim(),
    password:password.trim(),
    name: req.body.name.trim()
  };

  const newUser = new User(userData);
  newUser.save((err) => {
    if (err) { return done(err); }

    return done(null);
  });
});
