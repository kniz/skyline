function Unit(new_dom_id, new_image_path, 
    new_x, new_y, new_w, new_h, 
    new_life, new_owner, additional_style) {
    Object.call(this, undefined, new_dom_id);

    this.path = new_image_path;
    this.x = new_x;
    this.y = new_y;
    this.width = new_w;
    this.height = new_h;
    this.life = new_life;
    this.owner = new_owner;
    if(additional_style == undefined)
        additional_style = "";
    this.style = additional_style;
    this._life_animation = undefined;
}
Unit.prototype = new Object();
Unit.prototype.getLife = function() { return this.life; }
Unit.prototype.setLife = function(new_life) { this.life = new_life; }
Unit.prototype.getIndex = function() { return this.index; }
Unit.prototype.setIndex = function(new_index) { this.index = new_index; }
Unit.prototype.getPath = function() { return this.path; }
Unit.prototype.getX = function() { return this.x; }
Unit.prototype.getY = function() { return this.y; }
Unit.prototype.getWidth = function() { return this.width; }
Unit.prototype.getHeight = function() { return this.height; }
Unit.prototype.getStyle = function() { return this.style; }
Unit.prototype.getOwnedBackGrounder = function() { return this.owner; }
Unit.prototype.initialize = function() {
    var owner = this.getOwnedBackGrounder().getJQObject();
    if(owner == undefined)
        return;

    var style_attr =    "'position:fixed; z-index:0 " +
                        "; top: " + this.getY() +
                        "px; left: " + this.getX() +
                        "px; width: " + this.getWidth() +
                        "px; height: " + this.getHeight() + 
                        "px; " + this.getStyle() + "'";

    var tag =   "<img id='" + this.getID() + "' src='" + this.getPath() + "' style=" + style_attr +
                "/>"
    owner.append(tag);
    this.setJQObject($("img#" + this.getID()));

    if(this.life >= 0)
    {
        this._life_animation = new TweenMax(this.getJQObject(), 1, {
            delay: this.life,
            opacity: "0",
            onCompleteScope: this,
            onComplete: function() {
                var bg = this.getOwnedBackGrounder();
                if( bg == undefined         ||
                    bg.units == undefined  )
                    return;
                
                this.release();
            }
        });
        this._life_animation.play();
    }
}
Unit.prototype.release = function() {
    if(this.life >= 0)
        this.getOwnedBackGrounder().releaseUnit(this);

    Object.prototype.release.call(this);
}