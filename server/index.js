// TODO
// eslint-disable-next-line import/no-extraneous-dependencies
const express = require('express');

const app = express();
const path = require('path');
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization', 'Cache-Control', 'Pragma'],
    credentials: true,
  },
});

const DIST_DIR = path.join(__dirname, '../dist');
// const HTML_FILE = path.join(DIST_DIR, 'index.html');
app.use(express.static(DIST_DIR));

const port = process.env.PORT || 3000;

let clients = [];

function addClient(client) {
  // console.log(`add ${client.id}`);
  clients.push(client);
}

function deleteClient(client) {
  // console.log(`delete ${client.id}`);
  clients = clients.filter((c) => c.id !== client.id);
}

io.on('connection', (socket) => {
  addClient(socket);
  // console.log('client connected');

  socket.on('SET_BOARD', (data) => {
    socket.broadcast.emit('CHANGE_BOARD', data);
  });
  socket.on('CREATE_BOARD', (data) => {
    socket.broadcast.emit('CREATE_BOARD', data);
  });
  socket.on('SET_POSTIT', (data) => {
    socket.broadcast.emit('CHANGE_POSTIT', data);
  });
  socket.on('CREATE_POSTIT', (data) => {
    socket.broadcast.emit('CREATE_POSTIT', data);
  });
  socket.on('DELETE_POSTIT', (data) => {
    socket.broadcast.emit('DELETE_POSTIT', data);
  });
  socket.on('UPDATE_POSTIT', (data) => {
    socket.broadcast.emit('UPDATE_POSTIT', data);
  });
  socket.on('disconnect', () => {
    deleteClient(socket);
  });
  socket.on('NEED_SYNCHRO', () => {
    if (clients.length > 1) {
      // console.log(`master : ${clients[0].id}`);
      clients[0].emit('GET_STATE', { src: socket.id });
    }
  });
  socket.on('SEND_SYNCHRO', (data) => {
    const clientToSync = clients.filter((c) => c.id === data.src)[0];
    // console.log(clientToSync.id);
    if (clientToSync) {
      clientToSync.emit('SET_STATE', { state: data.state });
    }
  });
});

/**
 app.get('/', (req, res) => {
  res.sendFile(HTML_FILE);
});
 * */
http.listen(port, () => {
  // console.log(`App listening on port: ${port}`);
});
