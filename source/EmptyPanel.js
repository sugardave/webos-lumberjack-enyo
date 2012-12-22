enyo.kind({
	name: "EmptyPanel",
	layoutKind: "FittableRowsLayout",
	style: "background-color: #555;",
	palm: false,
	components:[
		{kind: "onyx.Toolbar", content: "Panel", style: "line-height: 34px;"},
		{fit: true, style: "padding: 8px;", components:[
			{content: "I'm a panel.", style: "color: white; padding-bottom: 8px;"},
			{kind: "onyx.Button", content: "Open Browser", ontap: "openBrowserTapped"}
		]},
		//{kind: "onyx.Toolbar"},
	],
	//Handlers
	create: function(inSender) {
		this.inherited(arguments);
		try {
			var palmTest = new enyo.webOS.ServiceRequest();
			palmTest.go();
			
			this.palm = true;
		}
		catch(e) {
			enyo.log("Non-palm platform, service requests disabled.");
		}
	},
	//Action Functions
	openBrowserTapped: function(inSender, inEvent) {
		if(this.palm) {
			var serviceCall = new enyo.webOS.ServiceRequest({service: "palm://com.palm.applicationManager", method: "launch"});
			serviceCall.response(this, "handleBrowserLaunchResponse");
			serviceCall.go({id: "com.palm.app.browser"});
		}
		else {
			enyo.log("Non-palm platform");
		}
	},
	//Service Callbacks
	handleBrowserLaunchResponse: function(inSender, inResponse) {
		enyo.log(JSON.stringify(inResponse));
	}
});