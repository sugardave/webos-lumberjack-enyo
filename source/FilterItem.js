enyo.kind({
	name: "FilterItem",
	published: {
		filter: "allapps",
		custom: ""
	},
	components: [
		{name: "filter", kind: "ListItem", title: "All Applications", icon: "filter", ontap: "toggleDrawer", components: [
			{content: "v", style: "padding-right: 10px;"}
		]},
		{name: "drawer", kind: onyx.Drawer, open: false, components: [
			{kind: onyx.Item, style: "padding: 0px;", components: [
				{kind: onyx.InputDecorator, alwaysLooksFocused: true, style: "width: 100%;", components: [
					{name: "customInput", kind: onyx.Input, placeholder: "Custom", onkeypress: "keyCustom"}
				]},
			]},
			{kind: "ListItem", title: "Everything", noIcon: true, style: "padding-left: 0px;", ontap: "clickEverything"},
			{content: "Applications Divider (missing kind)"},
			{kind: "ListItem", title: "All Applications", noIcon: true, ontap: "clickAllApps"},
			{name: "apps"}
		]}
	],
	create: function() {
		this.inherited(arguments);
		this.filterChanged();
		this.listApps();
	},
	customChanged: function() {},
	filterChanged: function() {
		if (this.filter == "every") {
			this.$.filter.setTitle("Everything");
			this.$.filter.setIcon("filter");
		} else if (this.filter == "allapps") {
			this.$.filter.setTitle("All Applications");
			this.$.filter.setIcon("app");
		} else if (this.filter == "custom") {
			this.$.text.setContent(this.custom);
			this.$.filter.setIcon("filter");
		} else if (this.apps) {
			for (var a = 0; a < this.apps.length; a++) {
				if (this.apps[a].id === this.filter) {
					this.$.filter.setTitle(this.apps[a].title);
					this.$.filter.setIcon("app");
				}
			}
		}
	},
	close: function() {
		this.$.drawer.setOpen(false);
	},
	toggleDrawer: function(inSender, inEvent) {
		this.$.drawer.setOpen(!this.$.drawer.open);
	},
	listApps: function() {
		if (!navigator.service) return;
		var request = navigator.service.Request("palm://org.webosinternals.lumberjack/", {
			method: "listApps",
			parameters: {},
			onSuccess: enyo.bind(this, "listAppsResponse")
		});
	},
	listAppsResponse: function(inResponse) {
		if (inResponse.apps && inResponse.apps.length > 0) {
			this.apps = inResponse.apps;
		}
		this.renderApps();
	},
	renderApps: function() {
		this.$.apps.destroyClientControls();
		if (this.apps) {
			//this.log(JSON.stringify(this.apps));
			for (var a = 0; a < this.apps.length; a++) {
				if (this.apps[a].removable == true) {
					this.$.apps.createComponent({kind: "ListItem", title: this.apps[a].title, index: a, tapHighlight: true, ontap: "clickApp"}, {owner: this});
				}
			}
		}
		this.$.apps.render();
	},
	clickEverything: function(inSender, inEvent) {
		this.setFilter("every");
		this.setCustom("");
		this.close();
		return true;
	},
	clickAllApps: function(inSender, inEvent) {
		this.setFilter("allapps");
		this.setCustom("");
		this.close();
		return true;
	},
	clickApp: function(inSender, inEvent) {
		this.setFilter(this.apps[inSender.index].id);
		this.setCustom("");
		this.close();
		return true;
	}
});