//Filename: PincodeValidator.js 
//Code to validate the Email input
define(
	["jquery",  "validators/Validator", "page"], 

	function($, Page, Validator) {		
	     
	    var defaultFormat = /^[0-9]{6}$/;
	    
	    //Email Validator
		var PincodeValidator = function() {
			
		};	
		PincodeValidator.prototype = new Validator();
		
		//Validate The Email id
		PincodeValidator.prototype.validate = function(value) {
			//alert(value+"inside validator");
			if(defaultFormat.test(value)){
				return true;
			} 
			else {
				return false;
			} 
		};
		
		return PincodeValidator;		
	}
);













