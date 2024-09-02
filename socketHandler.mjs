import { Server as SocketIOServer } from 'socket.io';

export function setupSocketIO(server) {
  const io = new SocketIOServer(server);

  io.on('connection', (socket) => {
    socket.emit('message', 'Olá do servidor!');

    socket.on('clientMessage', (data) => {
      console.log('Mensagem do cliente:', data);
    });

    socket.on('disconnect', () => {
      console.log('Usuário desconectado');
    });
  });

  return io;
}
