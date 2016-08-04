define(

["jquery","models/relocate/RelocateModel"],
function($,RelocateModel) {
	var MyRelocateConverter=function() {
	};
	
	
	
	MyRelocateConverter.prototype.convert = function(values) {	
		var info = [];
		var infoUser=[];
	    $.each(values.city,function(key,val){
	    	var cityname=val.cityName;
	    	{
	    	$.each(val.description,function(key,val){
	    		 info.push({'cityName':cityname,'id':val.id,'plan':val.plan,'amount':val.amount,'status':val.status});
	    	  });
	        }
	    });
console.log("info", JSON.stringify(info));
	   
	    	
		var usercityName=values.userCity.cityName;
	    	//var userstatus=values.userCity.status;
	    	
	    	$.each(values.userCity.description,function(key,val){
	    		infoUser.push({'cityName':usercityName,'uid':val.id,'uplan':val.plan,'uamount':val.amount,'ustatus':val.status});
	    	});
	    	
	    	 
		    var userPlanDetails =[];
	    	for(var desc in values.userCity.description){
	    		infoUser = {};
	    		infoUser.id = values.userCity.description[desc].id;
	    		infoUser.plan = values.userCity.description[desc].plan;
	    		infoUser.amount = values.userCity.description[desc].amount;
	    		infoUser.status = values.userCity.description[desc].status;
	    		userPlanDetails.push(infoUser);
	    	}
	    	
	    	console.log("descriptions",JSON.stringify(userPlanDetails));
	    	
		return new RelocateModel (info,infoUser);
	};
	return MyRelocateConverter;
});