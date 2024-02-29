const LocalStrategy = require("passport-local");
const { User } = require("../model/user.model");
const bcrypt = require("bcrypt");

const strategy = new LocalStrategy({
  usernameField: 'name', // Adjust if your field is named differently
}, async (username, password, done) => {
  try {
    const user = await User.findOne({ name: username });
    // if user doesn't exist
    if (!user) {
      return done(null, false, { message: "User not found." });
    }
    // if the password isn't correct
    const compareResult = await bcrypt.compare(password, user.password);
    if (!compareResult) {
      return done(null, false, { message: "Invalid password." });
    }
    // if the user is properly authenticated
    return done(null, user);
  } catch (err) {
    return done(err);
  }
});


module.exports = strategy
