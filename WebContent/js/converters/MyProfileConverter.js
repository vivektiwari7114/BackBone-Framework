define(

["jquery","models/myprofile/MyProfileModel"],
function($,MyProfileModel) {
var MyProfileConverter = function() {
};
var retrieveAddress = function(address){
};
MyProfileConverter.prototype.convert = function(details) {		
			var info = {};			
			info.firstName = details.firstName;  
			info.email = details.email;
			info.phonenumber = details.phonenumber; 
			info.additionalphonenumber = details.alternatephonenumber;
			info.dob = details.dob;
			info.pincodebillingaddress = details.pincodebillingaddress;
			info.pincodeshippingaddress = details.pincodeshippingaddress;
			info.address = details.address[0].primaryAddress.doorNo + ", "+  details.address[0].primaryAddress.street +", "+details.address[0].primaryAddress.city ;
			info.billingAddress = details.address[0].billingAddress.doorNo + ", "+ details.address[0].billingAddress.street + ", "+ details.address[0].billingAddress.city;
			info.shippingAddress = details.address[0].shippingAddress.doorNo + ", "+ details.address[0].shippingAddress.street+", "+details.address[0].shippingAddress.city;
			
			return new MyProfileModel (info);

			
};
 return MyProfileConverter;
});
