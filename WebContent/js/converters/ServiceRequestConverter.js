define(

["jquery","models/servicerequest/ServiceRequestModel"],
function($,ServiceRequestModel) {
var ServiceRequestConverter = function() {
};

ServiceRequestConverter.prototype.convert = function(details) {		
var jsondata = {
			
			OpenRequest:[],
			ClosedRequest:[]
			
		};
		length=details.customerProblems.length;
		
		
		
	//	for(var i in details) {
		for(var i=0; i<length; i++) {
		//	alert(JSON.stringify(details.ActiveServices[0]));
			if(details.customerProblems[i].status=="open"){
				var item = details.customerProblems[i];
				jsondata.OpenRequest.push({ 
			    	"serviceId" : item.serviceId,
			    	"title": item.title,
			    	"status": item.status,
			        "raisedDate"  : item.raisedDate,
			        "expectedclosureDate" : item.raisedDate			       
			    });
			}
			else if(details.customerProblems[i].status=="close"){
				var item = details.customerProblems[i];
			    jsondata.ClosedRequest.push({ 
			    	"serviceId" : item.serviceId,
			    	"title": item.title,
			    	"status": item.status,
			        "raisedDate"  : item.raisedDate,
			        "closureDate" : item.raisedDate
			    });
			}
		}
	
			return new ServiceRequestModel (jsondata);

			
};
 return ServiceRequestConverter;
});
