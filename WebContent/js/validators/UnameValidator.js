//Filename: UnameValidator.js 
//Code to validate the Username input
define(
		["jquery",  "validators/Validator", "page"], 

		function($, Page, Validator) {		

			var defaultFormat = /^[0-9a-zA-Z.@#_]{6,30}$/;


			var UnameValidator = function() {

			};	
			UnameValidator.prototype = new Validator();


			UnameValidator.prototype.validate = function(value) {

				if(defaultFormat.test(value))
				{
					return true;
				} 
				else
				{
					return false;
				} 
			};

			return UnameValidator;		
		}
);













