/*Filename: LoginModel.js
 Model for SELFCARE login page*/
define(
		["model"], 

		function(Model) 
		{
			var loginObject = {
					"username" : "",
					"password" : "",
					"status" : "",
					"otp" : "",
					"newPassword" : ""
					
			};

			var LoginModel = Model.extend({

				constructor: function LoginModel() 
			{
					Model.prototype.constructor.apply(this, arguments);
			},
			
			
			/*setuser name*/
			setUsername : function(uname){
				loginObject.username=uname;
			},			
			getUsername : function() 
			{                        
				return loginObject.username;
			},
			
			setPassword : function(password){
				loginObject.password=password;
			},			
			getPassword : function() 
			{                        
				return loginObject.password;
			},
			
			setStatus : function(status){
				loginObject.status=status;
			},			
			getStatus : function() 
			{                        
				return loginObject.status;
			},
			
			setOtpno : function(otp){
				loginObject.otp=otp;
			},			
			getOtpno : function() 
			{                        
				return loginObject.otp;
			},
			
			setNewPassword : function(newPassword){
				loginObject.newPassword=newPassword;
			},			
			getNewPassword : function() 
			{                     
				return loginObject.newPassword;
			},
			
			});	
			return LoginModel;
		}
);