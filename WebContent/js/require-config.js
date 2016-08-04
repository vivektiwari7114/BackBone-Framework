// Filename: require-config.js
// Configuring the initial required modules to load the app 
// and respective paths

require.config({	
	
	"baseUrl" : "js",
	
	"paths" : {
        "bootstrap-modal" : "libs/bootstrap-modal",
		"bootstrap-popopover" : "libs/bootstrap-popover",
		"bootstrap-tooltip" : "libs/bootstrap-tooltip",
		"modernizr":"libs/modernizr",
		"swiper":"libs/idangerous.swiper-1.9.1.min",
		"jquery" : "libs/jquery-1.10.1.min",
		"mockajax" : "libs/jquery.mockjax",
		"underscore" : "libs/underscore",
		"handlebars" : "libs/handlebars",
		"backbone" : "libs/backbone",
		"localstorage" : "libs/backbone.localStorage-min",
		"selfcare" : "libs/selfcare",		
		"hammer" : "libs/jquery.hammer.min",
		"view" : "views/common/View",
		"page" : "views/common/Page",
		"model" : "models/common/Model",
        "cordova" : "libs/cordova",
        "calendars" : "libs/jquery.calendars",
        "calendarspicker" : "libs/jquery.calendars.picker",
        "calendarsplus" : "libs/jquery.calendars.plus",
		"geolocation" : "libs/geolocation",
		"bootstrap" :"libs/bootstrap",
		"common" : "libs/common",
		"jquery-ui": "libs/jquery-ui-1.10.0.custom",
		"jquery-liquid" : "libs/jquery.liquidcarousel.pack",
		"bootstrap-modal" : "libs/bootstrap-modal"
	},
	
    // Sets the configuration for your third party 
	// scripts that are not AMD compatible
    shim: {
    	//attaches "Backbone" to the window object
    	
    	"underscore": {
        	"exports": "_"  
        },
    	
        "backbone": {
        	"deps": [ "underscore", "jquery" ],
            "exports": "Backbone"  
        },
        
        "localstorage": {
        	"deps": [ "backbone" ],
            "exports": "bblocalstorage"  
        },
        
        
        //bootstrap
        "bootstrap-popopover" : {
        	"deps": [ "jquery","bootstrap-tooltip", "bootstrap-modal" ],
            "exports": "bootstrap-popopover"  
        },
        
        //selfcare
        "selfcare" : {
        	"deps": [ "jquery","backbone", "hammer", "bootstrap-tooltip", "bootstrap-popopover","bootstrap-modal" , "calendars", "calendarspicker","calendarsplus"],
            "exports": "SELFCARE"  
        },
        
        //handlebar
        "handlebars" : {
        	"exports": "Handlebars"  
        },
        "handlebarsforuncompiled" : {
        	"exports": "HandlebarsForUncompiled"  
        },
        //hammer
        "hammer" : {
        	"deps": ["jquery" ],
        	"exports": "hammer"  
        },
        
        //modernizr
        "modernizr" : {
        	"exports": "Modernizr"
        },
        
        //carousel
        "carousel" : {
        	"deps": [ "modernizr", "hammer"],
        	"exports": "Carousel"  
        }
    }
});
