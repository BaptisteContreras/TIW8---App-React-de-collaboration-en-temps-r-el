import io from 'socket.io-client';

export default function createClientSocket() {
  return io('');
}
