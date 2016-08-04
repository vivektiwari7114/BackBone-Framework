define(

["jquery","models/myorder/MyOrderModel"],
function($,MyOrderModel) {
var PastOrderConverter = function() {
};

PastOrderConverter.prototype.convert = function(details) {	
	
	
	var jsondata = {
			
			orderDetails:[]
			
			
		};
		var length=details.orders.length;
	//	for(var i in details) {
		for(var i=0; i<length; i++) {
		//	alert(JSON.stringify(details.ActiveServices[0]));
			
		 var item=details.orders[i];
		 orderRefNumber=item.referenceNumber;
		 orderNo=item.orderNumber;
		 orderDate=item.orderDateTime;
		 orderStatus=item.orderStatus;
		 orderAmount=item.paymentDetails.amountPayable;
		 
		 
		    jsondata.orderDetails.push({ 
		    	"referenceNumber" : orderRefNumber,
		    	"orderNumber" : orderNo,
		        "orderDateTime"  : orderDate,
		        "orderStatus"  :  orderStatus,
		        "amountPayable"  : orderAmount
		       
		    });
		   
		 
		}
	
			return jsondata;

			
};
 return PastOrderConverter;
});
