// Filename: views/common/View.js
// Base model for all SELFCARE views 
// the core functionalities of registering to events,
// rendering of composite views 
// model binding etc, are done here 
define(
	["jquery", "backbone"], 

	function($, Backbone) {
	
		//Default Composite View Model to be used across the screens
		var View = Backbone.View.extend({			
			isRendered : false,			
			parentView : null,
			
			subViews : {},
			
			constructor: function View() {
				Backbone.View.prototype.constructor.apply(this, arguments);
			},
			
			getName : function() {				
				return this.constructor.name;
			},

			//Sets the associated model
			setModel : function(model) {				
				var prevModel = this["model"];
				this.stopListening(prevModel);				
				if (model != null) {
					this.listenTo(model, "refresh", this.onModelRefresh);	
				}				
				this["model"] = model;
			},
			
			//Gets the associated model
			getModel : function() {
				return this["model"];
			},
			
			//Handles the model refresh
			onModelRefresh : function() {
				
			},
			
			//updates the model
			updateModel : function() {
				
			},
			
			//Renders the view
			render: function() {
				this.renderView();
				for (var view in this.subViews) {
					view.renderView();
				};				
				this.isRendered = true;
			},
			
			//Returns the parent view
			getParent : function() {
				return parentView;
			},
			
			//Adds the sub view
			addSubView : function(id, view) {
				var subView = subViews[id];				
				if (subView != null) {
					removeSubView(subView);	
				};				
				view.parentView = this;
				subViews[id] = view;
			},
			
			//Removes the sub view
			removeSubView : function(id) {
				var subView = subViews[id];				
				if (subView != null) {
					subView.dispose();
				};				
				delete subViews[id];				
			},
			
			//Remove all sub views
			removeAllSubViews : function(id) {
				for (var id in this.subViews) {
					removeSubView(id);
				}
			},
			
			//dispose
			dispose : function() {
				this.removeAllSubViews();
				this.undelegateEvents();
				this.setModel(null);
				this.stopListening();
				this.$el.html("");
			},
			
			//shows the view
			show : function() {
				this.$el.show();
			},
			
			//hides the view
			hide : function() {
				this.$el.hide();
			}
		});		
		return View;	
	}
);
