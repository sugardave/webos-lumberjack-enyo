var stats = {};

enyo.kind({
	name: "Stats",
	kind: enyo.Component,
	
	lsvar: "stats",
	
	constructor: function() {
		this.inherited(arguments);
		this.loadStats();
		if (!stats.getTotalSize) stats.getTotalSize = 0;
		if (!stats.logsViewed) stats.logsViewed = 0;
		if (!stats.appsUsed) stats.appsUsed = [];
		this.saveStats();
	},
	
	setStat: function(name, value) {
		//this.log(name, value);
		stats[name] = value;
		this.saveStats();
	},
	getStat: function(name) {
		//this.log(name);
		return stats[name];
	},
	addStat: function(name, value) {
		//this.log(name, value);
		var c = this.getStat(name);
		if (typeof c == "object") { // unique additive version
			var f = false;
			for (var x = 0; x < c.length; x++) {
				if (c[x] == value) f = true;
			}
			if (!f) c.push(value);
			this.setStat(name, c);
		} else {
			this.setStat(name, c + value);
		}
	},
	clearStat: function(name) {
		//this.log(name);
		this.setStat(name, 0);
	} ,
	
	loadStats: function() {
		if (localStorage && localStorage[this.lsvar])
			stats = enyo.json.parse(localStorage[this.lsvar]);
		else {
			stats = {};
			localStorage[this.lsvar] = enyo.json.stringify(stats);
		}
	},
	saveStats: function() {
		if (localStorage)
			localStorage[this.lsvar] = enyo.json.stringify(stats);
	}
});
