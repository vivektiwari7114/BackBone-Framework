// Filename: ServiceRequest.js
// Model for SELFCARE Service Request pages
/*define(
	["model"], 

	function(Model) {
		
		var ServiceRequestModel = Model.extend({
			
			constructor: function ServiceRequest() {
				Model.prototype.constructor.apply(this, arguments);
			}
		});	
		return ServiceRequestModel;
	}
);
*/

define(
	["model"], 

	function(Model) {
		var ServiceRequestModel = Model.extend({
			
			constructor: function ServiceRequestModel(info) {				
				Model.prototype.constructor.apply(this, arguments);
				this.setRequests(info);
			},
		
			setRequests : function(info){
				this.set({"request" : info});			
			},
			
			getRequests : function(){
				return this.get("request");
			},
			
		setOpenServiceReq : function(openservicereq){
			this.set({"openservicereq" : openservicereq});			
		},
		
		getOpenServiceReq : function(){
			return this.get("openservicereq");
		},
		
		setClosedServiceReq : function(closedservicereq){
			this.set({"closedservicereq" : closedservicereq});			
		},
		
		getClosedServiceReq : function(){
			return this.get("closedservicereq");
		},
		
		setServiceReqDetails : function(details){
			this.set({"servicereqdetails" : details});			
		},
		
		getServiceReqDetails : function(){
			return this.get("servicereqdetails");
		},
		
	});
		return ServiceRequestModel;
   }
);