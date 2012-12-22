enyo.kind({
	name: "App",
	kind: "Panels",
	realtimeFit: true,
	arrangerKind: "CollapsingArranger",
	peekWidth: 50,
	components:[
		{kind: "enyo.Signals", onbackbutton: "handleBackGesture"},
		{name: "MenuPanel", style: "width: 33%", layoutKind: "FittableRowsLayout", components:[
			{kind: "PortsHeader", title: "Lumberjack", taglines: [
				"Always Watching The Log",
				"Sleep All Night, Work All Day",
				"Hack Through Your Logs",
				"I\'m OK",
				"<a href='https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=R3Q2EUA52WJ7A'>Donated</a> To WebOS Internals Lately?",
				"Is A Logger... Get it?"
			]},
			{name: "scroller", kind: enyo.Scroller, horizontal: "hidden", classesX: "enyo-fill", fit: true, touch: true, components:[
				//Connectivity
				//{kind: "onyx.Toolbar", classes: "list-header", content: "List Header Template"},
				{name: "filterItem", kind: "FilterItem", classes: "main-item", ontap: "expand"}
			]},
			{kind: onyx.Toolbar}
		]},
		{name: "ContentPanels", kind: "Panels", arrangerKind: "CardArranger", draggable: false,	index: 1, components:[
			{kind: "EmptyPanel"},
		]},
	],
	indexChanged: function() {
		this.inherited(arguments);
		// close the drawer when expanding the ContentPanels
		if (this.index === 1) {
			enyo.job("closeList", enyo.bind(this, function() {
				this.$.filterItem.close();
				//TODO: see if this is necessary when more than filterItem exists in scroller, otherwise, the whole list is disappearing
				this.$.scroller.render();
			}), 100);
		}
	},
	//Handlers
	expand: function() {
		this.setIndex(0);
	},
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
