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
			var _oPatient;
			oRouter.getRoute("medicalhistory").attachMatched(this._onRouteMatchedMasterList, this);
			
		},
	
	/** Create New Entity Method
	 *	this method will create a new entity - MedicalHistory
	 * 
	 **/
	
	onPressNewMH: function(){
		var oData, oModel, oContext, oDate, mhid;
		mhid = this.getView().getModel("appView").getProperty("/mhid");
		console.log(mhid);
		mhid = mhid + 1;
		console.log(mhid);
		this.getView().getModel("appView").setProperty("/mhid",mhid);
		oDate = new Date();
		oData = {
					"MedicalHistoryID": String(mhid),
					"PatientID":this._oPatient,
					"Location": "Hope Clinic",
					"Physician": "Valentina D",
					"Date": oDate,
					"Time": "",
					"LabCode": "",
					"LabAttachment": "",
					"ExaminationAnalysis": "",
					"ExaminationAttachments": "",
					"Diagnostic": "",
					"DiagnosticCode": "",
					"DiagnosticDescription": "",
					"DiagnosticAnalysis": "",
					"PrescriptionMedicine": "",
					"PrescriptionDosage": "",
					"PrescriptionDescription": "",
					"Control": "",
					"ControlCode": "",
					"ControlDescription": "",
					"PrescriptionAdditionalInformation": ""
					};
		
		oModel = this.getView().getModel();
		oContext = oModel.create("/MedicalHistories",oData);
		oModel.submitChanges({success: this.mySuccessHandler, error: this.myErrorHandler});
		this.getRouter().navTo("medicalhistorydetails", { patientId: this._oPatient,
															  historyId: mhid } );
		
	},
	
	mySuccessHandler: function(){
		MessageToast.show("Success!");
	}, 
	
	myErrorHandler: function(){
		MessageToast.show("Success!");
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
		this._oPatient = oArgs.patientId;
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