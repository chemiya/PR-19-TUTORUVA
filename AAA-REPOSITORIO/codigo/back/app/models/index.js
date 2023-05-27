const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.alumno = require("./alumno.model.js")(mongoose);
db.profesor = require("./profesor.model.js")(mongoose);
db.tutoria = require("./tutoria.model.js")(mongoose);
db.alumnoguardado = require("./alumnoguardado.model.js")(mongoose);
db.profesorguardado = require("./profesorguardado.model.js")(mongoose);

module.exports = db;
