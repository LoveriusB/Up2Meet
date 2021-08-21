const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  password: String,
  email: String,
  age: Number,
  description: String,
  address: {
    country: String,
    city: String,
    street: String,
    number: Number,
  },
  formation: {
    studies: String,
    establishment: String,
    level: String,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = {
  userSchema: User,
};
