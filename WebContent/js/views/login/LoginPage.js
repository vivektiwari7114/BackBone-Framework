/*Filename: LoginPage.js
Handles the login page events*/

define(["jquery","selfcare", "page", "models/login/LoginModel",  "validators/UnameValidator", "validators/PasswordValidator"], 

function($, SELFCARE, Page, Model, UnameValidator, PasswordValidator){
		
			var LoginPage = Page.extend({
				
				//Page events
				events: {
					"click #loginIcon" : "onLoginTap",
					"click #signupIcon" : "onSignupTap",
					"click #forgotPwdLink" : "onForgotPasswordTap",
					"focusout  #username" : "validateUsername",
					"focusout  #password" : "validatePassword"					
				},
				
				// Default Constructor
				constructor: function LoginPage() {
					Page.prototype.constructor.apply(this, arguments);
				},

				/*Function Name: initialize
				 * Arguments: No
				 * Description:Initializing JS page
				 */
				initialize : function()	{
					this.$el = this.loadEl("loginPage");				
				},


				/*Function Name: renderView
				 * Arguments: No
				 * Description:Rendering view according to corresponding
				 * HTML page
				 */
				renderView : function()	{
					var page = this;
					var html = SELFCARE.TemplateHelper.populate("login/pg-login");
					this.$el.html(html);
					$("#homeScreenLogo").hide();
					this.showMessageForLabel ("userNameLabel", "selfcare.login.usernameLabel");
					this.showMessageForLabel ("passwordLabel", "selfcare.login.passwordLabel");
					this.showMessageForLabel ("rememberMeLabel", "selfcare.login.rememberMeLabel");
					this.showMessageForLabel ("loginLabel", "selfcare.login.loginLabel");
					this.showMessageForAnchor ("forgotPasswordText", "selfcare.login.forgotPasswordText");
					this.showMessageForAnchor ("newUserText", "selfcare.login.newUserText");	
					
				},
				
				
				/*Function Name: validateUsername
				 * Arguments: No
				 * Description:Validate username
				 * HTML page
				 */
				validateUsername : function(){
					var uname=$("#username").val();
					if(uname == "") {
						this.showMessageForField ("username", "selfcare.common.noUsername");
						return false;
					} 
					else {
						var validUname = new UnameValidator().validate(uname);
						if(!validUname ){
							this.showMessageForField ("username", "selfcare.login.invalidUsername");
							return false;
						} 
						else {
							this.hideMessageForField("username");
							return true;
						}
					}
			    },
			    
				/*Function Name: validatePassword
				 * Arguments: No
				 * Description:Validate password
				 * HTM
				 */
				validatePassword : function() {
					var pwd=$("#password").val();
					if(pwd == "") {
						this.showMessageForField ("password", "selfcare.common.noPassword");
						return false;
					} 
					else {
						var validPassword = new PasswordValidator().validate(pwd);
						if(!validPassword) {
							this.showMessageForField ("password", "selfcare.login.invalidPassword");
							return false;
						} 
						else {
							this.hideMessageForField("password");
							//$("#userNameMessageBox").hide();
						//	$("#passwordMessageBox").hide();
						//	$("#loginFailedMessageBox").hide();
							//model.setUserName(pwd);
							return true;
						}
					}
				},
								
				/*Function Name: loginFailed
				 * Arguments: No
				 * Description:show error message on login failed
				 */
				loginFailed : function(){
					this.showMessageForField ("loginFailed", "selfcare.login.loginFailed");
				},

				
				/*Function Name: dropdown
				 * Arguments: No
				 * Description:calls the dropdownMenu function at Page.js
				 * 
				 */
				/*dropdown : function(){
					var userName = this.getRouter().app.sessionContext.getAttribute("userName");
					var ssoToken = this.getRouter().app.sessionContext.getAttribute("ssoToken");
					this.dropdownMenu(ssoToken,userName);
				},*/
				
				
				/*Function Name: logodropdown
				 * Arguments: No
				 * Description: Generate  drop down options
				 * 
				 */	
				
				/*Function Name: updateModel
				 * Arguments: No
				 * Description: It will set username and password to model
				 */
				updateModel : function() {
					var model = this.getModel();
					var uname=$("#username").val();
					var pwd=$("#password").val();
					var status= "";
					if($("#checkbox").is(':checked')){
						status= "T";
					}	
					model.setUsername(uname);
					model.setPassword(pwd);
					model.setStatus(status);
					return true;
				},

				/*Function Name: onLoginTap
				 * Arguments: event
				 * Description: Generate a trigger event on clicking Login button
				 * on Login page template
				 */
				onLoginTap : function(event) 
				{
					event.preventDefault();
					var valun=this.validateUsername();
					var valpwd=this.validatePassword();
					if(valun && valpwd){
						this.updateModel();
						var options = {"page":this};				
						this.trigger("performLogin", options);
					}
				},
				
				/*Function Name: onForgotPasswordTap
				 * Arguments: event
				 * Description: Generate a trigger event on clicking forgot password link
				 * on Login page template
				 */
				onForgotPasswordTap : function(event) {
					event.preventDefault();
					var valun=this.validateUsername();
					var uname=$("#username").val();
					if(uname==""){
						this.hideMessageForField("password");
						this.showMessageForField ("username", "selfcare.resetpassword.noUsername");
					}
					else{
						this.updateModel();						
						var options = {"page":this};
						this.trigger("generateotpmsg", options);
					}
				},
				
				/*Function Name: forgotPassword
				 * Arguments: No
				 * Description: Function nevigate  to forget password screen
				 */
				forgotPassword : function(){
					var options = {"page":this};
					this.trigger("showForgotPassword", options);
				},

				/*Function Name: onSignupTap
				 * Arguments: event
				 * Description: Route to signup router to handle signup functions
				 */
				onSignupTap : function(event)
				{
					this.$el.find("#signupIcon").attr('href','#signup/signuprouting');
				},

				/*Function Name: onLoginTextKeyPress
				 * Arguments: event
				 * Description: Clear Message when user starts typing in the 
				 * input fields
				 */
				onLoginTextKeyPress : function(event) {
					$( "#userNameMessageBox" ).hide();
					$( "#passwordMessageBox" ).hide();
					$( "#loginFailedMessageBox" ).hide();
					if (event.keyCode == 13){
						this.$el.find("#userNameText").blur();
						this.$el.find("#passwordText").blur();
					}				
				},
				

				/*Function Name: onDispose
				 * Arguments: No
				 * Description:Dispose the model
				 */
				onDispose : function() {
					this.model.cleanup();
				}

			});
			return LoginPage;
		}
);
