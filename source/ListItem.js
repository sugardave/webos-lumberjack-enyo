enyo.kind({
	name: "ListItem",
	classes: "list-item",
	layoutKind: enyo.FittableColumnsLayout,
	handlers: {
		onmousedown: "pressed",
		ondragstart: "released",
		onmouseup: "released",
	},
	published: {
		noIcon: false,
		icon: "",
		title: ""
	},
	components:[
		{name: "itemIcon", kind: enyo.Image, classes: "icon", styleX: "height: 100%;"},
		{name: "itemTitle", fit: true, style: "padding-left: 10px;"},
	],
	create: function() {
		this.inherited(arguments);
		this.$.itemIcon.setShowing(!this.noIcon);
		this.iconChanged();
		this.titleChanged();
	},
	iconChanged: function() {
		//this.$.itemIcon.setSrc(this.icon);
		this.$.itemIcon.addRemoveClass(this.icon, true);
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