/*Filename: Router.js
Base router, common listening of events should go here*/
define(
		["backbone"], 

		function(Backbone) {		
			var Router = Backbone.Router.extend({

				/*Function Name: Router
				 * Arguments: no
				 * Description: Default Constructor
				 */
				constructor: function Router()
			{
					Backbone.Router.prototype.constructor.apply(this, arguments);
			},

			/*Function Name: initialize
			 * Arguments: options
			 * Description: 
			 */
			initialize : function(options) 
			{
				if (options != null && typeof(options.app) !== "undefined") {
					this["app"] = options.app;	
				}
			}		
			});		
			return Router;		
		}
);