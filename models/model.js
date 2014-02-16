var dbConfig = require("../config/database");

/**
 * Base Model class
 * @author Baptiste Costa
 */
module.exports = function () {
	this.dbConn = null;
	this.useDbConfig = "default";
	this.tableName = null;

	this.connect();
};

module.exports.prototype.connect = function() {
	var config = dbConfig[this.useDbConfig];
	if (config.client === "mysql") {
		this.dbConn = require("mysql").createConnection({
			host: config.host,
			database: config.database,
			user: config.user,
			password: config.password
		});
	} else {
		throw new Exception("Can't handle ORDBM client " + dbConfig[this.useDbConfig].client);
	}
};

module.exports.prototype.query = function(query, params, callback) {
	this.dbConn.query(query, params, function(err, user){
		if (!!err) {
			throw new Error(err);
		}
		callback(user);
	});
};

module.exports.prototype.get = function(id, callback) {
	this.query("SELECT * FROM " + this.tableName + " WHERE id = ?", [id], callback);
};