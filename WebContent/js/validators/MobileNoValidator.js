//Filename: MobileNoValidator.js 
//Code to validate the Email input
define(
	["jquery",  "validators/Validator", "page"], 

	function($, Page, Validator) {		
	     
	    var defaultFormat = /^[0-9]{10}$/;
	    
	    //Email Validator
		var MobileNoValidator = function() {
			
		};	
		MobileNoValidator.prototype = new Validator();
		
		//Validate The Email id
		MobileNoValidator.prototype.validate = function(value) {
			//alert(value+"inside validator");
			if(defaultFormat.test(value)){
				return true;
			} 
			else {
				return false;
			} 
		};
		
		return MobileNoValidator;		
	}
);













