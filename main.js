$(this).delay(2000).queue(function() {
  $("#sc-div-0").remove();
 $(this).dequeue();
});
$("#sc-div-1").click(function(){
  $("#sc-div-1").remove();
  $(".chatbox").get(0).focus();
  $(".chatbox").width($("#sc-2").width() * 0.96);
  $(".chatbox").empty();
  $(this).delay(750).queue(function() {
    createMessage("Oi", "PALASH", "blue");
   $(this).dequeue();
  });
});

$(".chatbox").customCaret();

$(".chatbox").focusout(function() {
  $(".chatbox").empty();
});

if (window.RiveScript !== undefined) {
  console.log("RIP");
}
var rs;

rs = new RiveScript();
console.log(rs);
rs.loadFile(["./palashai.rive"]);

console.log("ready!");
var initialTopMessage = 7.1; // 11.2% -> 17.3% 7.1% -> 13.2
var msgCounter = 0;

$('.chatbox').keydown(function(event){
    var keyCode = (event.keyCode ? event.keyCode : event.which);
    if (keyCode == 13) {
      var contenteditable = document.querySelector('[contenteditable]'),
      text = contenteditable.textContent;
      console.log(text);
      $(".chatbox").empty();
      createMessage(text, "ERIKA", "red");
      processMessage(text);
    }
});

function createMessage(text, sender, color){
  msgCounter+=1;
  if(msgCounter === 7) {
    console.log(msgCounter);
    $(".msg").remove();
    $(".msg-top").remove();
    msgCounter = 1;
    initialTopMessage = 7.1;
  }
  var $p = $("<p>", {"class": "msg-top " + color + "-top"});
  var $div = $("<div>", {"class": "msg "+ color +"-msg"});
  $p.css({"top": initialTopMessage + "%"});
  $div.css({"top": initialTopMessage + 4.1 + "%"});
  $p.text(sender);
  $div.text(text);
  $("#chat-wrapper").append($p);
  $("#chat-wrapper").append($div);
  initialTopMessage+=6.1;


}

function processMessage (text) {
  rs.sortReplies();
	var reply = rs.reply("PALASH", text, this);
  $(this).delay(500).queue(function() {
    createMessage(reply, "PALASH", "blue");
   $(this).dequeue();
  });
  return false;
}
