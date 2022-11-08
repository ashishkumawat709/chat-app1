
const socket = io()
let name;
let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message__area')
do {
    name = prompt('Please enter your name: ')       //name var me hmne prompt store kiya or isko do while me 
                                               //isliye likha taki koi jb tk name na likhe tb tk use ye prompt deta rhe
} while(!name)                       //name agr nhi to loop chlta rhega 

textarea.addEventListener('keyup', (e) => {
    if(e.key === 'Enter') {                                                //agr enter key dbaye to msg send krna                                                           
        //sendMessage name ka fn un pressed keys values ko lega
        sendMessage(e.target.value)
    }
})

function sendMessage(message) {
    let msg = {
        user: name,
        message: message.trim()
    }
    // Append 
    appendMessage(msg, 'outgoing')
    textarea.value = ''               //send krne k bad textarea ko blank krna ho to
    scrollToBottom()                 //isse scrollbar last msg k pas scroll kr jata h

    // Send to server 
    socket.emit('message', msg)      //msg is the object we created consisting the user and msg

}

function appendMessage(msg, type) {
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className, 'message')

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv)
}

// Recieve messages 
socket.on('message', (msg) => {
    appendMessage(msg, 'incoming')
    scrollToBottom()
})

  //automatically scroll bar last msg k pas scroll ho jaye
function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight
}


