function BackGrounder(owner) {
	Object.call(this);
	this.owner = owner;
	this.is_initialized = false;
}
BackGrounder.prototype = new Object();
BackGrounder.prototype.getOwner = function() {
	return this.owner;
}
BackGrounder.prototype.isInitialized = function() { return this.is_initialized; }
BackGrounder.prototype.initialize = function() {
	//	We don't need to release 'this':
	//		it requires 0.8sec at least to be released. Release function add some sort of timer for after 0.8sec.
	//		So even if it defines new instance of div which will be used to draw something,
	//		after it passed 0.8sec, that new div will be going to disappear because of that timer`
	//
	//	this.release();
	manager.getSounder().playMatchedName("click2");

	this.setID("project_" + this.purifyDomID(this.getOwner().getName()));
	//	remove dupicated dynbgs:
	$("div.div_dynbg").remove();
	manager.getBento().getBackgroundPlaneJQObject()
		.append("<div class='div_dynbg' id='" + this.getID()+ "'></div>");
	this.setJQObject($("div#" + this.getID()));

	//	apply default style:
	this.getJQObject().css({
		"background-color": this.getOwner().getTitleColor()
	});

	TweenMax.to(this.getJQObject(), 0.8, {
		top: "0px",
		ease:Power4.easeOut
	});
	
	this.units = [];
	this.is_initialized = true;
}
BackGrounder.prototype.release = function() {
	//	pre:
	//		supering:
	Object.prototype.release.call(this);	
	//		type-checking:
	if( ! this.isInitialized()) return;
	var jqobj = this.getJQObject();
	if(jqobj == undefined) return;

	//	main:
	var height = jqobj.height();

	TweenMax.to(jqobj, 0.4, {
		top: height + "px", 
		onCompleteScope: this,
		onComplete: function() {
			for(var e in this.units)
			{
				this.units[e].release();
				this.units[e] = undefined;
			}
			this.units = undefined;
			//	don't need to remove 'this':
			//		The new BackGrounder which try to initialize will delete existing div.dyn_obj.
		}, 
		ease:Power4.easeOut
	});
	this.is_initialized = false;
}
BackGrounder.prototype.resize = function(w, h) {
	TweenMax.to(this.getJQObject(), 1, {
        ease: Power3.easeOut,
		width: w + "px"
	});
}
BackGrounder.prototype.releaseUnit = function(unit) {
	//	pre:
	//		parameter-check:
	if( ! this.isInitialized()) return;
	if(unit == undefined) return;
	//			is this my child?:
	if(this != unit.getOwnedBackGrounder()) return;

	return this.onReleaseUnit(unit);
}
BackGrounder.prototype.onReleaseUnit = function(unit) {		
	if(unit == undefined) return;

	this.units.splice(unit.getIndex());
}
BackGrounder.prototype.createUnit = function() {
	if(this.stop) return;

	var new_one = this.onCreateUnit();
	if(new_one == undefined) return;

	new_one.initialize();
	new_one.setIndex(this.units.length);
	
	this.units.push(new_one);
}