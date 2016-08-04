// Filename: app.js
// This file defines the app modules that will 
// stack all the SELFCARE pages 
define([
        "jquery",    
        "models/common/AuthContext",
        "models/common/SessionContext",
        "routers/CommonRouter",
        "routers/LoginRouter",
		"routers/SignUpRouter",
		"routers/ContactUsRouter",
	    "routers/TopUpRechargeRouter",
		"routers/MyProfileRouter",
		"routers/StatementAccountRouter",
		"routers/ManageServicesRouter",
		"routers/MyOrderRouter",
		"routers/MyAppointmentRouter",
		"routers/RelocateRouter",
		"routers/ServiceRequestRouter"
		
        
    ], 
    function(
		$,
		AuthContext,
		SessionContext,
		CommonRouter,
		LoginRouter,
		SignUpRouter,
		ContactUsRouter,
		TopUpRechargeRouter,
		MyProfileRouter,
		StatementAccountRouter,
		ManageServicesRouter,
		MyOrderRouter,
		MyAppointmentRouter,
		RelocateRouter,
		ServiceRequestRouter
		){
	
		var App = {
			
			pages : [],
			
			// Initializes the APP module and listen for events 
			initialize : function() {			
				//Pass in our Router module and call it's initialize function			
				var options= {"app" : this};
				
				//document.addEventListener("deviceReady", App.back(options),false);
				
				
	
				var commonRouter = new CommonRouter($.extend({}, options));
				var loginRouter = new LoginRouter($.extend({}, options));
				var signupRouter = new SignUpRouter($.extend({}, options));
				var manageServiceRouter = new ManageServicesRouter($.extend({}, options));
				var contactUsRouter = new ContactUsRouter($.extend({}, options));
				var topUpRechargeRouter = new TopUpRechargeRouter($.extend({}, options));
				var myprofileRouter  = new MyProfileRouter($.extend({}, options));
				var statementaccountrouter =  new StatementAccountRouter($.extend({}, options));
				var relocateRouter = new RelocateRouter($.extend({},options));
				//var serviceRequestRouter = new ServiceRequestRouter($.extend({}, options));
				
				var myOrderRouter = new MyOrderRouter($.extend({}, options));
				
				var myAppointmentRouter = new MyAppointmentRouter($.extend({}, options));
				var serviceRequestRouter = new ServiceRequestRouter($.extend({}, options));
				this.authContext = new AuthContext();
				this.sessionContext = new SessionContext();
				
				 var isOnLine = navigator.onLine;
			     if (isOnLine) {
			    	 this.sessionContext.setAttribute("isOnline", true);
			     } else {
			    	 this.sessionContext.setAttribute("isOnline", false);
			     }
				
				//catalogRouter.showSearchView();
				Backbone.history.start();	
				
				loginRouter.initAndShowLoginView(options);	
				//this.addEventListener("backbutton", this.back(), false);
				
			},
			
			intRouter : function(options){
				loginRouter.initAndShowLoginView(options);	
			},
			
			
			// Add a page to the page stack
			add : function (page) {
				var pages = this.pages;			
				if (!page.isRendered) { 
					page.render();
				}
				if (pages.length > 0) {
					var lastPage = pages.pop();				
					lastPage.hide();
					lastPage.passivate();
					pages.push(lastPage);
				}			
				pages.push(page);			
				page.show();
				$('#mainlogo').click(function(event) {
					var userName = pages[0].router.app.sessionContext.getAttribute("userName");
					var ssoToken = pages[0].router.app.sessionContext.getAttribute("ssoToken");
				
					var height = $( window ).height();
					var finalheight = height - 200;
						if(ssoToken != undefined){
							$("#logStatus").html("Logout");
							$(".selfcare-menubar-myorders,.selfcare-menubar-mycart,.selfcare-menubar-mynotification,.selfcare-menubar-manageservices,.selfcare-menubar-servicerequest,.selfcare-menubar-relocation").show();

						} else{
							$("#logStatus").html("Login");
							$(".selfcare-menubar-myorders,.selfcare-menubar-mycart,.selfcare-menubar-mynotification,.selfcare-menubar-manageservices,.selfcare-menubar-servicerequest,.selfcare-menubar-relocation").hide();

						}
					var usernametext =   userName;
					if(usernametext != undefined){
						$("#selfcare-accountholdernames").html(usernametext);
					}
					else {
						$("#selfcare-accountholdername").html("");
					}
					
					
					if($('#myModal').hasClass('in')){
						$('#myModal').modal('hide');
						flag = true;
						 
					}else{
						flag = false;
						
					}
					
					
					
						$(".selfcare-ap-homemenua ul").css("height",finalheight+"px");
						$('#selfcare-menubar').slideDown({duration:1000});
						$('.selfcare-mainLogo1').slideDown({duration:10});
						
				$('#bottomlogo').click(function() {
						$('#selfcare-menubar').slideUp({duration:500});
						$('.selfcare-mainLogo1').slideUp({duration:1000});
						if(flag){
							$('#myModal').modal('show');
							flag = false;
						}
					});
				
				
				$('#home').click(function() {
					if($("#logStatus").text() == "Logout"){
						$("#home").attr("href", "#myprofile/myprofilepage");	
					}else {
						$("#home").attr("href", "#login/loginView");	
					}
					
				});
				
				
				
				$('#logStatus').click(function() {
				//alert($("#logStatus").text());
					if($("#logStatus").text() == "Logout"){
					
				
		
					$("#logStatus").attr("href", "#login/loginView");
					
						//alert('hi in logout');
						//this.showMessageForLabel("loggedStatusLabel","selfcare.dropdown.loginLabel");
						pages[0].router.app.sessionContext.setAttribute("userName",undefined);
						pages[0].router.app.sessionContext.setAttribute("ssoToken",undefined);
						$("#selfcare-accountholdernames").html("");
						$("#logStatus").html("Login");
					}else{
					$("#logStatus").attr("href", "#login/loginView");
					}
				});
				 event.stopImmediatePropagation();
				 	
				});
			},
			
			// Remove the current page and 
			// refresh the view with the last page in the 
			// stack 
			back : function() {				
				var pages = this.pages;
				var currentPage = pages.pop();
				currentPage.dispose();
				
				if (this.pages.length > 0) {
					var lastPage = pages.pop();
					lastPage.activate();
					lastPage.show();
					pages.push(lastPage);
				}			
			},
			// Remove the two pages and 
			// refresh the view with the last page in the 
			// stack 
			pop2Pages : function() {
				var pages = this.pages;
				var currentPage = pages.pop();
				currentPage.dispose();
				currentPage = pages.pop();
				currentPage.dispose();
				if (this.pages.length > 0) {
					var lastPage = pages.pop();
					lastPage.activate();
					lastPage.show();
					pages.push(lastPage);
				}			
			},
			getCurrentPage : function() {
				var pages = this.pages;
				return pages.length > 0 ? pages[pages.length - 1] : null;
			},
		
			moveToSpecifiedPage : function(page)
			{
				var pages = this.pages;				
				for (var i = pages.length - 1; i > -1; --i) {				
								
					if (pages[i] == page) {		
							var page = pages.pop();
							page.activate();
							page.show();
							pages.push(page);
							break;
						}	
					else {
						var oldpage = pages.pop();
						oldpage.dispose();
					}
						
				}
					
			},
			// Remove the current page and 
			// refresh the view with the last page in the 
			// stack 
			remove : function(page) {
				
				//console.log("inside remove of the app....");
				var pages = this.pages;
				
				for (var i = pages.length - 1; i > -1; --i) {				
					//console.log("Checking for a match....");				
					if (pages[i] == page) {
						//console.log("Found a match....");
						pages[i].dispose();
						pages.splice(i, 1);
					}
				}		
			},	
			
			
			// Clears the page stack and the pages stacked
			clear : function() {
				var pages = this.pages;
				for (var i = 0, j = pages.length; i < j; i++) {
					pages[i].dispose();
				}			
				pages.length = 0;
			},


			
		};	
		return App;
	}
);
