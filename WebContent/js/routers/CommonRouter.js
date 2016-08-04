/* Filename: CommonRouter.js
Router for handling the common requests.*/
define(
	[
	 	"routers/Router",
	 	"selfcare",
	 	"models/common/EnvironmentList", 
	 	"models/common/EnvironmentDetail",
	 	"models/common/SessionContext"
	], 
	 
	function(
		Router,
		SELFCARE,
		EnvironmentList,
		EnvironmentDetail,
		SessionContext) {

		var CommonRouter = Router.extend({

		routes : {
			"back/:page" : "goBack",
			"common/Settings" : "showEnvironmentSettings"
		},

		constructor : function CommonRouter() {
			Router.prototype.constructor.apply(this, arguments);
		},
		
		showEnvironmentSettings : function() {
			var activeEnvironment = SELFCARE.Config.environment;
			var environmentList = new EnvironmentList();			
			var environments = [];
			
			var AllEnvironmentMappings = SELFCARE.ServerMappings.getAllServerEntry();
			$.each(AllEnvironmentMappings,function(key,val){
				var environment = {};
				environment.title = key;
				environment.selected = (environment.title === activeEnvironment)?true:false;
				environments.push(environment);
			});
			environmentList.add(environments);
			this.app.clear();
		},

		addEnvironment : function(options) {
			console.log("Inside add environment in router ... ");
		},

		saveEnvironmentDetails : function(options) {

			console.log("Inside saveEnvironmentDetails in router ... ");
			console.log("Service URL's saved successfully");
		},

		removeEnvironment : function(options) {
			console.log("Inside removeEnvironment in router ... ");

		},

		selectCurrentEnvironment : function(options) {
			console.log("Inside selectCurrrentEnvironment in router ... ");

			SELFCARE.Config.environment = options.environmentName;
			SELFCARE.ServerMappings.load();
			console.log(SELFCARE.ServerMappings.mappings);
		},

		// Navigate back
		goBack : function(page) {
			this.app.back();
		},
		
		//Function to authenticate session
		validateSession : function(){			
			var sessionContext = new SessionContext();
			var isValidSession = true;
			var accessToken = sessionContext.getAccessToken();
			var inputParam = {};
			inputParam.accessToken = accessToken;
			var request = {
				"serviceId" : "sessionValidate",
				data : JSON.stringify(inputParam),		
				"successCallback" : function(data) {					
					isValidSession = true;
				},					
				"failureCallback" : function(errorText) {					
					isValidSession = false;
				}				
			};
			SELFCARE.RestHelper.invoke(request);
			return isValidSession;			
		}

	});
	return CommonRouter;
});
