//	Derived Classes =
var __star_dom_id_generator = 0;
function Star(new_x, new_y, new_w, new_h, new_life, new_owner, new_grade) {	
	Unit.call(this, "star" + __star_dom_id_generator++, "resources/images/star.png",
		new_x, new_y, new_w, new_h,
		new_life, new_owner, "opacity: 0; ");

	this.grade = new_grade;
}
Star.prototype = new Unit();
Star.prototype.getGrade = function() {
	return this.grade;
}
Star.prototype.initialize = function() {
	Unit.prototype.initialize.call(this);

	var total_rotation_amound = this.grade * 3.6;
	this.opacity = this.grade / 100;
	if(this.getJQObject() == undefined) return;

	TweenMax.to(this.getJQObject(), 1, {
		opacity: this.opacity,
		ease: Linear.easeNone
	});
	
	TweenMax.to(this.getJQObject(), this.life, {		
		rotation: total_rotation_amound,
		ease: Linear.easeNone		
	});
}


function FloatingStar(new_owner) {
	var grade = Math.random() * 100;
	var life = grade / 50;
	
	//	SUPER! Big FloatingStar = ~ %0.01 of floating stars.
	if(grade > 99.99)
		grade *= 10;
	//	Big FloatingStar = ~ %3 of floating stars.
	else if(grade > 97)
		grade *= 3;

	var	x = Math.random() * manager.getWindowWidth(),
		y = Math.random() * manager.getWindowHeight() * 0.6,
		w = grade * 0.3,
		h = w;

	Star.call(this, x, y, w, h, life, new_owner, grade);
}
FloatingStar.prototype = new Star();
FloatingStar.prototype.initialize = function() {
	Star.prototype.initialize.call(this);

	TweenMax.to(this.getJQObject(), 0.5, {
		delay: this.life-0.5,
		opacity: "0",
		width: "0px",
		height: "0px"
	});
}



function SilenceStar(new_owner) {
	var grade = Math.random() * 100;
	var life = grade / 20;
	
	var	x = Math.random() * manager.getWindowWidth(),
		y = Math.random() * manager.getWindowHeight() * 0.6,
		w = grade * 0.1,
		h = w;

	Star.call(this, x, y, w, h, life, new_owner, grade);
}
SilenceStar.prototype = new Star();
SilenceStar.prototype.initialize = function() {
	Star.prototype.initialize.call(this);
}


function ShootingStar(new_owner) {
	var grade = Math.random() * 100;
	var life = grade / 50;
	
	//	SUPER! Big FloatingStar = ~ %0.01 of floating stars.
	if(grade > 99.99)
		grade *= 10;
	//	Big FloatingStar = ~ %3 of floating stars.
	else if(grade > 97)
		grade *= 3;

	var	x = Math.random() * manager.getWindowWidth() * 0.5
		y = Math.random() * manager.getWindowHeight() * 0.2,
		w = grade * 1.2,
		h = w;

	Star.call(this, x, y, w, h, life, new_owner, grade);
}
ShootingStar.prototype = new Star();
ShootingStar.prototype.initialize = function() {
	Star.prototype.initialize.call(this);

	this.x2 = Math.random() * (manager.getWindowWidth() - this.getX()) * this.grade / 100;
	TweenMax.to(this.getJQObject(), this.life, {
		delay: 0.2,
		left: (this.x2 + this.getX()) + "px",
		top: (this.x2 + this.getY()) + "px",
		ease: Power4.easeOut
	});
}


function Earth(new_owner) {
	var window_width = manager.getWindowWidth() * 0.5,
		window_height = manager.getWindowHeight(),
		earth_wh = window_width * 2 * 0.3;

	var is_need_performance = manager.getPolicy() instanceof MobilePolicy;
	var image_path = is_need_performance ? "earth_lq.png" : "earth.png";

	Unit.call(this, "skyline_earth", "resources/images/" + image_path,
		window_width, window_height, earth_wh, earth_wh, -1/*infinite*/,
		new_owner);
}
Earth.prototype = new Unit();
Earth.prototype.initialize = function() {
	Unit.prototype.initialize.call(this);

	this.resize(manager.getWindowWidth(), manager.getWindowHeight());
	
	//	Rotation:
	this._infinite_animation = TweenMax.to(this.getJQObject(), 1200, {
		rotation: "360",
		repeat: -1,
		ease: Linear.easeNone
	});
}
Earth.prototype.resize = function(w, h) {
	var earth_wh = w * 2,
		earth_left = w / 2 - earth_wh / 2,
	    earth_top = h - 100 - w / 3.5;

	TweenMax.to(this.getJQObject(), 4, {
		top: earth_top, 
		left: earth_left,
		width: earth_wh,
		height: earth_wh
	});
}
Earth.prototype.release = function() {
	this._infinite_animation.pause();
	this._infinite_animation = undefined;
}



function SkyLineBackGrounder(owner) {
	BackGrounder.call(this, owner);
}
SkyLineBackGrounder.prototype = new BackGrounder();
SkyLineBackGrounder.prototype.initialize = function() {
	BackGrounder.prototype.initialize.call(this);

	this.getJQObject().css({
	 	background: "linear-gradient(black,black,rgb(5, 10, 32),rgb(5, 10, 32),rgb(5, 10, 32),rgb(5, 10, 32),rgb(5, 10, 32),rgb(5, 10, 32),rgb(5, 10, 32),rgb(5, 10, 32),rgb(5, 10, 32), rgb(5, 10, 32), rgb(1, 13, 38), rgb(4, 30, 58), rgb(2, 36, 81), rgb(3, 43, 104), rgb(5, 63, 145),rgb(57, 84, 155),rgb(35, 102, 186), rgb(43, 122, 226), rgb(64, 166, 240), rgb(94, 201, 247), rgb(256,255,255), rgb(255,255,255))"
	});	

	this.earth = new Earth(this);
	this.earth.initialize();
	var star_count = manager.isIE() ? 15 : 60;
	if(manager.isIE())
	{
		this.getJQObject().append(
			"<div id='skyline_text'>Sorry! Because POOR Internet Explorer you're using, <br/>" +
			"We can't serve you with fully experience of UX T_T!!</div>"
		);
		this.text_jqobj = $("div#skyline_text");
		this.text_jqobj.css({
			left: manager.getWindowWidth() / 2,
			top: manager.getWindowHeight() / 2
		});
		TweenMax.to(this.text_jqobj, 4, {
			opacity: 1,
			onCompleteScope: this,
			onComplete: function() {
				TweenMax.to(this.text_jqobj, 4, {
					delay: 2,
					opacity: 0
				});
			}
		});
	}

	for(var n=0; n < star_count; n++)
	{
		this.units[n] = new FloatingStar(this);
		this.units[n].initialize();
	}
}
SkyLineBackGrounder.prototype.resize = function(w, h) {
	this.earth.resize(w, h);
}
SkyLineBackGrounder.prototype.onCreateUnit = function() {
	var diceroll = Math.random() * 100;

	if(diceroll > 98.5)
		 return new ShootingStar(this);
	else if(diceroll > 90)
 		return new FloatingStar(this);
	else
	 	return new SilenceStar(this);
}
SkyLineBackGrounder.prototype.onReleaseUnit = function(unit) {	
	BackGrounder.prototype.onReleaseUnit.call(this, unit);

	this.createUnit();
}


function SkyLine() {
	//	Menu structure construction:
	Project.call(this, "SkyLine", "", "v0.51<br/> So, Where's ur star among them?", 2, false,
		"#ff1493", "#fff8dc",
		"rgb(150, 155, 155)", "rgb(77, 77, 77)", "rgb(255, 255, 255)",
		new SkyLineBackGrounder(this)
	);
	
	this.star_starting_x_boundary = manager.getWindowWidth();
	this.focused_menu_left = 225;
	
	var about = new Menu("about", "", "Who have made these?");
	this.append(about);
	{
		about.append(new Menu("who r u", "whoru.html", "Hello world!"));
		about.append(new Menu("histories", "histories.html", "Let's make it a history"));
		about.append(new Menu("licenses", "license.html", "For what I used<br/>For what I made."));
	}
	var projects = new Menu("projects", "", "join us!");
	this.append(projects);
	{
		projects.append(new World());
		projects.append(new SnowyField());
		projects.append(new Menu("my songs", "music.html", "Do you like trance?"));		
		projects.append(new Blog());
	}
}
SkyLine.prototype = new Project();