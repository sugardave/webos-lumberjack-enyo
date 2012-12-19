enyo.kind({
	name: "ListItem",
	classes: "list-item",
	layoutKind: "FittableColumnsLayout",
	handlers: {
		onmousedown: "pressed",
		ondragstart: "released",
		onmouseup: "released",
	},
	published: {
		icon: "",
		title: ""
	},
	components:[
		{name: "ItemIcon", kind: "Image", style: "height: 100%"},
		{name: "ItemTitle", style: "padding-left: 10px;"},
	],
	create: function() {
		this.inherited(arguments);
		this.$.ItemIcon.setSrc(this.icon);
		this.$.ItemTitle.setContent(this.title);
	},
	pressed: function() {
		this.addClass("onyx-selected");
	},
	released: function() {
		this.removeClass("onyx-selected");
	}
});

enyo.kind({
	name: "EmptyPanel",
	layoutKind: "FittableRowsLayout",
	style: "background-color: #555;",
	components:[
		{kind: "onyx.Toolbar", content: "Panel", style: "line-height: 34px;"},
		{fit: true, style: "padding: 8px;", components:[
			{content: "I'm a panel.", style: "color: white; padding-bottom: 8px;"},
			{kind: "onyx.Button", content: "Open Browser", ontap: "openBrowserTapped"}
		]},
		{kind: "onyx.Toolbar"},
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

enyo.kind({
	name: "App",
	kind: "Panels",
	realtimeFit: true,
	arrangerKind: "CollapsingArranger",
	palm: false,
	components:[
		{kind: "BackGesture", onBack: "handleBackGesture"},
		{name: "MenuPanel",
		style: "width: 33%",
		layoutKind: "FittableRowsLayout",
		components:[
			{kind: "PortsHeader",
			title: "webos-ports-template",
			taglines: [
				"Git you rollin'",
				"The best place to start is at the beginning.",
				"TURN ME INTO AN AWESOME APP!",
				"Templately, simply templately.",
			]},
			{kind: "Scroller",
			horizontal: "hidden",
			classes: "enyo-fill",
			fit: true,
			touch: true,
			components:[
				//Connectivity
				{kind: "onyx.Toolbar",
				classes: "list-header",
				content: "List Header Template"},
				{kind: "ListItem",
				icon: "icon.png",
				title: "List Item Template",
				ontap: "openPanel"}
			]},
			{kind: "onyx.Toolbar"},
		]},
		{name: "ContentPanels",
		kind: "Panels",
		arrangerKind: "CardArranger",
		draggable: false,
		index: 1,
		components:[
			{kind: "EmptyPanel"},
		]},
	],
	//Handlers
	reflow: function(inSender) {
		this.inherited(arguments);
		if(enyo.Panels.isScreenNarrow()) {
			this.setArrangerKind("PushPopArranger");
			this.setDraggable(false);
			this.$.ContentPanels.addStyles("box-shadow: 0");
		}
		else {
			this.setArrangerKind("CollapsingArranger");
			this.setDraggable(true);
			this.$.ContentPanels.addStyles("box-shadow: -4px 0px 4px rgba(0,0,0,0.3)");
		}
	},
	handleBackGesture: function(inSender, inEvent) {
			this.setIndex(0);
	},
	//Action Functions
	openPanel: function(inSender, inEvent) {
			this.setIndex(1);
	}
});
