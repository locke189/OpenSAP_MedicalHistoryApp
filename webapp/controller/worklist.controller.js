sap.ui.define([
	"./BaseController",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function(BaseController,Filter,FilterOperator) {
	"use strict";

	return BaseController.extend("demo_app.com.controller.worklist", {
	/**Initialization
	 *	.	binding of the data model
	 **/
		onInit :function(){
			
			//Navigation and Routing, binding of the data model
			var oRouter = this.getRouter();
			oRouter.getRoute("worklist").attachMatched(this._onRouteMatched, this);
			
		},
	
	/**     NAVIGATION
	 * 
	 **/
	
	_onRouteMatched: function(oEvent){
		//Binding of the Appoinments to the data model
		var oArgs, oView;
		oArgs = oEvent.getParameter("arguments");
		oView = this.getView();
		
		oView.bindElement({
			path: "/Appointments",
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
	
	onPressRowWorklist: function(oEvent){
	//method used for selecting an individual appointment and routing to
	//the master/details page
	    var oPatientId;
	    oPatientId = oEvent.getSource().getBindingContext().getProperty("PatientID");
		this.getRouter().navTo("medicalhistory", { patientId: oPatientId});
	
		
	},
	
	/**		FILTERS
	 *		
	 *		1. TabIconBar -> OnIconSelectedWorklist
	 *		2. Searchbox  -> OnSearchWorklist
	 *		
	 **/
		
		onIconSelectedWorklist: function(oEvent){
		// This method filters the worklist table depending on the iconTabBar selection.
		// so far only 2 options are implemented: Today, All
			
			//Variable Definitions
			var aFilters = {};
			var dateTodayStart	=  new Date();
			var dateTodayEnd	= new Date();
			var aKey;
			
			dateTodayEnd.setHours(23,59,0,0);
			dateTodayStart.setHours(0,0,0,0);
			
			aKey = oEvent.getParameter("selectedKey"); //key is selected from view
			aFilters = {
				      "today": [new sap.ui.model.Filter("Date", "BT", dateTodayStart, dateTodayEnd )],
				      "all": []
				   };
			
			// filter binding
			var oTable = this.getView().byId("wl_table");
			var oBinding = oTable.getBinding("items");
			oBinding.filter(aFilters[aKey]);
				 
		},
		
		onSearchWorklist: function(oEvent){
		//onSearchWorklist This method filters the table with the search query.
		
			// build filter array
			var aFilter = [];
			var sQuery = oEvent.getParameter("query");
			if (sQuery) {
				aFilter.push(new Filter("Patient/FirstName", FilterOperator.Contains, sQuery));
			}

			// filter binding
			var oTable = this.getView().byId("wl_table");
			var oBinding = oTable.getBinding("items");
			oBinding.filter(aFilter);
		}             
		

	});

});