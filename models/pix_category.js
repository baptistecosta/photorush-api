var Model = require("../models/model");

/**
 * Pix category model
 * @author Baptiste Costa
 */
module.exports = function () {
	Model.call(this);
	this.tableName = "categories";
};
module.exports.prototype = Object.create(Model.prototype);