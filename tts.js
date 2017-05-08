console.log('加载tts.js');
function speak(content) {
    var msg = new SpeechSynthesisUtterance(content);
	window.speechSynthesis.speak(msg);
}