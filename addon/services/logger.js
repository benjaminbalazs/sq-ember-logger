import Ember from 'ember';

export default Ember.Service.extend({

	//

	log : function(message, details) {

		this.send('log', { message: this.prefix + ' ' + message, details: details });

	},

	error : function(error) {

		this.send('error', { error: this.prefix + ' ' + JSON.stringify(error) });

	},

	//

	send : function(method, data) {

		if ( this.production !== 'production' ) return;

		var self = this;
		return new Ember.RSVP.Promise(function(resolve, reject) {

			$.ajax(
		 			{
					    url: self.api_namespace + "/" + method, 
					    type: 'POST', 
					    contentType: 'application/vnd.api+json',
					    data: JSON.stringify(data),
					    dataType: 'json',
					    crossDomain: true,
					    headers: {
					    	'Access-Control-Allow-Origin': '*'
					    }
					}
			).done(function(data) { // IF SUCCESS
				resolve(data);
			}).fail(function(error) { // IF FAILED
				reject(error);
			});

		});

	},

	//

	initialize : Ember.on('init', function() {

		var config = this.container.lookupFactory('config:environment');
		
		this.api_namespace =  "/" + config.APP.api_namespace + "/logger";
		this.prefix = config.modulePrefix;
		this.production = ( config.enviroement === 'production' );

		var self = this;

		if ( this.production ) {
			Ember.onerror = function(error) {
				Ember.Logger.assert(false, error);
				self.error(error.stack);
			};

			Ember.RSVP.on('error', function(error) {
	  			Ember.Logger.assert(false, error);
	  			self.error(error.stack);
			});
		}

	}),

});