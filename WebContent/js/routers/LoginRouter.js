/*Filename: LoginRouter.js
Router for handling the Login Capabilities requests.*/
define(
		["routers/Router"
		 ], 

		 function(Router) {

			var SELFCARE, 
			LoginPage,
			ForgotPasswordview,
			LoginModel;

			var LoginRouter = Router.extend({
				//The routes handled by the login router
				routes: {
					"login/loginView" : "initAndShowLoginView",
				},

				loginPage : {},

				/*Function Name: initAndShowLoginView
				 * Arguments: No
				 * Description: Entry point for the LoginRouter 
				 */
				initAndShowLoginView : function() 
				{
					var router = this;
					require([
					         "selfcare",	
					         "views/login/LoginPage",
					         "models/login/LoginModel",
					         "routers/CommonRouter",
					         "routers/SignUpRouter",
					         "views/login/ForgotPasswordview"
					         ], 
					         function (SELFCAREDef, 
					        		 LoginPageDef,
					        		 LoginModelDef,
					        		 CommonRouterDef,
					        		 SignUpRouterDef,
					        		 ForgotPasswordDef
					         ) {
						SELFCARE = SELFCAREDef; 
						LoginPage = LoginPageDef; 
						LoginModel = LoginModelDef;
						CommonRouter = CommonRouterDef;
						SignUpRouter = SignUpRouterDef;
						ForgotPasswordview=ForgotPasswordDef;
						this.commonRouter = new CommonRouter();
						var isValidSession = this.commonRouter.validateSession();	
						if(isValidSession == true){						
							router.showLoginView();	
						}
						else{
							router.showLoginView();	
						}
						$('#selfcare-menubar').css("display","none");
						$('.selfcare-mainLogo1').css("display","none");
					});
				},

				/*Function Name: constructor
				 * Arguments: No
				 * Description:Default Constructor
				 */
				constructor: function LoginRouter() 
				{
					Router.prototype.constructor.apply(this, arguments);
				},

				/*Function Name: showLoginView
				 * Arguments: No
				 * Description: Display Login Page and handling of events
				 * when ant trigger is raised from .JS page
				 */
				showLoginView : function()
				{				
					this.app.clear();	
					
					this.loginPage = new LoginPage();
					this.loginPage.setModel(new LoginModel());
					this.loginPage.setRouter(this);	
					this.loginPage.listenTo(this.loginPage, "performLogin", this.performLogin);
					this.loginPage.listenTo(this.loginPage, "generateotpmsg", this.generatePwdResetOTP);
					this.loginPage.listenTo(this.loginPage, "showForgotPassword", this.showForgotPasswordView);
					this.app.add(this.loginPage);
					
				},

				/*Function Name: showForgotPasswordView
				 * Arguments: options
				 * Description: Display Forgot Password Page and handling of events
				 * when ant trigger is raised from .JS page
				 */
				showForgotPasswordView : function(options) {
					var loginPage = options.page;
					var router = loginPage.getRouter();
					router.app.clear();	
					router.forgotPasswordPage = new ForgotPasswordview();
					router.forgotPasswordPage.setModel(new LoginModel());
					router.forgotPasswordPage.setRouter(router);	
					router.forgotPasswordPage.listenTo(router.forgotPasswordPage, "changePassword", router.resetLoginPassword);
					router.forgotPasswordPage.listenTo(router.forgotPasswordPage, "resendOtp", router.generatePwdResetOTP);
					router.app.add(router.forgotPasswordPage);
				},


				/*Function Name: performLogin
				 * Arguments: options
				 * Description: Action to be taken when Login button is pressed in the 
				 * login page 
				 */
				performLogin : function(options)
				{
					var inputParam;
					var loginPage = options.page;
					var router = loginPage.getRouter();
					var loginModel = loginPage.getModel();
					var userNameText = loginModel.getUsername();
					var passwordText = loginModel.getPassword();
					var status= loginModel.getStatus();
					if(status=="T"){
						inputParam = {
								"identifier":userNameText,
								"password":passwordText,
								"upgradeAuth":"Y",
								"deviceInfo": {
									"consumptionDeviceName": "my Tabs",
									"info": {
										"type": "android 2.3"
									}
								},
								"rememberUser":"T"
						};
					}
					else{
						inputParam = {
								"identifier":userNameText,
								"upgradeAuth":"Y", 
								"password":passwordText  				
						};
					}
					var flag = false;
					var request = {
							"serviceId" : "Authenticate",
							//headers : {"Authorization" : router.app.sessionContext.getAccessToken()},
							headers : {"X-API-Key" :"l7xx7c12b30ae366470dab3958a1bdae8e4d"},
							data : JSON.stringify(inputParam),
							"successCallback" : function(data) {
								var sso = true;
								router.app.sessionContext.setAttribute("userName",userNameText);
								router.app.sessionContext.setAttribute("ssoToken",sso);
								//alert("Login Success!!!!");
								router.navigate("#myprofile/myprofilepage",{trigger : true,replace : true});
								/*flag = true;
								for(var i=0 ; i < data.length ; i++){
									if(data[i].Username == userNameText && data[i].Password == passwordText){
										flag = true;
									}
								}
								if(flag == true){
									//alert("Login Success!!!!"+" "+JSON.stringify(data));
								} else {
									loginPage.loginFailed();
									//alert("Login Failed!!!");
								}*/
							},

							"errorCallback" : function(errorText) {
								loginPage.loginFailed();
								var errorObject = new WCSErrorHandler().handleError(errorText);                               
								router.app.getCurrentPage().showErrors(errorObject);
							}
					};    
					SELFCARE.RestHelper.invoke(request);
				},

				/*Function Name: generatePwdResetOTP
				 * Arguments: No
				 * Description: Function is used to generate the OTP based on username 
				 */
				generatePwdResetOTP : function(options){
					var inputParam;
					var loginPage = options.page;
					var router = loginPage.getRouter();
					var loginModel = loginPage.getModel();
					var userNameText = loginModel.getUsername();
					inputParam = {
							"identifier":userNameText
					};
					var request = {
							"serviceId" : "otpGeneration",
							//headers : {"Authorization" : router.app.sessionContext.getAccessToken()},
							headers : {"X-API-Key" :"l7xx7c12b30ae366470dab3958a1bdae8e4d"},
							data : JSON.stringify(inputParam),
							"successCallback" : function(data) {
								loginPage.forgotPassword();
							},

							"errorCallback" : function(errorText) {
								var errorObject = new WCSErrorHandler().handleError(errorText);                               
								router.app.getCurrentPage().showErrors(errorObject);
							}
					};
					SELFCARE.RestHelper.invoke(request);
				},

				/*Function Name: resetPassword
				 * Arguments: No
				 * Description: Function is used to reset password based on user name and otp 
				 */
				resetLoginPassword : function(options){
					var inputParam;
					var fpPage = options.page;
					var router = fpPage.getRouter();
					var fpModel = fpPage.getModel();
					var userNameText = fpModel.getUsername();
					var otpNo=fpModel.getOtpno();
					var newPassword=fpModel.getNewPassword();
					inputParam = {
							"newPassword": newPassword,
							"identifier": userNameText,
							"otp": otpNo
					};
					var request = {
							"serviceId" : "resetPassword",
							//headers : {"Authorization" : router.app.sessionContext.getAccessToken()},
							headers : {"X-API-Key" :"l7xx7c12b30ae366470dab3958a1bdae8e4d"},
							data : JSON.stringify(inputParam),
							"successCallback" : function(data) {
								fpPage.showLogin();
								//	loginPage.forgotPassword();
								/*flag = true;
								for(var i=0 ; i < data.length ; i++){
									if(data[i].Username == userNameText && data[i].Password == passwordText){
										flag = true;
									}
								}
								if(flag == true){
									//alert("Login Success!!!!"+" "+JSON.stringify(data));
								} else {
									loginPage.loginFailed();
									//alert("Login Failed!!!");
								}*/
							},

							"errorCallback" : function(errorText) {
								var errorObject = new WCSErrorHandler().handleError(errorText);                               
								router.app.getCurrentPage().showErrors(errorObject);
							}
					};    
					SELFCARE.RestHelper.invoke(request);
				}

			});  
			return LoginRouter;
		});
