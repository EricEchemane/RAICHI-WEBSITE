const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");

const speechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new speechRecognition();

recognition.onresult = function(event) {
    let current = event.resultIndex;
    let transcript = event.results[current][0].transcript;
    console.log(transcript);
}

startBtn.addEventListener("click", () => {
    recognition.start()
});

stopBtn.addEventListener("click", () => {
    recognition.stop()
});


recognition.onresult = async() => {
    const current = event.resultIndex;
    const transcript = event.results[current][0].transcript;
    console.log(transcript);

    const value = transcript;
    const res = await fetch("https://thesis-server-kit.herokuapp.com/complete", {
        body: JSON.stringify({
            query: transcript
        }),
        method: 'POST',
        headers: {
            'Content-Type': 'Application/json'
        }
    })
    const data = await res.json()

    const answer = data.data;
    console.log(answer);
    readOut(answer);
};

function readOut(message) {
    const speech = new SpeechSynthesisUtterance();
    speech.text = message;

    speech.volume = 1;
    speech.pitch = 1;
    speech.rate = 1;
    window.speechSynthesis.speak(speech);
    console.log("speaking out")
}