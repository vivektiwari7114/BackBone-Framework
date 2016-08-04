//Filename:ManageServiceConverter.js
//Converts the service details into the service model
define(
	["jquery","models/manageservices/ManageServicesModel"],
	
	//Manage Service details converter
	function($,ManageServicesModel) {
		var ManageServiceConverter = function() {
	};
	var retriveServiceDetails = function(servicedetails) {
		//console.log	(JSON.stringify(servicedetails));
		var servicePackages =[];
		var services = {};
		var activeServicePackages = [];
		var suspendedServicePackages = [];
		for(var servicePackageIndex in servicedetails.accounts[0].servicePackage){ 
		
			
			//if (servicedetails.accounts[0].servicePackage != undefined && servicedetails.accounts[0].servicePackage.length > 0) {	
				
			
				
				for(var serviceIndex in servicedetails.accounts[0].servicePackage[servicePackageIndex].services){
					var activeservices = {};
				
					var serviceStatus = servicedetails.accounts[0].servicePackage[servicePackageIndex].services[serviceIndex].serviceStatus;

					if(serviceStatus == "Active"){
						activeservices.productName = servicedetails.accounts[0].servicePackage[servicePackageIndex].services[serviceIndex].productName;
						activeservices.ServiceId = servicedetails.accounts[0].servicePackage[servicePackageIndex].services[serviceIndex].ServiceId;
						activeservices.serviceContractReferenceNo = servicedetails.accounts[0].servicePackage[servicePackageIndex].services[serviceIndex].serviceContractReferenceNo;
						activeServicePackages.push(activeservices);
					}	
					/*		if(serviceStatus == "Suspended"){
						suspendedservices.productName = servicedetails.accounts[0].servicePackage[servicePackageIndex].services[serviceIndex].productName;
						suspendedservicePackage.push(suspendedservices);
					}
						if(serviceStatus == "Disconnected"){
						activeservices.productName = details.accounts[0].servicePackage[i].services[j].productName;
						servicePackage.push(activeservices);
					}*/
					
				}
				
				for(var serviceIndex in servicedetails.accounts[0].servicePackage[servicePackageIndex].services){
					var suspendedservices = {};
					var serviceStatus = servicedetails.accounts[0].servicePackage[servicePackageIndex].services[serviceIndex].serviceStatus;
					

					if(serviceStatus == "Suspended"){
						suspendedservices.productName = servicedetails.accounts[0].servicePackage[servicePackageIndex].services[serviceIndex].productName;
						suspendedservices.ServiceId = servicedetails.accounts[0].servicePackage[servicePackageIndex].services[serviceIndex].ServiceId;
						suspendedservices.suspenstionDate = servicedetails.accounts[0].servicePackage[servicePackageIndex].services[serviceIndex].suspenstionDate;
						suspendedservices.serviceContractReferenceNo = servicedetails.accounts[0].servicePackage[servicePackageIndex].services[serviceIndex].serviceContractReferenceNo;
						suspendedServicePackages.push(suspendedservices);
					}	
					/*if(serviceStatus == "Suspended"){
						suspendedservices.productName = details.accounts[0].servicePackage[servicePackage].services[services].productName;
						suspendedservicePackage.push(suspendedservices);
					}/*	
						if(serviceStatus == "Disconnected"){
						activeservices.productName = details.accounts[0].servicePackage[i].services[j].productName;
						servicePackage.push(activeservices);
					}*/
					
				}
				
				
				
				
				
				
				

			//}
		}
						services.activeservices = activeServicePackages;
						services.suspendedservices = suspendedServicePackages;
				servicePackages.push(services);
		return servicePackages;
	};
			
			/*serviceIds = [];
			for(var i = 0; i < details.Services.length; i++){ 
				for(var j = 0; j< details.Services[i].ActiveServices.length; j++){
						var serviceDetail = {};
						serviceDetail.serviceid = details.Services[i].ActiveServices[j].serviceid;
						serviceDetail.servicedesc =  details.Services[i].ActiveServices[j].servicedesc;
						var serviceidPopup = details.Services[i].ActiveServices[j].serviceid + 'popup';
						var serviceidD = details.Services[i].ActiveServices[j].serviceid.replace(/ /g,'');
						serviceidPopup = serviceidPopup.replace(/ /g,'');
						serviceDetail.serviceidPopupD = serviceidPopup;
						serviceDetail.serviceidD = serviceidD;
						serviceIds.push(serviceDetail);
				}
					
			}*/
		//}
		



	//Retrieves service description  details
	/*var retriveServiceDescription = function(details) {
		if (details.Services != undefined && details.Services.length > 0) {				
			
			retriveServiceDescriptions = [];
			var activeServices = details.Services[0].ActiveServices;
			for(var activeService in activeServices){
				retriveServiceDescriptions.push(activeServices[activeService].servicedesc);
			}
		}
		return retriveServiceDescriptions;
	};*/

ManageServiceConverter.prototype.convert = function(details) {
			var serviceinfo = {};			
			serviceinfo.services = retriveServiceDetails(details);
			
			//console.log("testing",JSON.stringify(details));
			//var ManageServicesModel = new ManageServicesModel();
			//ManageServicesModel.setDetails(details);
			//console.log(ManageServicesModel.getDetail());
			//info.suspendedservicePackage
			//info.servicedesc = 	retriveServiceDescription(details);
			return	new ManageServicesModel(serviceinfo);
};
 return ManageServiceConverter;
 	});

