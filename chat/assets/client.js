const url = new URL(window.location.href)
const queryString = url.search
const params = new URLSearchParams(queryString)
let wsAddr = params.get('server') // "ws://localhost:4000" - ?server=ws%3A%2F%2Flocalhost%3A4000&nick=adrian
const ws = new WebSocket(wsAddr)
const main = document.querySelector('main')
const sendButton = document.querySelector('#sendButton')
let nick = 'unknown'
const nickbox = document.querySelector('#username')
let incomingNicknames = document.querySelectorAll('.incomingNickname')
const composeBox = document.querySelector('#composeBox')

composeBox.addEventListener('keypress', function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        sendMessage();
    }
})

function showMessage(owner, message, nickname, timestamp) { 
    const isOwner = nick == nickname
    let html = `<div class="message ${isOwner ? "owner" : ""}">
    <div class="content">
    <p><a class="incomingNickname">${nickname}</a></p>
    ${message}
    </div>
    <div class="time">
    ${timestamp}
    </div>
    </div>`
    main.innerHTML += html
    attachNicknameListeners();
}

function attachNicknameListeners() {
    const incomingNicknames = document.querySelectorAll('.incomingNickname');
    incomingNicknames.forEach(node => {
        node.addEventListener('click', () => {
            composeBox.value +=`@${node.textContent} `;
        });
    });
}

ws.addEventListener('open', () => {
    console.log("Conectado")
    if(params.get('nick') !== null) {
        nick = params.get('nick')
        nickbox.textContent = `${nick} @ ${wsAddr}`
        ws.send(`/nick ${params.get('nick')}`)
    } else {
        nickbox.textContent = `default @ ${wsAddr}`
    }
})

ws.addEventListener('close', () =>{
    console.log("Desconectado")
    showMessage(false, "Desconectado do servidor", "Client", timestamp)
})

ws.addEventListener('message', (event) => {
    const data = JSON.parse(event.data)
    showMessage(false, data.message, data.nick, data.timestamp)
})

sendButton.addEventListener('click', () => {
    sendMessage()
})

function sendMessage() {
    if(composeBox.value !== '') {
        if(composeBox.value.startsWith('/nick')) {
            nick = composeBox.value.split(' ')[1]
            nickbox.textContent = `${nick} @ ${wsAddr}`;
        }
        ws.send(composeBox.value)
        composeBox.value = '';
    }
}