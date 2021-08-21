const db = require("../Models/Connection").db;
const User = require("../Models/UserModel").userSchema;
const utils = require("./Utils");

const login = async (req, res) => {
  const body = utils.checkAndGetBody(req, res);
  if (body.success === false) {
    res.json({ success: false, error: body.error });
    return;
  }

  const userCredentials = {
    email: body.email,
    password: body.password,
  };

  console.log(userCredentials);

  const user = await User.findOne(userCredentials);

  if (!user) {
    res.json({ success: false, error: "login.errors.userNotFound" });
    return;
  }

  res.json({ success: true, user: user });
  // user.save().then((user) => {
  //   console.log("User saved");
  //   res.json({ success: true, user: user });
  // });
};

module.exports = { login: login };
