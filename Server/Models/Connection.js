const mongoose = require("mongoose");

const db = mongoose.connect("mongodb://localhost/Up2Meet", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once("open", () =>
  console.log("connection has been made.")
);

module.exports = {
  db: db,
};
