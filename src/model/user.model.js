const { Schema, model } = require("mongoose");

// Define schema for User entity
const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  projects: [
    {
      project_id: String,
      project_name: String,
    },
  ],
  role: String,
});

const User = model("User", userSchema);

async function findAllUsers() {
  const users = await User.find();
  return users;
}
//Find user
async function findUser(filter) {
  const user = await User.findOne(filter);
  return user;
}

async function register({ name, email, password, role }) {
  const user = new User({ name, email, password, role });
  //hash the password
  await user.save();
  return user;
}

module.exports = {
  User,
  findAllUsers,
  register,
  findUser,
};
