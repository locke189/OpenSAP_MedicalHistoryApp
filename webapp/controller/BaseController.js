sap.ui.define([
		"sap/ui/core/mvc/Controller",
		"sap/ui/core/routing/History"
	], function (Controller,History) {
		"use strict";

		return Controller.extend("demo_app.com.controller.BaseController", {
		
			/** Navigation Public methods
			 * 
			 **/
			getRouter : function () {
				return sap.ui.core.UIComponent.getRouterFor(this);
			},

			onNavBack: function (oEvent) {
				var oHistory, sPreviousHash;
				oHistory = History.getInstance();
				sPreviousHash = oHistory.getPreviousHash();
				if (sPreviousHash !== undefined) {
					window.history.go(-1);
				} else {
					this.getRouter().navTo("worklist", {}, true /*no history*/);
				}
			}		
			
		});

	}
);