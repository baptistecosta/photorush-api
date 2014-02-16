var Bookshelf = require('bookshelf');
Bookshelf.db = Bookshelf.initialize(require('../config/connections').default);

/**
 * User model
 * @author Baptiste Costa
 */
module.exports = Bookshelf.db.Model.extend({
	tableName: 'users',
	pix: function() {
		return this.hasMany(require('./pix'));
	}
}, {
	get: function(id, opts, callback) {
		this.forge({id: id}).fetch(opts).then(callback);
	},
	query: function(query, callback) {
		this.forge(query.forge).fetch(query.opts).then(callback);
	}
});