const ws = new WebSocket('ws://localhost:8080');

ws.onmessage = (event) => {
    document.getElementById('output').innerText += event.data + '\n';
};

document.getElementById('send').onclick = () => {
    const command = document.getElementById('command').value;
    ws.send(command);
    document.getElementById('command').value = '';
};