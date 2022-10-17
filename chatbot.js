const input = document.getElementById("chat");
const sendbutton = document.getElementById("replybutton");
const message = document.getElementById("msg");

let conversation = "";

function init() {
    const res_elm = document.createElement("div");
    res_elm.innerHTML = "This is RaichiAI, How can I help you?";
    res_elm.setAttribute("class", "left");

    document.getElementById('msg').appendChild(res_elm);
}

sendbutton.onclick = async () => {

    const value = input.value;

    // this line prevents from sending empty messages
    if (value.trim() == "") return;

    conversation += "Human: " + value + "\nAI: ";

    input.value = ""; // clear the input field

    // create my own chat
    const messagesContainer = document.getElementById('msg');
    const mychatContainer = document.createElement('div');
    mychatContainer.style.display = "flex";
    mychatContainer.style.justifyContent = "flex-end";
    const mychat = document.createElement('div');
    mychat.innerText = value;
    mychatContainer.appendChild(mychat);
    mychat.classList.add("right");
    messagesContainer.appendChild(mychatContainer);

    const res = await fetch("https://thesis-server-kit.herokuapp.com/complete", {
        // const res = await fetch("http://localhost:3000/complete", {
        body: JSON.stringify({
            query: conversation,
        }),
        method: 'POST',
        headers: {
            'Content-Type': 'Application/json'
        }
    });
    const data = await res.json();

    const answer = data.data;

    conversation += answer + "\n";

    // create
    const botchatContainer = document.createElement('div');
    botchatContainer.style.display = "flex";
    botchatContainer.style.justifyContent = "flex-start";
    const botchat = document.createElement('div');
    botchat.innerText = answer;
    botchatContainer.appendChild(botchat);
    botchat.classList.add("left");
    messagesContainer.appendChild(botchatContainer);


    function scroll() {
        var scrollMsg = document.getElementById('msg');
        scrollMsg.scrollTop = scrollMsg.scrollHeight;
    }
    scroll();

};