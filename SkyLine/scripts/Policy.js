function Policy() {
}
Policy.prototype.onClick = function(menu) {
	menu.onClick();
    manager.getTab().openURL(menu.getURL());
	manager.getBento().onClick(menu);
    return true;
}
Policy.prototype.initialize = function() {
    this.onResize(manager.getWindowWidth(), manager.getWindowHeight());
}
Policy.prototype.getHeightPerCommentRow = function() {
	return 30;
}
Policy.prototype.onResize = function(new_window_width, new_window_height) {
    this.syncTab(manager.getTab().isOpened());
}
Policy.prototype.syncTab = function(to_open) {
    TweenMax.to(manager.getBento().getVerticalBarJQObject(), 0.4, {
		height: this.getHeightPerCommentRow() * manager.getBento().getCurrentMenu().getCommentLineCount() + "px"
	});
}


function DesktopPolicy() {
	Policy.call(this);

    manager.getMenuButton().setEnable(false);
}
DesktopPolicy.prototype = new Policy();
DesktopPolicy.prototype.onClick = function(menu) {
    if( ! Policy.prototype.onClick.call(this, menu))
        return false;

    var url = manager.getBento().getCurrentMenu().getURL(),
		need_to_open = url != undefined && url != "";

    this.syncTab(need_to_open);
}
DesktopPolicy.prototype.syncTab = function(to_open) {
    var tab = manager.getTab(),
		wwidth = manager.getWindowWidth(),
        wheight = manager.getWindowHeight(),
        bg = manager.getBento().getCurrentMenu().getOwnedProject().getBackGrounder();

    if( ! to_open)
    {
		tab.setOpen(0);
        bg.resize(wwidth, wheight);
    }
    else
    {        	
        var title = manager.getBento().getTitleJQObject(),
            x = title.offset().left + title.width(),
            new_width = wwidth - x;
        tab.setOpen(new_width);
        bg.resize(x, wheight);
    }
    
    var menu_bt = manager.getMenuButton();
    menu_bt.markOpened(to_open);

    Policy.prototype.syncTab.call(this, to_open);
}


function TabletPolicy() {
	Policy.call(this);
    
    manager.getMenuButton().setEnable(true);
}
TabletPolicy.prototype = new Policy();
TabletPolicy.prototype.onClick = function(menu) {
    if( ! Policy.prototype.onClick.call(this, menu))
        return false;

    var url = manager.getBento().getCurrentMenu().getURL(),
		need_to_open = url != undefined && url != "";

    if( ! menu.isURLForDesktopLayout())
        this.syncTab(need_to_open);
}
TabletPolicy.prototype.syncTab = function(to_open) {    
    var tab = manager.getTab(),
		wwidth = manager.getWindowWidth(),
        wheight = manager.getWindowHeight(),
        bg = manager.getBento().getCurrentMenu().getOwnedProject().getBackGrounder();

    if( ! to_open)
    {
		tab.setOpen(0);
        bg.resize(wwidth, wheight);
    }
    else
    {        	
        var title = manager.getBento().getTitleJQObject(),
            x = title.offset().left + title.width(),
            new_width = wwidth - x;
        tab.setOpen(wwidth);
        bg.resize(0, wheight);
    }
    
    var menu_bt = manager.getMenuButton();
    menu_bt.markOpened(to_open);

    Policy.prototype.syncTab.call(this, to_open);
}



function MobilePolicy() {
	Policy.call(this);
    
    manager.getMenuButton().setEnable(true);
}
MobilePolicy.prototype = new Policy();
MobilePolicy.prototype.onClick = function(menu) {
    if( ! Policy.prototype.onClick.call(this, menu))
        return false;

    var url = manager.getBento().getCurrentMenu().getURL(),
		need_to_open = url != undefined && url != "";

    if( ! menu.isURLForDesktopLayout())
        this.syncTab(need_to_open);
}
MobilePolicy.prototype.syncTab = function(to_open) {    
    var tab = manager.getTab(),
		wwidth = manager.getWindowWidth(),
        wheight = manager.getWindowHeight(),
        bg = manager.getBento().getCurrentMenu().getOwnedProject().getBackGrounder();

    if( ! to_open)
    {
		tab.setOpen(0);
        bg.resize(wwidth, wheight);
    }
    else
    {        	
        var title = manager.getBento().getTitleJQObject(),
            x = title.offset().left + title.width(),
            new_width = wwidth - x;
        tab.setOpen(wwidth);
        bg.resize(0, wheight);
    }
    
    var menu_bt = manager.getMenuButton();
    menu_bt.markOpened(to_open);
    
    Policy.prototype.syncTab.call(this, to_open);
}
MobilePolicy.prototype.getHeightPerCommentRow = function() {
	return 20;
}