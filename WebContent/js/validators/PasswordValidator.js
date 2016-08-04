/*Filename: PasswordValidator.js 
Code to validate the Password input*/
define(
		["jquery",  "validators/Validator", "page"], 

		function($, Page, Validator) {		

			var defaultFormat = /^[0-9a-zA-Z@#]{7,30}$/;


			var PasswordValidator = function() 
			{

			};	
			PasswordValidator.prototype = new Validator();


			PasswordValidator.prototype.validate = function(value)
			{

				if(defaultFormat.test(value))
				{
					return true;
				} 
				else 
				{
					return false;
				} 
			};

			return PasswordValidator;		
		}
);













