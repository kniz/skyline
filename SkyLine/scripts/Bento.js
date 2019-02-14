//	Bento:
//		Bento manages all menu inflates at runtime and all background things what made by project menu.
function Bento() {
	Object.call(this);

	this.setJQObject($("div#bento_frame"));
	this.current_menu = undefined;
}
Bento.prototype = new Object();
Bento.prototype.getTitleJQObject = function() {
	if(this.title_dom == undefined)
		this.title_dom = $("div#bento_title");	
	return this.title_dom;
}
Bento.prototype.getTitleFrameJQObject = function() {
	if(this.title_frame_dom == undefined)
		this.title_frame_dom = $("div#bento_title_frame");
	return this.title_frame_dom;
}
Bento.prototype.getMenuJQObject = function() {
	if(this.menu_dom == undefined)
		this.menu_dom = $("div#bento_menu");
	return this.menu_dom;
}
Bento.prototype.getWidth = function() {
	return 400;
}
Bento.prototype._tweakForIE = function() {
	var bento_frame = $("div#bento_frame"),
		bento = $("div#bento");
	var prefix = ! manager.isIE() ? "enabled" : "disabled";
	
	bento_frame.addClass("bento_3d_" + prefix + "_frame");
	bento.addClass("bento_3d_" + prefix);
}
Bento.prototype.initialize = function() {
	this.getTitleJQObject().click(function() {
		var current = manager.getBento().getCurrentMenu();
		var target = current.getOwner() == undefined ? current.getOwnedProject() : current.getOwner();

		manager.onClick(target);
	});

	this.getTitleFrameJQObject().hover(function() {
		var bento = manager.getBento();
		manager.getSounder().playMatchedName("menu_button_hover");
		TweenMax.to(bento.getTitleJQObject(), 0.15, {
			ease: Power4.easeOut,
			onCompleteScope: bento,
			color: "white",
			rotationX: "90",
			onComplete: function() {
				this.getTitleJQObject().text("< Back");
				TweenMax.to(this.getTitleJQObject(), 0.15, {
					ease:Power4.easeOut,
					color: this.getCurrentMenu().getOwnedProject().getTitleColor(),
					rotationX: "0"
				});
			}
		})
	}, function() {		
		var bento = manager.getBento();
		manager.getSounder().playMatchedName("menu_button_hover");
		TweenMax.to(bento.getTitleJQObject(), 0.15, {
			ease: Power4.easeOut,
			onCompleteScope: bento,
			color: "white",
			rotationX: "90",
			onComplete: function() {
				this.getTitleJQObject().text(this.getCurrentMenu().getName());
				TweenMax.to(this.getTitleJQObject(), 0.15, {
					ease:Power4.easeOut,
					color: this.getCurrentMenu().getOwnedProject().getTitleColor(),
					rotationX: "0"
				});
			}
		})
	});

	this._tweakForIE();
}
Bento.prototype.getVerticalBarJQObject = function() { 
	if(this.vertical_bar == undefined)
		this.vertical_bar = $("div#bento_bar");
	return this.vertical_bar;
}
Bento.prototype.getCurrentMenu = function() {
	return this.current_menu;
}
Bento.prototype.getBackgroundPlaneJQObject = function() {
	if(this.background_plane == undefined)
		this.background_plane = $("div#dynbg_area");
	return this.background_plane;
}
Bento.prototype.getCommentPlaneJQObject = function() {
	if(this.comment_plane == undefined)
		this.comment_plane = $("div#bento_comment");
	return this.comment_plane;
}
Bento.prototype._updateSubMenu = function() {
	TweenMax.to(this.getMenuJQObject(), 0.2, {
		opacity: "0",
		onComplete: function() {
			var bento = manager.getBento();
			
			var menujq = bento.getMenuJQObject();
			$("div#bento_menu div").remove();
			TweenMax.to(menujq, 0.2, {
				opacity: "1"
			});

			var to_create = bento.getCurrentMenu().children;
			for(var e in to_create)
				to_create[e].initialize();
		}
	});
}
Bento.prototype.onClick = function(menu) {
	this.current_menu = menu;
	this._updateSubMenu();

	//	make title be narrow:
	TweenMax.to(this.getTitleJQObject(), 0.1, {
		color: "white",
		ease: Power4.easeOut,
		onCompleteScope: this,
		onComplete: function() {
			TweenMax.to(this.getTitleJQObject(), 0.05, {				
				color: this.getCurrentMenu().getOwnedProject().getTitleColor(),
				ease: Power4.easeOut
			});
		}
	})
	TweenMax.to(this.getTitleJQObject(), 0.2, {
		width: "0%",
		onCompleteScope: this,
		onComplete: function() {
			manager.getBento().onHover(menu);

			//	Title div 애니메이션:
			var title = this.getTitleJQObject();

			title.text(this.getCurrentMenu().getName());
			
			TweenMax.to(title, 0.2, {
				width: "100%",
				ease: Power4.easeOut
			});

			//	Vertical-bar 움직임:
			TweenMax.to(this.getVerticalBarJQObject(), 0.8, {
				backgroundColor: this.getCurrentMenu().getOwnedProject().getCommentColor()
			});
		}
	});
}
Bento.prototype.onHover = function(menu) {
	//	Vertical Bar 애니메이션:
	TweenMax.to(this.getVerticalBarJQObject(), 0.4, {
		/*marginTop: "-" + this.getHeightPerCommentRow() * menu.getCommentLineCount() + "px",*/
		height: manager.getPolicy().getHeightPerCommentRow() * menu.getCommentLineCount() + "px"
	});

	//	Comment 영역 애니메이션:
	TweenMax.to(this.getCommentPlaneJQObject(), 0.2, {
		opacity: "0.2",
		onComplete: function() {
			var comment = manager.getBento().getCommentPlaneJQObject();

			comment.html(menu.getComment());
			TweenMax.to(comment, 0.2, {
				opacity: "1",
				color: menu.getOwnedProject().getCommentColor()
			})
		}
	});
}
Bento.prototype.onUnhover = function(menu) {
	this.onHover(this.getCurrentMenu());
}