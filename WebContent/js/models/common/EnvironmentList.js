// Filename: EnvironmentList.js
// model for the Settings list
define(
	[
	 	"backbone",
	 	"localstorage",
	 	"models/common/EnvironmentDetail"
	], 
	
	function (
		Backbone,
		BackboneLocalstorage, 
		EnvironmentDetail) {
		
		var EnvironmentList = Backbone.Collection.extend({
			
			constructor: function EnvironmentList() {
		        Backbone.Collection.prototype.constructor.apply(this, arguments);
		        
		    },
			model : EnvironmentDetail,
			
			// Filter down the list of all selected items.
			selectedEnvironment: function() {
				return this.filter(function(environment) { 
					return environment.get("selected");
				});
			}
		});
		
		
		return EnvironmentList;
	}
);