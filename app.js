const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

const socketIo = require('socket.io');

const io = socketIo(server);

server.listen(3000, () => {
    console.log('Rodando');
});

app.use(express.static(__dirname + "/public"));

let historico = [];

io.on('connection', (socket) => {
    console.log('Nova conexão')

    // Isso faz com que mesmo que atualize a página, os desenhos sejam reconstruídos
    historico.forEach((linha) => {
        // Mandando a mensagem apenas para o novo front-end conectado
        socket.emit('desenhe', linha);
    })

    socket.on('desenhar', (linha) => {
        historico.push(linha);

        io.emit('desenhe', linha);
    });

    socket.on('limparTela', (tela) => {
        io.emit('telaLimpa', tela);

        historico = [];
    })
})

