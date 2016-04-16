sap.ui.define([
	"./BaseController",
	'sap/m/MessageToast'
], function(BaseController, MessageToast) {
	"use strict";

	return BaseController.extend("demo_app.com.controller.MedicalHistoryList", {
	
	/**Initialization
	 *	.	binding of the data model
	 **/
	
		onInit : function(){
			//Navigation and Routing, binding of the data model
			var oRouter = this.getRouter();
			oRouter.getRoute("medicalhistory").attachMatched(this._onRouteMatchedMasterList, this);
			
		},
	
	/**     NAVIGATION
	 * 
	 **/
		
		onNavBack : function(oEvent){
			this.getRouter().getTargets().display("worklist");	
		},
		
		_onRouteMatchedMasterList: function(oEvent){
		//Binding of the Appoinments to the data model
		var oArgs, oView;
		oArgs = oEvent.getParameter("arguments");
		oView = this.getView();
		
		oView.bindElement({
			path: "/Patients('" + oArgs.patientId + "')",
			events: {
					dataRequested: function (oEvent) {
						oView.setBusy(true);
						},
					dataReceived: function (oEvent) {
						oView.setBusy(false);
						}
			}
			

		
		 
		});
	},
	
			onSelectionChangeMasterList: function(oEvent){
		//method used for selecting an individual appointment and routing to
		//the master/details page
	    	var oPatientId, oMedicalHistoryId;
	    	oPatientId        = oEvent.getSource().getBindingContext().getProperty("PatientID");
	    	oMedicalHistoryId = oEvent.getSource().getIntro();
			//MessageToast.show("Pressed : " + oEvent.getSource().getTitle());
			this.getRouter().navTo("medicalhistorydetails", { patientId: oPatientId,
															  historyId: oMedicalHistoryId } );
			//this.getRouter().display("medicalhistorydetails");
		}
	
	
	});
	
});