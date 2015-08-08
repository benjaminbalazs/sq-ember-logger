import Ember from 'ember';

export default Ember.Route.extend({

	actions: {

		error : function(error) {
			this.logger.error(error);
			return true;
		}

	}

});