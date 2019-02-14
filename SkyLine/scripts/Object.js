function Object(new_jq_object, new_dom_id) {
	this.jq_object = new_jq_object;
	
	if(new_dom_id == undefined)
		new_dom_id = "";
	this.dom_id = new_dom_id;
}
Object.prototype.setJQObject = function(new_obj) {
	this.jq_object = new_obj;
	if(	new_obj == undefined	||
		new_obj[0] == undefined	)
		return;
		
	this.jq_object.owner = new_obj[0].owner = this;
}
Object.prototype.getJQObject = function() {
	return this.jq_object;
}
Object.prototype.setID = function(new_id) {
	this.dom_id = new_id;
}
Object.prototype.getID = function() {
	return this.dom_id;
}
Object.prototype.release = function() {
	if(this.jq_object != undefined)
		this.jq_object.detach();
	this.jq_object = undefined; // JS has GC
}
Object.prototype.purifyDomID = function(string) {
	if(string == undefined)
		return;
		
	return string.replace(/[\/?<>\\|:.,!@#$%^&*\(\)=+ ]/gi, "_");
}