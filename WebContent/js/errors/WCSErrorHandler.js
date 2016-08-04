
// Filename: WCSErrorHandler.js 
define(
	["errors/ErrorHandler","selfcare"], 

	function(ErrorHandler, SELFCARE) {	
		
		var WCSErrorHandler = function() {
			
		};	
		
		WCSErrorHandler.prototype = new ErrorHandler();
		
		//Displays the error message from the server 
		WCSErrorHandler.prototype.handleError = function(errorText) {
			var errorDetail = {};
			
			if (errorText != null) {
				console.log(errorText);
				errorText = errorText.replace(/\\n/g, "")
					.replace(/\\t/g, "").replace(/\\+/g,"");	
				console.log(errorText);
				
				try {
					errorDetail = JSON.parse(errorText);
					if(errorDetail.errors[0].errorMessage == undefined){						
						errorDetail.errorMessage = SELFCARE.Messages.getMessage("selfcare.WCSErrorHandler.serverError");
					}
					SELFCARE.Logger.log(SELFCARE.Logger.SEVERE, " from try" + JSON.stringify(errorDetail));
					//console.log(" from try" + JSON.stringify(errorDetail));
				} catch (e) {
					
					errorDetail.errorMessage = SELFCARE.Messages.getMessage("selfcare.WCSErrorHandler.serverError");
					
				}
			}
			
			return errorDetail;
			
		};
		
		return WCSErrorHandler;
	}
);