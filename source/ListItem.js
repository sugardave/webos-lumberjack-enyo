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
		{name: "itemIcon", kind: "Image", style: "height: 100%;"},
		{name: "itemTitle", fit: true, style: "padding-left: 10px;"},
	],
	create: function() {
		this.inherited(arguments);
		this.iconChanged();
		this.titleChanged();
	},
	iconChanged: function() {
		this.$.itemIcon.setSrc(this.icon);
	},
	titleChanged: function() {
		this.$.itemTitle.setContent(this.title);
	},
	pressed: function() {
		this.addClass("onyx-selected");
	},
	released: function() {
		this.removeClass("onyx-selected");
	}
});