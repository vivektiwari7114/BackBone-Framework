// Filename: EnvironmentDetail.js
// Model for the SELFCARE Settings
define(
	["model"], 

	function(Model) {
		
		var EnvironmentDetail = Model.extend({
			
			constructor: function EnvironmentDetail() {
		        Model.prototype.constructor.apply(this, arguments);
		        
		    },
			
			// Default attributes for the server item.
		    defaults: function() {
		    	return {
			    	title: "",
		    		selected: false
		    	};
		    },

		    // Ensure that each Server created has `title`.
		    initialize: function() {
		    	if (!this.get("title")) {
		    		this.set({"title": this.defaults().title});
		    	}
		    },

		    // Toggle the `selected` state of this server item.
		    toggleSelection: function() {
		    	this.set({selected: !this.get("selected")});
		    }
		});
		
		return EnvironmentDetail;
	}
);