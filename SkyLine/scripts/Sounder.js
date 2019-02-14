function SoundSource(new_name, new_path, new_id) {
	Object.call(this);
	this.setName(new_name);
	this.setPath(new_path);
	
	if(new_id == undefined)
		new_id = this.purifyDomID(new_name);
	this.setID(new_id);
}
SoundSource.prototype = new Object();
SoundSource.prototype.setPath = function(new_path) {
	this.path = new_path;
}
Song.prototype.getPath = function() {
	return this.path;
}
SoundSource.prototype.initialize = function() {
	var existing_dom = $(this.getID());
	if( ! existing_dom.length)
	{
		$("body").append("<audio id='" + this.getID() + "'></audio>");
		existing_dom = $("audio#" + this.getID());
	}
	this.setJQObject(existing_dom);

	var audio_dom = this.getJQObject()[0];
	var source_path = this.getPath();	
	if(audio_dom.src != source_path)
		audio_dom.src = source_path;
}
SoundSource.prototype.getName = function() { 
	return this.name;
}
SoundSource.prototype.setName = function(new_name) {
	this.name = new_name;
}
SoundSource.prototype.getPath = function() {
	return this.path;
}
SoundSource.prototype.play = function() {
	var audio_dom = this.getJQObject()[0];
	
	audio_dom.play();
	audio_dom.currentTime = 0;
}
SoundSource.prototype.pause = function() {
	var audio_dom = this.getJQObject()[0];

	audio_dom.pause();
}


function Song(new_name, new_path) {
	SoundSource.call(this, new_name, new_path, "audio_background");
}
Song.prototype = new SoundSource();
Song.prototype.initialize = function() {
	SoundSource.prototype.initialize.call(this);

	var audio_dom = this.getJQObject()[0];
	audio_dom.loop = true;	
	audio_dom.volume = 0.6;
}


function Sounder() {
	Menu.call(this);
}
Sounder.prototype = new Menu();
Sounder.prototype.get = function(n) {
	return this.bgms[n];
}
Sounder.prototype.initialize = function() {
	this.bgms = [
		new SoundSource("click", "./resources/audios/click.wav"),
		new SoundSource("slide", "./resources/audios/slide.wav"),
		new SoundSource("press", "./resources/audios/press.wav"),
		new SoundSource("click2", "./resources/audios/click2.wav"),
		new SoundSource("keystroke", "../SnowyField/resources/audios/keystroke.wav"),
		new SoundSource("keystroke2", "../SnowyField/resources/audios/keystroke2.mp3"),
		new SoundSource("return_key", "../SnowyField/resources/audios/return_key.mp3"),
		new SoundSource("menu_button_click", "./resources/audios/menu_button_click.wav"),
		new SoundSource("menu_button_hover", "./resources/audios/menu_button_hover.wav")
	];

	for(var e in this.bgms)
		this.bgms[e].initialize();
}
Sounder.prototype.playMatchedName = function(name) {
	//	IE has bug of playing HTML5 audio. disable it.
	if(manager.isIE()) return;

	for(var e in this.bgms)
	{
		var bgm = this.bgms[e];
		if(bgm.getName() == name)
		{
			bgm.play();
			return;
		}
	}

	alert("can't found " + name);
}
Sounder.prototype.stop = function() {

}