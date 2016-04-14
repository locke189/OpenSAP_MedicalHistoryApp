sap.ui.define([
		"demo_app/com/controller/BaseController"
	], function (BaseController) {
		"use strict";

		return BaseController.extend("demo_app.com.controller.NotFound", {

			/**
			 * Navigates to the worklist when the link is pressed
			 * @public
			 */
			onLinkPressed : function () {
				this.getRouter().navTo("worklist");
			}

		});

	}
);