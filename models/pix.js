var Model = require("../models/model");

/**
 * Pix model
 * @author Baptiste Costa
 */
module.exports = function () {
	Model.call(this);
	this.tableName = "pixes";
};
module.exports.prototype = Object.create(Model.prototype);