var
  mongoose = require('mongoose'),
  schema,
  User,
  bcrypt = require('bcryptjs');

schema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String
});

schema.pre('save', function(next) {
  var
    user = this;

  if (!user.isModified('password')) return next();
  bcrypt.genSalt(10, function(err, salt) {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

schema.methods.comparePassword = comparePassword

User = mongoose.model('User', mongoSchema.userSchema);

module.exports = User;

function comparePassword(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};
