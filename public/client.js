let nam = document.getElementById("cname").innerText;
const listItem = document.getElementById("msgs");

const socket = new WebSocket("wss://wsstousecb.onrender.com");

socket.addEventListener("open",(event)=>{
    socket.send(nam+"*&#@%");
});

socket.addEventListener("message",(event)=>{
    const packet = JSON.parse(event.data);
    const node = document.createElement("div");
    node.innerHTML=`<span>${packet.name}</span>${packet.msg}`;
    if(packet.name!=nam){
        node.classList.add("otherClient");
    }
    // node.innerHTML=event.data;
    listItem.appendChild(node);
    document.getElementById("msgs").scrollBy(0,document.getElementById("msgs").scrollHeight);
});

const sendMessage = ()=>{
    socket.send(`hello from ${nam}`);
};

const sendexit = ()=>{
    socket.send(`.;:--${nam}`);
};

document.getElementById("sender").addEventListener("click",()=>{
    sendMessage();
});

document.getElementById("exits").addEventListener("click",()=>{
    sendexit();
    socket.close();
    window.location.replace("/");
});

document.getElementById("msg").addEventListener("keydown",(event)=>{
    if(event.key==="Enter"){
        document.getElementById("sendmsg").click();
        event.target.value="";
    }
});

document.getElementById("sendmsg").addEventListener("click",()=>{
    if(document.getElementById("msg").value!=""){
        socket.send(document.getElementById("msg").value);
    }
});