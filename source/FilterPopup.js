enyo.kind({
	name: "FilterPopup",
	kind: onyx.Item,
	layoutKind: enyo.FittableColumnsLayout,
	filter: "allapps",
	custom: "",
	published: {
		filter: "allapps",
		custom: ""
	},
	components: [
		{name: "popup", kind: onyx.Popup, scrim: true, onShow: "popupOpen", onHide: "popupClosed", classes: "filter-popup", style: "height: 100%; width: 320px;", components: [
			{classes: "top-bottom-fade"},
			{classes: "noblank-fade"},
			{kind: enyo.Scroller, style: "height: 100%;", horizontal: "hidden", components: [
				{kind: onyx.Item, classes: "enyo-first", components: [
					{name: "customInput", kind: "Input", hint: "Custom", selectAllOnFocus: true, onkeypress: "keyCustom"},
				]},
				{kind: onyx.Item, content: "Everything", classes: "enyo-last", tapHighlight: true, ontap: "clickEverything"},
				//{kind: "Divider", caption: "Applications"},
				{content: "Applications Divider (missing kind)"},
				{kind: onyx.Item, content: "All Applications", classes: "enyo-first", tapHighlight: true, ontap: "clickAllApps"},
				{name: "apps"},
			]}
		]},
		{name: "icon", classes: "icon"},
		{name: "text", fit: true},
		{name: "arrow", classes: "enyo-listselector-arrow arrow"}
	],
	create: function() {
		this.inherited(arguments);
		this.getAppsList();
		this.customChanged();
		this.filterChanged();
	},
	customChanged: function() {},
	filterChanged: function() {
		if (this.filter == "every") {
			this.$.text.setContent("Everything");
			this.$.icon.addRemoveClass("icon filter", true);
		} else if (this.filter == "allapps") {
			this.$.text.setContent("All Applications");
			this.$.icon.addRemoveClass("icon app", true);
		}
	},
	getAppsList: function() {
		this.log("TRYING TO GET APP LIST");
		if (!navigator.service) return;
		var request = navigator.service.Request("palm://org.webosinternals.lumberjack/", {
			method: "listApps",
			parameters: {},
			onSuccess: enyo.bind(this, "listAppsResponse")
		});
	},
	listAppsResponse: function(inResponse) {
		this.log("WOO, APPS!");
		if (inResponse.apps && inResponse.apps.length > 0) {
			this.apps = inResponse.apps;
		}
		this.renderApps();
		return;
		if (this.$.popup.showing) {
			this.renderApps();
		}
	},
	renderApps: function() {
		if (this.apps) {
			this.log(JSON.stringify(this.apps));
			for (var a = 0; a < this.apps.length; a++) {
				if (this.apps[a].removable == true) {
					this.$.apps.createComponent({kind: onyx.Item, content: this.apps[a].title, index: a,
						className: (a == this.apps.length-1 ? "enyo-last" : "enyo"), tapHighlight: true, ontap: "clickApp"}, {owner: this});
				}
			}
		}
		//TESTING
		this.$.popup.show();
		//TESTING
		this.$.apps.render();
	},
	clickApp: function(inSender) {
		this.log("APP CLICKED, SETTING FILTER");
		this.filter = this.apps[inSender.index].id;
		this.custom = "";
		//this.popupClose();
	}
});