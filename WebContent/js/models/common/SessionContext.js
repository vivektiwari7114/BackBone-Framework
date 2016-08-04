
// Filename: SessionContext.js
// The user session  context 
define(

	function() {	
		
		var SessionContext = function() {
			this.attributes = {};
		};
		
		
		SessionContext.prototype.setAttribute = function(attributeId, attributeValue) {
			this.attributes[attributeId] = attributeValue;
		};
		
		
		SessionContext.prototype.getAttribute = function(attributeId) {
			return this.attributes[attributeId];
		};
		
		SessionContext.prototype.removeAttribute = function(attributeId) {
			delete this.attributes[attributeId];
		};
		
		SessionContext.prototype.isAuthenticated = function() {
			return this.getAttribute("accessToken") != undefined;
		};
		
		SessionContext.prototype.getAccessToken = function() {
			return this.getAttribute("accessToken");
		};
		
		SessionContext.prototype.clear = function() {
			
			for (var attributeId in this.attributes) {
				delete this.attributes[attributeId];
			}			
		};
		
		return SessionContext;
	}
);
