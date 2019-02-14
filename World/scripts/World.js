function WorldBackGrounder(owner) {
	BackGrounder.call(this, owner);
}
WorldBackGrounder.prototype = new BackGrounder();
WorldBackGrounder.prototype.initialize = function() {
	BackGrounder.prototype.initialize.call(this);

	this.getJQObject().css({
		"background-color": "#23d9f0"
	});
}

function World() {
	Project.call(this, "World", "../World/World.html", "v0.0.1a<br/>Visual Programming Tool", 2, true,
		"white", "white",
		"white", "#23d9F0", "rgb(255, 255, 255)",
		new WorldBackGrounder(this));

	this.append(new Menu("World?", "../World/prototype/index.html", "Let's introduce Prototype."));
	this.append(new Menu("wiki", "http://kniz.net/wiki/doku.php?id=%EA%B0%80%EC%9D%B4%EB%93%9C:world", "Guide Wiki"));
	this.append(new Menu("download", "../World/download.html", "Start"));
}
World.prototype = new Project();