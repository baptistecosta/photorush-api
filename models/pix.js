var Bookshelf = require("bookshelf");
Bookshelf.db = Bookshelf.initialize(require('../config/connections').default);

/**
 * Pix model
 * @author Baptiste Costa
 */
module.exports = Bookshelf.db.Model.extend({
	tableName: "pixes",
	pix_category: function() {
		return this.belongsTo(require("./pix_category"), 'category_id');
	},
	user: function() {
		return this.belongsTo(require("./user"), 'user_id');
	}
});