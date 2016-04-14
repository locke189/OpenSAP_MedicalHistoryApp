jQuery.sap.require("sap.ui.qunit.qunit-css");
jQuery.sap.require("sap.ui.thirdparty.qunit");
jQuery.sap.require("sap.ui.qunit.qunit-junit");
QUnit.config.autostart = false;

sap.ui.require([
		"sap/ui/test/Opa5",
		"demo_app/com/test/integration/pages/Common",
		"sap/ui/test/opaQunit",
		"demo_app/com/test/integration/pages/Worklist",
		"demo_app/com/test/integration/pages/Object",
		"demo_app/com/test/integration/pages/NotFound",
		"demo_app/com/test/integration/pages/Browser",
		"demo_app/com/test/integration/pages/App"
	], function (Opa5, Common) {
	"use strict";
	Opa5.extendConfig({
		arrangements: new Common(),
		viewNamespace: "demo_app.com.view."
	});

	sap.ui.require([
		"demo_app/com/test/integration/WorklistJourney",
		"demo_app/com/test/integration/ObjectJourney",
		"demo_app/com/test/integration/NavigationJourney",
		"demo_app/com/test/integration/NotFoundJourney"
	], function () {
		QUnit.start();
	});
});