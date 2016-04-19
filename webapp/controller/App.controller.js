sap.ui.define([
		"demo_app/com/controller/BaseController",
		"sap/ui/model/json/JSONModel"
	], function (BaseController,JSONModel) {
		"use strict";

		return BaseController.extend("demo_app.com.controller.App", {
		
			onInit : function (){
			var oViewModel;
			oViewModel = new JSONModel({
				mhid: 100
				});
			this.getView().setModel(oViewModel, "appView");
			}
		});

	}
);