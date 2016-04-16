sap.ui.define([
	"./BaseController"
], function(BaseController) {
	"use strict";

	return BaseController.extend("demo_app.com.controller.MedicalHistoryDetail", {
	
	/**  Initialization of the detail page
	 * 
	 **/
		
		onInit: function(){
			//Navigation and Routing, binding of the data model
			var oRouter = this.getRouter();
			oRouter.getRoute("medicalhistorydetails").attachMatched(this._onRouteMatchedDetails, this);
			
		},
	
	/** Navigation Methods
	 * 
	 * 
	 **/
		
		_onRouteMatchedDetails: function(oEvent){
		//Binding of the Appoinments to the data model
			var oArgs, oView;
			oArgs = oEvent.getParameter("arguments");
			oView = this.getView();
			
			oView.bindElement({
				path: "/MedicalHistories('" + oArgs.historyId + "')",
				events: {
						dataRequested: function (oEvent) {
							oView.setBusy(true);
							},
						dataReceived: function (oEvent) {
							oView.setBusy(false);
							}
				}
			});	
		
		}
	
		
		
		

	});

});