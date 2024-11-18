const inputServer = document.querySelector('#inputServer')
const inputNick = document.querySelector('#inputNick')
const connectButton = document.querySelector('#connectButton')

connectButton.addEventListener('click', () => {
    connect(inputServer.value, inputNick.value)
})

function connect(address, nick) {
    if(address) {
        const href = window.location.href;
        const dir = href.substring(0, href.lastIndexOf('/')) + "/";
        // console.log(`redirecting to ${dir}chat.html?server=${encodeURI(address)}${nick ? `&nick=${nick}` : ""}`)
        window.location.href = `${dir}client.html?server=${encodeURI(address)}${nick ? `&nick=${nick}` : ""}`
    } else {
        alert("Você não especificou o servidor!")
    }
}