// Filename: SettingsPageModel.js
// Model for SELFCARE settings page
define(
	[
	 	"model",
	 	"models/common/EnvironmentList", 
	 	"models/common/EnvironmentDetail"],
	function (Model, EnvironmentList, EnvironmentDetail) {
		
		var SettingsPageModel = Model.extend({
			
			list : new EnvironmentList(),
			
			constructor: function SettingsPageModel() {
		        Model.prototype.constructor.apply(this, arguments);		        
		    },
			
			addEnvironment : function(environmentName) {
				var environmentDetail = new EnvironmentDetail({"title" : environmentName});
				this.list.add(environmentDetail);
				environmentDetail.save();
				this.trigger("refresh");
			},
			
			getEnvironment : function(name) {
				return this.list.findWhere({"title" : name});
			},
		
			
			saveEnvironmentDetails : function (environmentName, details) {
				var environment = this.getEnvironment(environmentName);				
				environment.save({"details" : details});
				this.trigger("refresh");
			},
			
			
			removeEnvironment : function(environmentName) {
				var environment = this.getEnvironment(environmentName);
				environment.destroy();
				this.trigger("refresh");
			},
			
			selectCurrentEnvironment : function(environmentName) {
				var currentSelectedEnvironments = this.list.selectedEnvironment();
				var newSelectedEnvironment = this.getEnvironment(environmentName);
				currentSelectedEnvironments.forEach(function(environment){
					environment.toggleSelection();
				});
				
				newSelectedEnvironment.toggleSelection();

				this.trigger("refresh");
			},
			
			
			
			setEnvironmentList : function(serverList) {
				this.set({"list" : serverList});
			},
			
			getSettingsMenu : function(){

				var menu=[];
				this.list.models.forEach(function(model) {
					
					console.log("model in settings menu ",model);
					
					var menuItem = {};
					menuItem.title = model.get("title");
					menuItem.selected = model.get("selected");
					menu.push(menuItem);
				});
				return menu;
			},
			
			clearLocalStorage : function(){
				this.list.localStorage._clear();
			}
			
			
			
		});	
		
		return SettingsPageModel;
	}
);