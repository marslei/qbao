console.log("background.js");
function speak(content) {
    var msg = new SpeechSynthesisUtterance(content);
	msg.rate = 10; // 0.1 to 10
	window.speechSynthesis.speak(msg);
}