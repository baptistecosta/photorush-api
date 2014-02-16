var Model = require("../models/model");

/**
 * User model
 * @author Baptiste Costa
 */
module.exports = function () {
	Model.call(this);
	this.tableName = "users";
};
module.exports.prototype = Object.create(Model.prototype);