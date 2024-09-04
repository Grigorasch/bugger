const ws = new WebSocket('ws://localhost:8080');

ws.onopen = (event) => {
    console.info('ws connected');
}

ws.onmessage = (event) => {
    document.getElementById('output').innerText += event.data + '\n';
};

document.getElementById('send').onclick = () => {
    const command = document.getElementById('command').value;
    ws.send(command);
    document.getElementById('command').value = '';
};