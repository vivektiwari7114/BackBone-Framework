//Filename: TrackingOrderValidator.js 
//Code to validate the Email input
define(
	["jquery",  "validators/Validator", "page"], 

	function($, Page, Validator) {		
	     
	    var defaultFormat = /^[0-9]{12}$/;
	    
	    //Email Validator
		var TrackingOrderValidator = function() {
			
		};	
		TrackingOrderValidator.prototype = new Validator();
		
		//Validate The Email id
		TrackingOrderValidator.prototype.validate = function(value) {
			//alert(value+"inside validator");
			if(defaultFormat.test(value)){
				return true;
			} 
			else {
				return false;
			} 
		};
		
		return TrackingOrderValidator;		
	}
);













