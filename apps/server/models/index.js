const dbConfig = require("../configs/db.config.js");
const mongoose = require("mongoose");
mongoose.set('strictQuery', true);
mongoose.Promise = global.Promise; 
const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.dbConfig = dbConfig;
db.user = require("./user.model");
db.role = require("./role.model");
db.ROLES = ["user", "admin", "moderator"];
db.skill = require("./skill.model");
db.employees = require("./employee.model.js")(mongoose);

module.exports = db;
