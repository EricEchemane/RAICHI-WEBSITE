const input = document.getElementById("chat");
const sendbutton = document.getElementById("replybutton");
const message = document.getElementById("msg")

function init() {
    const res_elm = document.createElement("div");
    res_elm.innerHTML = "This is RaichiAI, How can I help you?";
    res_elm.setAttribute("class", "left");

    document.getElementById('msg').appendChild(res_elm);
}

sendbutton.onclick = async() => {

    const value = input.value
    const res = await fetch("http://localhost:3000/complete", {
        body: JSON.stringify({
            query: value
        }),
        method: 'POST',
        headers: {
            'Content-Type': 'Application/json'
        }
    })
    const data = await res.json()

    const answer = data.data
    const messagesContainer = document.getElementById('msg')

    // create my own chat
    const mychatContainer = document.createElement('div')
    mychatContainer.style.display = "flex";
    mychatContainer.style.justifyContent = "flex-end";
    const mychat = document.createElement('div')
    mychat.innerText = value;
    mychatContainer.appendChild(mychat)
    mychat.classList.add("right")
    messagesContainer.appendChild(mychatContainer);

    // create
    const botchatContainer = document.createElement('div');
    botchatContainer.style.display = "flex";
    botchatContainer.style.justifyContent = "flex-start";
    const botchat = document.createElement('div');
    botchat.innerText = answer;
    botchatContainer.appendChild(botchat)
    botchat.classList.add("left")
    messagesContainer.appendChild(botchatContainer)

    function scroll() {
        var scrollMsg = document.getElementById('msg')
        scrollMsg.scrollTop = scrollMsg.scrollHeight;
    }
    scroll();

};