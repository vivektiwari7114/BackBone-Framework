//Filename: AmountValidator.js 
//Code to validate the Email input
define(
	["jquery",  "validators/Validator", "page"], 

	function($, Page, Validator) {		
	     
	    var defaultFormat = /^[1-9][0-9]*/;
	    
	    //Email Validator
		var AmountValidator = function() {
			
		};	
		AmountValidator.prototype = new Validator();
		
	
		AmountValidator.prototype.validate = function(value) {
			
			if(defaultFormat.test(value)){
				return true;
			} 
			else {
				return false;
			} 
		};
		
		return AmountValidator;		
	}
);













