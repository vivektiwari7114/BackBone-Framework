define(["jquery", "mockajax", "handlebars"], 
	
	function($, mockajax, Handlebars) {
	
		// Extending array for indexOf feature 
		if (typeof(Array.prototype.indexOf) == "undefined") {
			
			Array.prototype.indexOf = function(val) {
				for (var i=0; i<this.length; i++) {
					if (this[i] == val) {
						return i;
			    	}
				}				
				return -1;
			};
		}
	
		// Extending string for formatting 
		if (typeof(String.prototype.format) == "undefined") {
			String.prototype.format = function() {
			    var args = arguments;			
			    return this.replace(/\{(\d+)\}/g, function() {
			        return args[arguments[1]];
			    });
			};
		}
		
		//Extending string for trim functionality 
		if (typeof(String.prototype.trim) == "undefined") {			
			String.prototype.trim = function() {
				return this.replace(/^\s+|\s+$/g, '');
			};
		}
		//Extending string for ltrim functionality 
		if (typeof(String.prototype.ltrim) == "undefined") {
		
			String.prototype.ltrim = function() {
				return this.replace(/^\s+/,'');
			};
		}
		//Extending string for rtrim functionality
		if (typeof(String.prototype.rtrim) == "undefined") {
			String.prototype.rtrim = function() {
				return this.replace(/\s+$/,'');
			};
		}
		//Extending string for fulltrim functionality
		if (typeof(String.prototype.fulltrim) == "undefined") {
			
			String.prototype.fulltrim = function() {
				return this.replace(/(?:(?:^|\n)\s+|\s+(?:$|\n))/g,'').replace(/\s+/g,' ');
			};
		}
		
		//Registering default plugins

		$.fn.maxContentHeight = function() {			
			
			// TODO TO BE OPTIMIZED !!!!
			var max = 0;
			
			this.each(function() {
				h = $(this).height();
				max = h > max ? h : max;	
			});
				
			return max;
		};
			
			
		$.fn.makeSameHeight = function() {
			var obj = this;
			obj.css({"height":"auto"});
			setTimeout(function(){
				var maxHeight = obj.maxContentHeight();
				obj.height(maxHeight);
			},10);
			return this;
		};




	
		
		
		
		
		// Features 
		// 1. Abstraction of MVVM  
		// 2. Dynamic Configurations
		// 3. Template Mapping - Decoupling of Handlebars *
		// 4. Web Service Connectivity 
		// 5. Generic Exception Handling and Logging
		// 6. Field Mappings and Validators 
		// 7. Data Binding and Page Transitions 
		// 8. Offline Storage 
		// 9. jQuery Plugins 

		
		//Selfcare Core Namespace
		SELFCARE = {};
		
		//Logger component 
		SELFCARE.Logger = {
			
			SEVERE : 0,
			WARN : 1,
			INFO : 2, 
			DEBUG : 3,
			LEVEL : 3,	
			
			//Providing an abstraction layer. To be replaced by a 
			// proper logging framework
			log : function(level, message, args) {
				if (level <= this.LEVEL) {
					console.log(message.format(args));
				}
			}
		};
		
		// Configuration component 
		SELFCARE.Config =  {};
		
		// Loads the mapping file defined by the given 
		// file name and triggers the callback with data
		SELFCARE.loadMappingFile = function(fileName, callback) {
			$.ajax({
				  url: fileName,
				  contentType:"application/json",
				  async:false,
				  type: "GET",
				  success: callback
			});
			
		};
		
		// Field Mapping Component to be used to validated 
		// form field inputs 
		SELFCARE.FieldMapping = {			
			// TODO : Move to off-line storage model
			mappings : {},			
			load : function() {
		    	$.ajax({
					  url: SELFCARE.Config.fieldMappingFile,
					  contentType:"application/json",
					  async:false,
					  type: "GET",
					  success: function(response) {			
						  SELFCARE.FieldMapping.mappings = JSON.parse(response).mappings;					  
					  }
				});
			},
			getFieldDefinition : function (fieldType) {
				return SELFCARE.FieldMapping.mappings[fieldType];
			}
		};
		
		
		//The field type validator 
		SELFCARE.Validator = {
			validateField : function(fieldType, value) {
				var fieldDefinition = SELFCARE.FieldMapping.getFieldDefinition(fieldType);
				if (fieldDefinition != null) {
					if (fieldDefinition["regexp"] != null && fieldDefinition["regexp"].test(value)) {
						return false;
					} 
					if (fieldDefinition["minLength"] != null) {
						//TODO: add code later.
					}				
				}
				return true;
			}
		};
		
		
		SELFCARE.AuthContext = {
			teamMemberId : "",
			storeId : ""
		};
		
		
		// Field Mapping Component to be used to validated 
		// form field inputs 
		SELFCARE.Messages = {
				
			getMessage : function (messageId, args)	{
				
				//TODO : this need to be changed to select the locale from the 
				// environment once i18n is in place.
				var locale = SELFCARE.Config.defaultLocale;				
				return this._getMessage(locale, messageId, args);
			},
				
			_getMessage : function(locale, messageId, args) {
				var messageText = SELFCARE.Messages[messageId];	
				if (messageText == null) {
					messageText = messageId;
				} else {
					messageText = messageText.format(args);
				}
				return messageText;
			},	
			
			load : function() {
		    	$.ajax({
					  url: SELFCARE.Config.messagesFile,
					  contentType:"application/json",
					  async:false,
					  type: "GET",
					  success: function(response) {
						  $.extend(SELFCARE.Messages, JSON.parse(response).messages);						  				  
					  }
				});
			}				
		};
		
		// Label Mapping
		SELFCARE.Labels = {
				
			getLabel : function (messageId, args)	{
				
				//TODO : this need to be changed to select the locale from the 
				// environment once i18n is in place.
				var locale = SELFCARE.Config.defaultLocale;				
				return this._getLabel(locale, messageId, args);
			},
				
			_getLabel : function(locale, messageId, args) {
				var labelText = SELFCARE.Labels[messageId];	
				if (labelText == null) {
					labelText = messageId;
				} else {
					labelText = labelText.format(args);
				}
				return labelText;
			},	
			
			load : function() {
		    	$.ajax({
					  url: SELFCARE.Config.labelsFile,
					  contentType:"application/json",
					  async:false,
					  type: "GET",
					  success: function(response) {
						  $.extend(SELFCARE.Labels, JSON.parse(response).labels);						  				  
					  }
				});
			}				
		};
		
		SELFCARE.ServerMappings = {
				
			mappings : {},
				
			load : function() {
		    	$.ajax({
					  url: SELFCARE.Config.serverMappingFile,
					  contentType:"application/json",
					  async:false,
					  type: "GET",
					  success: function(response) {						 
						  var mappings = JSON.parse(response).mappings;
						  $.extend(SELFCARE.ServerMappings.mappings, mappings);
					  }
				});
		    },
		    
		    
		    getServerEntry : function(serverName) {
		    	return $.extend(true, {}, this.mappings[serverName]);
		    },
		    
		    
		    getServerUrlPrefix : function(serverName, isSecured) {
		    	var serverEntry = this.mappings[serverName];
		    	if (serverEntry != null) {
		    		if (isSecured) {
		    			return serverEntry.secureUrlPrefix;
		    		} else {
		    			return serverEntry.urlPrefix;
		    		}
		    	}
		    	
		    	return "";
		    }
		};
		
		
		// Mapping of the REST services being used 
		SELFCARE.ServiceMapping = {
				
			mappings : {},
			
			// Loads the services from the mappings file configured 
			// in the configuration
			load : function() {
		    	$.ajax({
					  url: SELFCARE.Config.serviceMappingFile,
					  contentType:"application/json",
					  async:false,
					  type: "GET",
					  success: function(response) {			
						  SELFCARE.ServiceMapping.mappings = JSON.parse(response).mappings;						  
					  }
				});	    	
		    },
		    
		    // Register the mock URLs 
		    registerMockUrls : function() {
		    	
		    	   	
		    	$.mockjax(function(settings) {		
		    		
		    		if (settings.params != null) {		    		 
			    		 
		    			var serviceId = settings.params["serviceId"];
			    		var contentType = settings["contentType"];
			    		var suffix = contentType.split("/").reverse()[0];
			    		
			    		if (suffix === null || suffix.length === 0) {
			    			suffix = "json";
			    		}
			    		 
			    		 
			    		 if (serviceId != null) {
			    			 var serviceEntry = SELFCARE.ServiceMapping.getServiceEntry(serviceId);
			    			 var mockParams = serviceEntry["mockParams"];
			    			 var mockParamValues = [];
			    			 
			    			 if (mockParams != null) {
				    			 for (var i = 0; i < mockParams.length; i++) {		    				 
				    				 var mockValue = settings.params[mockParams[i]];			    				 
				    				 if (mockValue == null) {
				    					 mockValue = "~";
				    				 }			    				 
				    				 mockParamValues.push(mockValue);			    				 
				    			 }
			    			 }
			    			 
			    			 var fileName = null;
			    			 
			    			 if (mockParamValues.length === 0) {
			    				 
			    				 fileName = SELFCARE.Config.mockAjaxPrefix 
			    			 		+ serviceEntry.module
			    			 		+ "/" 
			    			 		+ serviceId 
			    			 		+ "/default."
			    			 		+ suffix;
			    				 
			    			 } else {
			    				 
			    			 	fileName = SELFCARE.Config.mockAjaxPrefix 
			    			 		+ serviceEntry.module
			    			 		+ "/" 
			    			 		+ serviceId 
			    			 		+ "/" 
			    			 		+ mockParamValues.join("_") + "."+suffix;			    			 
			    			 }
			    			 
			    			 return {
			    				 proxy: fileName.toLowerCase()
			    			 };	
			    		 }
		    		 }		    		 
		    	 });
		    },
		    
		    
		    // Retrieve the mapping entry for the given service id 
		    getServiceEntry : function(serviceId) {
		    	var defaults = SELFCARE.ServiceMapping.mappings["defaults"];
		    	var serviceEntry = SELFCARE.ServiceMapping.mappings[serviceId];
		    	serviceEntry = $.extend(true,{}, defaults, serviceEntry);
		    	
		    	var serverName = serviceEntry.server;
		    	
		    	if (serverName != null) {
		    		var serverEntry = SELFCARE.ServerMappings.getServerEntry(serverName);
		    		if (serverEntry != null) {
		    			serverEntry.serverName = serverName;
		    			serviceEntry.serverContext = serverEntry;
		    		}
		    	}
		    	
		    	serviceEntry.authContext = SELFCARE.AuthContext;
		    	
		    	return serviceEntry;
		    },		    
		    
		    // Constructs the service URL
		    constructServiceUrl : function(request) {
		    	
		    	// TODO construct service URL using 
		    	// HandleBar templates, which map the url place holders		    	
		    	var serviceEntry = this.getServiceEntry(request.serviceId);		    	
		    	if (serviceEntry.template == null) {
		    		SELFCARE.Logger.log(SELFCARE.Logger.SEVERE, "Invalid service entry for id : "+request.serviceId);
		    	}		    	
		    	
		    	var url = SELFCARE.TemplateHelper.populate("service-mapping", {"entry":request}, "config", serviceEntry.template);
		    	var serverUrlPrefix = SELFCARE.ServerMappings.getServerUrlPrefix(serviceEntry.server, serviceEntry.isSecured);
		    	
		    	url = serverUrlPrefix + url;		    	
		    	SELFCARE.Logger.log(SELFCARE.Logger.DEBUG, "url = {0}", url );
		    	return url.trim();
		    }
		};
		
		
		SELFCARE.StopWatch = function() {			
			this.reset();			
		};
		
		
		SELFCARE.StopWatch.prototype.start = function() {
			this.isRunning = true;
			this.currentTime = new Date().getTime();
		};
		
	
		SELFCARE.StopWatch.prototype.stop = function() {
			if (this.isRunning) {
				var newTime = new Date().getTime();
				this.lapsedTime = newTime - this.currentTime;
				this.isRunning = false;
			}
		};
		
		SELFCARE.StopWatch.prototype.reset = function() {
			this.currentTime = -1;
			this.isRunning = false;
			this.lapsedTime = -1;
		};
		
		SELFCARE.StopWatch.prototype.getLapsedTime = function () {
			return this.lapsedTime;
		};
		
		
		SELFCARE.BusyIndicator = {
				
				overlayStack : 0,
				
				show : function() {				
					this.overlayStack++;
					$(".selfcare-overlay").show();
				},
				
				hide : function() {
					if (this.overlayStack > 0 ) {
						this.overlayStack--;
					}
					
					if (this.overlayStack == 0 ) {
						console.log("overlayStack... ", this.overlayStack);				
						$(".selfcare-overlay").hide();
					}								
				}				
			};
			
		

		
		// Command pattern to scheduling and executing 
		// commands 
		SELFCARE.Command = function(runnable) {
			this.runnable = runnable;			
			run = function(args) {
				this.runnable(args);
			};
		};		
		
		// Abstraction for template population and data binding 
		// This will be revisited for pre-compiled JS Handlebar 
		// templates 
		SELFCARE.TemplateHelper = {
			defaultContext : "templates",
			registeredPartials : [],
			cachedTemplates : {},
			registerHelpers : function() {				
				Handlebars.registerHelper('ifnotnull', function(value, options) {
				    var fnTrue = options.fn, fnFalse = options.inverse;
				    return  (value != null) ? fnTrue(this) : fnFalse(this);
				});
				Handlebars.registerHelper('ifequal', function (first, second, options) {
					var fnTrue = options.fn, fnFalse = options.inverse;
				    if (first === second) {
				        return fnTrue(this);
				    }
				    else if (fnFalse) {
				        return fnFalse(this);
				    }
				});
			},
			registerFraments : function() {				
				for (var i = 0, j =  SELFCARE.Config.templateFragments.length; i < j; i++) {
					var fragment = SELFCARE.Config.templateFragments[i];
					this.registerFragment(fragment.id, fragment.context);
				}
			},
			
			// Register the handle bar fragment with the given 
			// id in the given context 
			registerFragment : function(id, context) {				
				if (context == null) {
					context = this.defaultContext;
				}				
				if (this.registeredPartials.indexOf(id) == -1) {
					var source = this.load(context, id);
					Handlebars.registerPartial(id, source);
					this.registeredPartials.push(id);
				}
			},
			
			// Populate the templates with the 
			// give data, context and source 
			populate : function(id, data, context, source) {
				if (context == null) {
					context = this.defaultContext;
				}
				var key = this.constructKey(context, id); 				
				if (SELFCARE.Config.templateCachingEnabled == false 
						|| this.cachedTemplates[key] == null) {					
					if (source == null) {
						source = this.load(context, id);
					}
					var template = Handlebars.compile(source);
					this.cachedTemplates[id] = template;
				}				
				return this.cachedTemplates[id](data);
			},
			
			// Load the template with the id 
			load : function(context, id) {
				var templateUrl = this.constructUrl(context, id);
				var source = null;				
				$.ajax({
					  url: templateUrl,
					  async:false,
					  type: "GET",
					  success: function(response) {
						  source = response;
					  }
				});
				return source;			
			},
			
			// Constructs the key to lookup the template file 
			constructKey : function(context, id) {			
				return context+"."+id;			
			},		
			
			// Constructs the url for the template file
			constructUrl : function (context, id) {				
				return context+"/"+id+".html";
			}
		};
		
		// Helpers for back end API integration 
		SELFCARE.RestHelper  = {	
			invoke : function(request) {
				var serviceEntry = SELFCARE.ServiceMapping.getServiceEntry(request.serviceId);
				var entry = {
						placeholders : $.extend(true, {}, serviceEntry.defaultPlaceHolders),
						headers : $.extend({}, serviceEntry.headers),
						params: $.extend(true, {}, serviceEntry.defaultParams),
						contentType : serviceEntry.contentType,
						cacheable : serviceEntry.cacheable,
						method : serviceEntry.method,
						successCallback : function() {},
						errorCallback : function() {}						
				};
				
				$.extend(true, entry, request);
				entry.params.serviceId = request.serviceId;
				
				var serviceUrl = SELFCARE.ServiceMapping.constructServiceUrl(entry);
				
				if (entry.method === "GET") {
					
					serviceUrl += "?";
					
					if (entry.params != null) { 
						for (var parameterName in entry.params) {
							serviceUrl += parameterName +"="+ entry.params[parameterName] + "&";
						}
					}
				}
				
				
				// Whitelist the respective urls in PhoneGap
				// Access-Control-Allow-Origin: *
				// Access-Control-Allow-Methods: GET, POST, OPTIONS	
				
				var stopWatch = new SELFCARE.StopWatch();
				var ajaxOptions = {
						
						url : serviceUrl,
						crossDomain : true,
						
						beforeSend : function() {
							SELFCARE.BusyIndicator.show();
							stopWatch.start();
						},
					
						contentType : entry.contentType,
						cache : entry.cacheable,
						method : entry.method,
						params : entry.params,
						headers: entry.headers
				};
				
				if (request.data != null) {
					ajaxOptions.data = request.data;
				}
				
				if (serviceEntry.dataType != null && SELFCARE.Config.mockAjaxEnabled === false) {
					ajaxOptions.dataType = serviceEntry.dataType;
				}
				console.log("From RESTHelper: " + JSON.stringify(ajaxOptions));
				$.ajax(ajaxOptions)
				.done(function(data) {
					try {
						entry.successCallback(data);
					} catch(err) {
						SELFCARE.Logger.log(SELFCARE.Logger.SEVERE, "Error while processing response of service ... {0}", serviceUrl);
						SELFCARE.Logger.log(SELFCARE.Logger.SEVERE, "Error while processing response of service ... {0}", serviceUrl);
						SELFCARE.Logger.log(SELFCARE.Logger.SEVERE, "Error detail ... {0}", err.message);
					}
				})
				.error(function(data) {
					try {
						entry.errorCallback(data);
					} catch(err) {
						SELFCARE.Logger.log(SELFCARE.Logger.SEVERE, "Error while invoking service ... ", serviceUrl);
						SELFCARE.Logger.log(SELFCARE.Logger.SEVERE, "Error detail ... ", err.message);
					}
				})
				.complete(function() {
					stopWatch.stop();
					SELFCARE.Logger.log(SELFCARE.Logger.INFO, "Time taken for the service {0} is {1} ms", serviceUrl, stopWatch.getLapsedTime());
					SELFCARE.BusyIndicator.hide();
					
				});				
			},
			
		
		};
		
				
		// Loads the configuration 
		SELFCARE.loadConfig = function(configFile) {
			$.ajax({
				  url: configFile,
				  contentType:"application/json",
				  async:false,
				  type: "GET",
				  success: function(response) {	
					  SELFCARE.Config = JSON.parse(response).configuration;					  
				  }
			});		
		};		
		
		// Initializes all the configuration files 
		SELFCARE.init = function(configFile) {
			
			this.loadConfig(configFile);
			SELFCARE.ServerMappings.load();
			SELFCARE.ServiceMapping.load();
			SELFCARE.FieldMapping.load();
			SELFCARE.Messages.load();
			SELFCARE.Labels.load();
			SELFCARE.TemplateHelper.registerFraments();
			SELFCARE.TemplateHelper.registerHelpers();
			
			if (SELFCARE.Config.mockAjaxEnabled) {
				SELFCARE.ServiceMapping.registerMockUrls();
			}
			
		};
		
		// Initialize the SELFCARE module
		SELFCARE.init("config/config.json");
		
		// Return an object to define the 
		// SELFCARE core module.
	    return SELFCARE;
    }
);