sap.ui.define([
		"demo_app/com/controller/BaseController",
		"sap/ui/model/json/JSONModel"
	], function (BaseController,JSONModel) {
		"use strict";

		return BaseController.extend("demo_app.com.controller.App", {
		
			onInit : function (){
			var oViewModel;
			oViewModel = new JSONModel({
				//counter for next medical history ID
				mhid: 100 // this should be retreived from the backend
				});
			this.getView().setModel(oViewModel, "appView");
			}
		});

	}
);