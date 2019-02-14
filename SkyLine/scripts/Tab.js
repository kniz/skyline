function Tab() {
	Object.call(this, $("div#content_frame"), "content");
    this.is_opened = false;
}
Tab.prototype = new Object();
Tab.prototype.setOpen = function(width) {
    var wwidth = manager.getWindowWidth();
	if(width == undefined)
        width = wwidth;
    var new_opened = width > 0;
    if(new_opened != this.isOpened())
        manager.getSounder().playMatchedName("slide");

    

    var left = wwidth - width;
    //  Width Tweak:
    //      Let Tab's width Not be too small:
    //          if its width was too small, because of tremendous calculation of its content's resize event,
    //          It would happen that make performance get slow.
    if(width < 300)
        width = 300;
    //  Animation:
    TweenMax.to(this.getJQObject(), 1, {
        ease: Power3.easeOut,
        width: width + "px",
        left: left + "px"
    });

    this.is_opened = new_opened;
}
Tab.prototype.isOpened = function() {
	return this.is_opened;
}
Tab.prototype.showLoading = function(to_show) {
    if(to_show)
    {
        this.loadingbar.css("opacity", "1");
        this.loadingbar.css("width", "0px");        
        this.loadingscore.css("opacity", "1");
        this.loadingscore.text("0%");
        TweenMax.to(this.loadingbar, 3, {
            onUpdateScope: this,
            ease: SlowMo.ease.config(0.4, 0.7, false),
            width: "100px",
            onUpdate: function() {
                this.loadingscore.text(this.loadingbar.width() + "%");
            }
        });
    }
    else
    {
        TweenMax.to(this.loadingbar, 0.5, {
            ease:Power3.easeOut,
            opacity: 0
        });
        TweenMax.to(this.loadingscore, 0.5, {
            ease:Power3.easeOut,
            opacity: 0
        });        
    }
}
Tab.prototype.initialize = function() {
	// this.getJQObject().load(function() {
    //     manager.getTab().showLoading(false);
    // });

    this.iframe = $("iframe#content");
    this.loadingbar = $("div#loadingbar");
    this.loadingscore = $("div#loadingscore");
}
Tab.prototype.resize = function(window_width, window_height) {
    var title = manager.getBento().getTitleJQObject(),
		x = title.offset().left + title.width(),
		new_width = window_width - x;
	this.move(new_width);
}
Tab.prototype.openURL = function(url) {
    if(this.iframe[0] == undefined)
    {
        console.log("jqobj is undefined.");
        return;
    }
    if( url == undefined||
        url == ""       )
        return;

    TweenMax.to(this.iframe, 0.3, {
        opacity: 0,
        onCompleteScope: this,
        onComplete: function() {            
            this.iframe[0].src = url;
            this.showLoading(true);
            TweenMax.to(this.iframe, 0.3, {
                opacity: 1
            });
        }
    });
    
}