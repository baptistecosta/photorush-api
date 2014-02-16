var Bookshelf = require('bookshelf');
Bookshelf.db = Bookshelf.initialize(require('../config/connections').default);

/**
 * Pix category model
 * @author Baptiste Costa
 */
module.exports = Bookshelf.db.Model.extend({
	tableName: 'categories',
	pix: function() {
		return this.hasMany(require('./pix'));
	}
});