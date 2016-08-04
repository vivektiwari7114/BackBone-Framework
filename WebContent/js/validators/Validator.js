/*Filename: Validator.js 
Validator base*/

define(

		function() {		
			var Validator = function()
			{

			};

			Validator.prototype.validate = function(value) 
			{
				return true;
			};


			Validator.prototype.format = function(value)
			{
				return value;
			};

			return Validator;		
		}
);