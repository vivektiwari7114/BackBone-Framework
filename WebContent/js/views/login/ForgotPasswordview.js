/*Filename: ForgotPasswordview.js
Handles the login page events*/

define(["jquery","selfcare", "page", "models/login/LoginModel",  "validators/UnameValidator", "validators/PasswordValidator"], 

function($, SELFCARE, Page, Model, UnameValidator, PasswordValidator){
		
			var ForgotPasswordview = Page.extend({
				
				events: {
					"blur  #otp" : "validateOTP",
					"blur  #confirmpwd" : "confirmPassword",
					"blur  #newpwd" : "validatePassword",
					"click #reset" : "resetPassword",
					"click #resendOtp" : "resendOtpRequest"		
					
				},
				
				// Default Constructor
				constructor: function ForgotPasswordview() {
					Page.prototype.constructor.apply(this, arguments);
				},

				/*Function Name: initialize
				 * Arguments: No
				 * Description:Initializing JS page
				 */
				initialize : function()	{
					this.$el = this.loadEl("ForgotPasswordview");				
				},

				/*Function Name: renderView
				 * Arguments: No
				 * Description:Rendering view according to corresponding
				 * HTML page
				 */
				renderView : function()	{
					var page = this;
					var html = SELFCARE.TemplateHelper.populate("login/forgotPassword");
					this.$el.html(html);
					this.showMessageForLabel ("forgotPasswordHeading", "selfcare.forgotpassword.forgotPasswordHeading");
					this.showMessageForLabel ("otpLabel", "selfcare.forgotpassword.otpLabel");
					this.showMessageForLabel ("newPasswordLabel", "selfcare.forgotpassword.newPasswordLabel");
					this.showMessageForLabel ("confirmPasswordLabel", "selfcare.forgotpassword.confirmPasswordLabel");
					this.showMessageForLabel ("resendOtpLink", "selfcare.forgotpassword.resendOtpLink");
					this.showMessageForLabel ("resetPasswordLink", "selfcare.forgotpassword.resetPasswordLink");
				},
				
				
				
				/*Function Name: validateOTP
				 * Arguments: No
				 * Description:Validate otp
				 * HTML page
				 */
				validateOTP : function(){
					var otpNo=$("#otp").val();
					if(otpNo == "") {
						this.showMessageForField ("otp", "selfcare.resetpassword.noOTP");
						return false;
					} 
					else {
						this.hideMessageForField("otp");
						return true;
					}
				},
			    
				/*Function Name: validatePassword
				 * Arguments: No
				 * Description:Validate password
				 * HTML page
				 * */
				validatePassword : function() {
					var pwd=$("#newpwd").val();
					if(pwd == "") {
						this.showMessageForField ("newpwd", "selfcare.common.noPassword");
						return false;
					} 
					else {
						var validPassword = new PasswordValidator().validate(pwd);
						if(!validPassword) {
							this.showMessageForField ("newpwd", "selfcare.login.invalidPassword");
							return false;
						} 
						else {
							this.hideMessageForField("newpwd");
							return true;
						}
					}
				},
				
				/*Function Name: confirmPassword
				 * Arguments: No
				 * Description:Validate password
				 * HTML page
				 * */
				confirmPassword : function() {
					var pwd=$("#newpwd").val();
					var confirmpwd=$("#confirmpwd").val();
					if(confirmpwd == "") {
						this.showMessageForField ("confirmpwd", "selfcare.common.noPassword");
						return false;
					} 
					else {
						if(pwd!=confirmpwd) {
							this.showMessageForField ("confirmpwd", "selfcare.resetpassword.confirmPassword");
							return false;
						} 
						else {
							this.hideMessageForField("confirmpwd");
							return true;
						}
					}
				},
								
				/*Function Name: resetPassword
				 * Arguments: No
				 * Description:Call web service to reset the password
				 */
				resetPassword : function(event){
					event.preventDefault();
					var valOTP=this.validateOTP();
					var valpwd=this.validatePassword();
					var valcpwd=this.confirmPassword();
					if(valOTP && valpwd && valcpwd){
						this.updateModel();
						var options = {"page":this};
						this.trigger("changePassword", options);
					}
				},
				
				/*Function Name: updateModel
				 * Arguments: No
				 * Description: persists data into model
				 */
				updateModel : function() {
					var model = this.getModel();
					var otpNo=$("#otp").val();
					var newPwd=$("#newpwd").val();
					model.setOtpno(otpNo);
					model.setNewPassword(newPwd);
					return true;
				},
				
				/*Function Name: showLogin
				 * Arguments: No
				 * Description: for navigating to login screen
				 */
				showLogin : function(){
					window.location.href = "#login/loginView";
				},
				
				/*Function Name: resendOtpRequest
				 * Arguments: No
				 * Description: Call service to regenerate otp no
				 */
				resendOtpRequest : function(){
					var options = {"page":this};
					this.trigger("resendOtp", options);
				},
				
				/*Function Name: onDispose
				 * Arguments: No
				 * Description:Dispose the model
				 */
				onDispose : function() {
					this.model.cleanup();
				}

			});
			return ForgotPasswordview;
		}
);
