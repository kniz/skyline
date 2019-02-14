function Project(new_name, new_url, new_comment, new_comment_line_count, is_url_for_desktop,
		new_title_color, new_comment_color,
		new_menu_color, new_menu_hover_color, new_menu_bg_color,
		new_backgrounder) {
	Menu.call(this, new_name, new_url, new_comment, new_comment_line_count, is_url_for_desktop);

	this.prj = this;
	this.time = 0;
	this.title_color = new_title_color;
	this.comment_color = new_comment_color;
	this.menu_color = new_menu_color;
	this.menu_hover_color = new_menu_hover_color;
	this.menu_bg_color = new_menu_bg_color;
	this.backgrounder = new_backgrounder;
}	
Project.prototype = new Menu();
Project.prototype.getCommentColor = function() { return this.comment_color; }
Project.prototype.getTitleColor = function() { return this.title_color; }
Project.prototype.getMenuHoverColor = function() { return this.menu_hover_color; }
Project.prototype.getMenuColor = function() { return this.menu_color; }
Project.prototype.getMenuBGColor = function() { return this.menu_bg_color; }
Project.prototype.getBackGrounder = function() { return this.backgrounder; }
Project.prototype.release = function() {
	Menu.prototype.release.call(this);

	if(this.getBackGrounder() != undefined)
		this.backgrounder.release();
}