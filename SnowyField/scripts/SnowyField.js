var __flake_dom_id_generator = 0;
function Flake(new_owner) {

	var x = Math.random() * manager.getWindowWidth(),
		grade = Math.random() * 100,
		w = Math.pow(grade, 1.35) + 10,
		h = w,
		y = -h,
		life = (Math.pow(100 - grade, 1.35) + 20) / 150 * 10;

	Unit.call(this, "flake" + __flake_dom_id_generator++, "../SnowyField/resources/images/snowflake.png",
	x, y, w, h,
	life, new_owner, "opacity: 0;");

	this.grade = grade;
}
Flake.prototype = new Unit();
Flake.prototype.initialize = function() {    
	Unit.prototype.initialize.call(this);
	
	this.opacity = this.grade / 100;

	TweenMax.to(this.getJQObject(), 1, {
		opacity: this.opacity,
		ease: Linear.easeNone
	});
	
	//	let it go down:	
	TweenMax.to(this.getJQObject(), this.life, {
		top: manager.getWindowHeight() + "px",
		ease: Linear.easeNone
	});

	//	we have to capture animation which is for doing infinitely:
	//		If we don't, it still leaves even though its owner unit instances is no longer needed.
	var total_rotation_amound = this.grade * 3.6;
	TweenMax.to(this.getJQObject(), this.life, {
		rotation: total_rotation_amound,
		ease: Linear.easeNone
	});
}


function SnowyFieldBackGrounder(owner) {
	BackGrounder.call(this, owner);
}
SnowyFieldBackGrounder.prototype = new BackGrounder();
SnowyFieldBackGrounder.prototype.initialize = function() {
	BackGrounder.prototype.initialize.call(this);

	this.getJQObject().css({
		"background-color": "white"
	});

	for(var n=0; n < 30 ;n++)
		this.createUnit();

	//	create divs:
	this.getJQObject().append(
		"<div id='sf_frame'>" + 
		"	<div id='sf_background'></div>" +
		"	<div id='slider'>"	+
		"		<div id='slider_rail' class='rail_mouseleave'></div>" +
		"		<div id='slider_knot' class='knot_normal'></div>" + 
		"	</div>" +
		"	<div id='sf_header'>" + 
		"	</div>" +
		"	<div id='sf_content'>" +
		"		<textarea id='sf_article' placeholder='당신의 글을 여기에 적어보세요.' cols='80' multiple /></textarea>" +
		"	</div>" + 
		"	<div id='sf_footer'>" +
		"		<h3>Somedays I dreamed about the tales which be featured by a nameless snowman." +
		"		<br/>The snowman was created by a young girl. but he couldn't remember her. he wants to remind her face." +
		"		<br/>nevertheless only what he could is just watch the snowy fields in front of him. he felt melancholy but he kept watching snow flakes." +
		"		<br/>even if time has flowed, the snowflakes are flying away where the snowman is standing still. by waiting priceless a young who made him." +
		"		<br/>" +
		"		Copyrights @ 2013-2014 by <a href='http://kniz.net'><span style='font-size:11px'>kniz</span></a>, http://kniz.net." +
		"		</h3>" +
		"	</div>" +
		"</div>");
	
	this.sf_article = $("textarea#sf_article");
	this.sf_article.keydown(function(event) {
		var sounder = manager.getSounder();
		switch(event.which)
		{
		case 13:	// enter
			sounder.playMatchedName("return_key");
			break;

		case 8:		// backspace
		default:
			var diceroll = Math.random() * 100;
			var wav_name = diceroll < 50 ? "" : "2";
			
			sounder.playMatchedName("keystroke" + wav_name);
		}
	});
	
	this.resize(manager.getWindowWidth(), manager.getWindowHeight());
}
SnowyFieldBackGrounder.prototype.onCreateUnit = function() {
	return new Flake(this);
}
SnowyFieldBackGrounder.prototype.onReleaseUnit = function(unit) {
	BackGrounder.prototype.onReleaseUnit.call(this, unit);

	this.createUnit();
}
SnowyFieldBackGrounder.prototype.getWidthLimit = function() { return 800; }
SnowyFieldBackGrounder.prototype.resize = function(w, h) {
	var right_padding = 20,
		bento_width = manager.getBento().getWidth(),
		width_limit = bento_width + this.getWidthLimit() + right_padding,
		new_width = w < width_limit ? w - bento_width - right_padding : this.getWidthLimit();
	this.sf_article.width(new_width);
}


function SnowyField() {
	Project.call(this, "SnowyField", "", "v0.1<br/>Online Text Editor", 2, false,
		"#ddd", "#ddd",
		"#bbb", "#fff" ,"#333",
		new SnowyFieldBackGrounder(this));

	this.append(new Menu("save", "", "Not available yet"));
	this.append(new Menu("load", "", "Not available yet"));
}
SnowyField.prototype = new Project();