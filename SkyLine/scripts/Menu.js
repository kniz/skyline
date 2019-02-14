function Menu(new_name, new_url, new_comment, new_comment_line_count, is_url_for_desktop) {
	Object.call(this);

	if(is_url_for_desktop == undefined)	is_url_for_desktop = false;

	this.name = new_name;
	this.url = new_url;
	this.comment = new_comment;	
	this.comment_line_count = new_comment_line_count == undefined ? 1 : new_comment_line_count;
	this.prj = undefined;
	this.owner = undefined;	
	this.children = [];
	this.is_url_for_desktop = is_url_for_desktop;
}
Menu.prototype = new Object();

//	Accessor:
Menu.prototype.isURLForDesktopLayout = function() { return this.is_url_for_desktop; }
Menu.prototype.getName = function() { return this.name; }
Menu.prototype.setName = function(new_name) { this.name = new_name; }
Menu.prototype.getURL = function() { return this.url; }
Menu.prototype.setURL = function(new_url) { this.url = new_url; }
Menu.prototype.getComment = function() { return this.comment; }
Menu.prototype.setComment = function(new_comment) { this.comment = new_comment; }
Menu.prototype.getCommentLineCount = function() { return this.comment_line_count; }
Menu.prototype.setCommentLineCount = function(new_count) { this.comment_line_count = new_count; }
Menu.prototype.getOwner = function() { return this.owner; }
Menu.prototype.getOwnedProject = function() { return this.prj; }
Menu.prototype.setOwnedProject = function(new_prj) { this.prj = new_prj; }
Menu.prototype.getMenuMatchedName = function(name) {
	if(name == undefined)		return undefined;
	if(this.getName() == name)	return this;

	for(var e in this.children)	{
		var result = this.children[e].getMenuMatchedName(name);
		if(result != undefined)
			return result;
	}

	return undefined;
}

//	initialize dom object
Menu.prototype.initialize = function() {
	//	create DOMs:
	this.setID("div_menu_" + this.purifyDomID(this.getOwnedProject().getName()) + "_" + this.purifyDomID(this.name));
	manager.getBento().getMenuJQObject().append("<div class='div_menu' id='" + this.dom_id + "'>" + this.name + "</div>");
	this.setJQObject($("div#" + this.dom_id));
	this.getJQObject().css("color", this.prj.menu_color)
		.append("<div class='div_menu_backplate' style='background-color:" + this.prj.menu_bg_color + "'></div>");
	
	this._attachEventHandler();
}
Menu.prototype._attachEventHandler = function() {	
	this.getJQObject().on("click", function() {
		var menu = this instanceof Menu ? this : this.owner;
		manager.onClick(menu);

		return false;

	});
	this.getJQObject().hover(function() {
		var menu = this.owner;

		TweenMax.to(menu.getJQObject(), 0.2, {color: menu.getOwnedProject().getMenuHoverColor()});
		manager.getSounder().playMatchedName("click");
		manager.getBento().onHover(menu);
		
		//	show backplate:
		var backplate = "div#" + menu.getID() + " div.div_menu_backplate";		
		TweenMax.to(backplate, 0.2, {top: "0px", height: "50px", ease: Power4.easeOut});
		

		return false;

	}, function() {
		var menu = this.owner;

		TweenMax.to(menu.getJQObject(), 0.2, {color: menu.getOwnedProject().getMenuColor()});		
		manager.getSounder().playMatchedName("click");		
		manager.getBento().onUnhover(menu);		
		//	hide backplate:
		var backplate = "div#" + menu.getID() + " div.div_menu_backplate";		
		TweenMax.to(backplate, 0.2, {top: "50px", height: "0px", ease:Power4.easeOut});

		return false;
	});
}

//	release dom object
Menu.prototype.release = function(clicked) {
	Object.prototype.release.call(this);

	for(var n in this.children)
		this.children[n].release();
}
Menu.prototype.append = function(child) {	
	this.children.push(child);
	child.owner = this;
	if(child.prj == undefined)
		child.prj = this.prj;
}

Menu.prototype._initializeBackGrounder = function() {
	var bg = this.getOwnedProject().getBackGrounder();
	if(bg == undefined) return;

	var current_menu = manager.getBento().getCurrentMenu();
	var current_prj = current_menu != undefined ? current_menu.getOwnedProject() : undefined;
	if(	current_prj != undefined				&&
		current_prj == this.getOwnedProject()	)
		return;

	if(current_prj != undefined)
		current_prj.release();
	bg.initialize();
}

Menu.prototype.onClick = function() {
	this._initializeBackGrounder();
	manager.getSounder().playMatchedName("click2");
}