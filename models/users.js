var Bookshelf = require('bookshelf'),
	User = require('./user');

Bookshelf.db = Bookshelf.initialize(require('../config/connections').default);

/**
 * Users model
 * @author Baptiste Costa
 */

module.exports = Bookshelf.db.Collection.extend({
	model: User
}, {
	get: function(opts, callback) {
		this.forge().fetch(opts).then(callback);
	},
	query: function(query, callback) {
		this.forge(query.forge).fetch(query.opts).then(callback);
	}
});