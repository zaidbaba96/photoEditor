
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.Users = require("./user.model")(mongoose);

module.exports = db;