function MenuButton() {
	Object.call(this, $("div#menu_button"), "menu_button");
    this.is_mark_opened = false;
}
MenuButton.prototype = new Object();
MenuButton.prototype.initialize = function() {
	//	Menu button:
	this.getJQObject().hover(function() {
        manager.getSounder().playMatchedName("menu_button_hover");
		TweenMax.to(manager.getMenuButton().getJQObject(), 0.15, {
			width: "70px",
			left: "20px",
			top: "20px",
			height: "70px",
            backgroundColor: "transparent"
		});
        TweenMax.to($("div#menu_line_one"), 0.15, {            
            backgroundColor: "#fff"
        });
        TweenMax.to($("div#menu_line_two"), 0.15, {            
            backgroundColor: "#fff"
        });
        TweenMax.to($("div#menu_line_three"), 0.15, {            
            backgroundColor: "#fff"
        });
	}, function() {
		TweenMax.to(manager.getMenuButton().getJQObject(), 0.15, {
			width: "60px",
			left: "25px",
			top: "25px",
			height: "60px",
            backgroundColor: "#fff"
		});
        TweenMax.to($("div#menu_line_one"), 0.15, {            
            backgroundColor: "#000"
        });
        TweenMax.to($("div#menu_line_two"), 0.15, {            
            backgroundColor: "#000"
        });
        TweenMax.to($("div#menu_line_three"), 0.15, {            
            backgroundColor: "#000"
        });
	});
    this.getJQObject().click(function() {        
        manager.getSounder().playMatchedName("menu_button_click");
        manager.getPolicy().syncTab( ! manager.getMenuButton().isMarkOpened());
    });
}
MenuButton.prototype.markOpened = function(to_open) {
    if( ! to_open)
    {
        TweenMax.to($("div#menu_line_one"), 0.15, {            
            rotation: 45,
            top: "34%"
        });
        TweenMax.to($("div#menu_line_two"), 0.15, {            
            width: "0%",
            left: "50%"
        });
        TweenMax.to($("div#menu_line_three"), 0.15, {            
            rotation: -45,
            top: "-34%"
        });
    }
    else
    {
        TweenMax.to($("div#menu_line_one"), 0.15, {            
            rotation: 0,
            top: "0%"
        });
        TweenMax.to($("div#menu_line_two"), 0.15, {            
            width: "100%",
            left: "0%"            
        });
        TweenMax.to($("div#menu_line_three"), 0.15, {            
            rotation: 0,
            top: "0%"
        });
    }
    this.is_mark_opened = to_open;
}
MenuButton.prototype.isMarkOpened = function() {
    return this.is_mark_opened;
}
MenuButton.prototype.isEnable = function() {
    return this.getJQObject().css("opacity") > 0;
}
MenuButton.prototype.setEnable = function(to_enable) {
    var new_opacity = to_enable ? 1 : 0;
    if(to_enable)
        this.getJQObject().css("visibility", "visible");

    TweenMax.to(this.getJQObject(), 0.5, {
        opacity: new_opacity,
        onCompleteScope: this,
        onComplete: function() {
            if( ! this.isEnable())
                this.getJQObject().css("visibility", "hidden");
        }
    });
}