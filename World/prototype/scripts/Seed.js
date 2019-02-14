var dragged = undefined;
var drag_start_x = 0;
var drag_start_y = 0;
var inteligence = new Map();

function initializeInteligence()
{
  inteligence.set("a", ["정수 a = 35", 92, 20]);
  inteligence.set("b", ["문자열<br/> b = \"35\"", 80, 45]);  
  inteligence.set("g_dbus_connection_call", ["g_dbus_connection_call(<p class=\"identifier\">GDBusConnection</p> connection, string busname, string object_path, string method_name, GVariant params)</br/><br/>brief: 지정한 <p class=\"identifier\">object_path</p>가 소유한 <p class=\"identifier\">method_name</p> 을 원격 호출 합니다.<br/>connection : <p class=\"identifier\">GDBusConnection</p><br/>busname : bus가 어떻고 저떻고 이러저러 주의하고 이건 안되고<br/>....<br/>...",
  500, 250]);
}

function getInteligenceContent(p) 
{
  var array = inteligence.get(p.text());
  if( array == undefined)
    array = ["알 수없는 값", 100, 20];
  
  return array;
}

function showInteligence(p) 
{
  var content = getInteligenceContent(p);
  var box = $("div#inteligence");  
  box.show().append(content[0])
    .width(content[1]).height(content[2])
    .offset({
      top: p.offset().top - box.height() - 20/*margin*/,
      left: p.offset().left
    });
  
}
function hideInteligence()
{
  $("div#inteligence").empty().hide();
}


$(document).ready(function() {
  initializeInteligence();
  $(document).mousemove(function(event) {
    if(dragged == undefined) return;

    dragged.offset({
        top: event.pageY,
        left: event.pageX
    });
  }).mouseup(function() {
    dragged = undefined;
  });
  
  $("div.statementbase").mousedown(function() {
    dragged = $(this);    
  }).mouseup(function() {
    dragged = undefined;
  });

  $("p.identifier").hover(function() {
    showInteligence($(this));
  }, function() {
    hideInteligence();
  })

});