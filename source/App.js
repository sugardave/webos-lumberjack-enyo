enyo.kind({
	name: "App",
	kind: "Panels",
	realtimeFit: true,
	arrangerKind: "CollapsingArranger",
	palm: false,
	components:[
		{kind: "enyo.Signals", onbackbutton: "handleBackGesture"},
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
