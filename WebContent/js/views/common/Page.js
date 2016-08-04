// Filename: views/common/Page.js
// Encapsulates a SELFCARE Page 
// Common functionalities such as showing error message
// linking with the respective browser etc 

define(
	["jquery", "view", "selfcare"], 

	function($, View, SELFCARE) {	
		//Default Composite View Model to be used across the screens
		var page = View.extend({
			
			constructor: function Page() {
				View.prototype.constructor.apply(this, arguments);
			},
			
			events: {
			},
			
			/*Function Name: initialize
			 * Arguments: No
			 * Description:Initializing JS page
			 */
			initialize : function()	{
				$("#homeScreenLogo").show();
				this.$el = this.loadEl("Page");			
			},
			
			loadEl : function(id) {
				var queryString = "#"+id;
				var $el = $(queryString);
				
				if ($el.size() == 0) {
					$el = $('body').append('<div id="'+id+'" />').find(queryString);
				}
				return $el;
			},
			
			/*loadEl : function(id) {
				var queryString = "#Page";
				var $el = $(queryString);
				
				if ($el.size() == 0) {
					$el = $('body').append('<div id=Page />').find(queryString);
				}
				return $el;
			},*/
			// Show error message
			showMessage : function(messageId, args) {	
		  
				
			},
			
			//svn change
			showServiceErrorMessages : function(message) {	
				
				
			},
			

			
			showMessageForField : function(fieldId, messageId, args) {				
				var message = SELFCARE.Messages.getMessage(messageId, args);                      
                this.$el.find("*[data-messageFor='"+fieldId+"'] div").html(message).parent().show();
                this.$el.find('#'+fieldId).parent().addClass("selfcare-errorMsgtextbox");
                
			},
			
			//Display the label dynamically
			showMessageForLabel : function(labelId, messageId, args) {				
				var label = SELFCARE.Labels.getLabel(messageId, args);                      
                this.$el.find("*[data-messageFor='"+labelId+"'] div").html(label).parent().show();
                this.$el.find("*[data-messageFor='"+labelId+"'] span").html(label).parent().show();
			},
			
			//Display the label dynamically
			showMessageForRequiredLabel : function(labelId, messageId, args) {				
				var label = SELFCARE.Labels.getLabel(messageId, args);                      
                this.$el.find("*[data-messageFor='"+labelId+"'] div").html(label+"<span class=selfcare-sp1-requiredStar>*</span>").parent().show();
			},
			
						
			showMessageForAnchor : function(labelId, messageId, args) {				
				var label = SELFCARE.Labels.getLabel(messageId, args);                      
                this.$el.find("*[data-messageFor='"+labelId+"']").html(label).parent().show();
			},
			
			
			
			validateField :  function(fieldId){
					
			},
			
			// hide error message
			hideMessage : function() {  
				
			},
			//svn change
			showErrors : function(errorObject) {
				
				
			},
			showErrorsForFields : function(fieldId,errorObject) {
				
				
			},
			
			// hide error message
			hideMessageForField : function(fieldId) {  
				this.$el.find("#messageBox div").html("").parent().hide();
                this.$el.find("*[data-messageFor='"+fieldId+"'] div").html("").parent().hide();
                this.$el.find('#'+fieldId).parent().removeClass("selfcare-errorMsgtextbox");

			},
			
			//Sets the router
			setRouter : function(router) {
				this["router"] = router;
			},
			
			//Gets the router
			getRouter : function() {
				return this["router"];
			},
			
			//To save the page state before loading next page 
			passivate : function() {
				
			},
			
			//To load page's previous state
			activate : function() {
				
			}, 
			
			show : function() {
				View.prototype.show.apply(this, arguments);
				this.router.navigate(this.$el.attr("id"));
			},
			
			dispose : function() {
				if (typeof this.onDispose == 'function') {				
					this.onDispose();
				}
				
				if (this.router != null) {
					this.router.stopListening(this);
				}
				this.router = null;
				this.remove();
				this.$el = null;

				
			},
			
			/*Function Name: dropdown
			 * Arguments: No
			 * Description: Generate  drop down options
			 */
			dropdownMenu : function(ssoToken,userName) {
					this.renderMenubar(userName);
					var height = $( window ).height();
					var finalheight = height - 200;
					if(ssoToken != undefined){
						this.showMessageForLabel("loggedStatusLabel","selfcare.dropdown.logoutLabel");
					}else{
						this.showMessageForLabel("loggedStatusLabel","selfcare.dropdown.loginLabel");
					}
					$(".selfcare-ap-homemenua ul").css("height",finalheight+"px");
					$('#selfcare-menubar').slideDown({duration:1000});
					$('.selfcare-mainLogo1').slideDown({duration:10});
				},
				
			/*Function Name: renderMenubar
			 * Arguments: No
			 * Description: Generate  drop down options
			 * 
			 */	
			renderMenubar : function(userName){
				
				var usernametext =   userName;
				var html = SELFCARE.TemplateHelper.populate("common/dropdown");
				this.$el.find("#menubar").html(html);
				if(usernametext != undefined){
					$("#selfcare-accountholdername").html(usernametext);
				}
				else{
					$("#selfcare-accountholdername").html("");
				}
			}
			
		
		});		
		return page;	
	}
);