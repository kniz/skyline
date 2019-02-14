function Manager() {
}
Manager.prototype.getSounder = function() {
	return this.sounder;
}
Manager.prototype.getBento = function() {
	return this.bento;
}
Manager.prototype.getWindowWidth = function() {
	return $(window).width();
}
Manager.prototype.getWindowHeight = function() {
	return $(window).height();
}
Manager.prototype.getMenuButton = function() {
	return this.menu_button;
}
Manager.prototype.getTab = function() {
	return this.tab;
}
Manager.prototype.createProperPolicy = function(by_width) {
	if(by_width > 900)
	{
		if(this.getPolicy() instanceof DesktopPolicy == false)
			return new DesktopPolicy();
	}
	else if(by_width > 480)
	{
		if(this.getPolicy() instanceof TabletPolicy == false)
			return new TabletPolicy();
	}
	else if(this.getPolicy() instanceof MobilePolicy == false)
		return new MobilePolicy();

	return undefined;
}
Manager.prototype.resize = function() {
	var wwidth = this.getWindowWidth(),
		wheight = this.getWindowHeight();
	
	this.setPolicy(this.createProperPolicy(wwidth));
	this.getPolicy().onResize(this.getWindowWidth(), this.getWindowHeight());
}
Manager.prototype.getPolicy = function() {
	return this.policy;
}
Manager.prototype.setPolicy = function(new_policy) {
	if(new_policy == undefined) return;
	
	if(this.policy != undefined)
		this.policy = undefined;
	this.policy = new_policy;
}
Manager.prototype.isIE = function() {
	var agent = navigator.userAgent.toLowerCase();
	if(	(navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1)	|| 	// ie 11
		(agent.indexOf("msie") != -1)) 	// ie10-
		return true;

	return false;
}
Manager.prototype.getParameter = function(key) {
	this.parameter_map = {};
	document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
		function decode(s) {
			return decodeURIComponent(s.split("+").join(" "));
		}

		manager.parameter_map[decode(arguments[1])] = decode(arguments[2]);
	});

	return this.parameter_map[key];
}
Manager.prototype.bootUp = function() {
	this.skyline = new SkyLine();
	var start_menu = this.skyline.getMenuMatchedName(this.getParameter("start_page"));
	if(start_menu == undefined)
		start_menu = this.skyline;

	this.onClick(start_menu);
}
Manager.prototype.initialize = function() {
	this.sounder = new Sounder();
	this.getSounder().initialize();
	
	this.tab = new Tab();
	this.getTab().initialize();

	this.menu_button = new MenuButton();
	this.getMenuButton().initialize();

	this.bento = new Bento();	
	this.getBento().initialize();

	this.setPolicy(this.createProperPolicy(this.getWindowWidth()));
	this.bootUp();
}
Manager.prototype.onClick = function(menu) {
	this.getPolicy().onClick(menu);
}


//	Entrypoint:
var manager = new Manager();

$(document).ready(function() {
	manager.initialize();
});