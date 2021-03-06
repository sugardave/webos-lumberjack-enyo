enyo.kind({
	name: "GetLog",
	kind: enyo.FittableRows,
	classes: "enyo-fill",
	published: {
		filter: "",
		custom: ""
	},
	events: {
		onClose: ""
	},
	components: [
		{name: "stats", kind: "Stats"},
		//{name: "getMessages", kind: "PalmService", subscribe: true, service: "palm://org.webosinternals.lumberjack/", method: "getMessages", onResponse: "getMessagesResponse"},
		{name: "tag", classes: "tag"},
		{name: "h1", kind: onyx.Toolbar, layoutKind: enyo.FittableColumnsLayout, classes: "header", components: [
			{kind: onyx.Grabber},
			{name: "title", classes: "title", content: "Retrieve Log"},
			{fit: true},
			{kind: onyx.Button, content: "X", classes: "onyx-negative", ontap: "doClose"},
		]},
		{layoutKind: enyo.FittableRowsLayout, fit: true, components: [
			{name: "spinner", kind: onyx.Spinner},
			//{name: "data", kind: "wi.FlyweightAwesomeList", data: [], height: "100%", bottomUp: true, onSetupRow: "setupRow", components: [
			{name: "data", kind: "wi.FlyweightAwesomeList", count: 0, data: [], fit: true, onSetupRow: "setupRow", components: [
				{name: "logItem", kind: "LogItem", classes: "logItem"}
			]},
		]},
		//{kind: onyx.Toolbar}
	]
});

enyo.kind({
	name: "LogItem",
	kind: onyx.Item,
	layoutKind: enyo.FittableColumnsLayout,

	components: [
		{name: "type", className: "type"},
		{name: "app", className: "app"},
		{fit: true, name: "message", className: "message"},
	],

	update: function(msg) {
		this.addClass(msg.rowClass);
		this.$.type.setContent(msg.type);
		this.$.app.setContent(msg.app);
		this.$.message.setContent(msg.message);
	},
	
});

//TODO: I don't think this is going to work like it used to in Enyo 1
enyo.kind({
	name: "wi.FlyweightAwesomeList",
	kind: enyo.FlyweightRepeater,
	
	published: {
		data: [],
	},
	pageSize: 50,
	
	setupRow: function(inSender, inIndex) {
		var record = this.fetch(inIndex);
		if (record) {
			this.doSetupRow(record, inIndex);
			return true;
		}
	},
	fetch: function(inRow) {
		if (this.data[inRow])
			return this.data[inRow];
		else
			return false;
	},
	rowToPage: function(inRowIndex) {
		return Math.floor(inRowIndex / this.pageSize);
	},
	
	reset: function() {
		var pageTop = this.rowToPage(this.top);
	},
	rewind: function() {
		enyo.FlyweightList.prototype.punt.call(this);
		this.refresh();
	},
	punt: function() {
		this.inherited(arguments);
		this.reset();
	}
});