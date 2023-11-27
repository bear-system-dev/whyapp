import { io, ENamespaces } from '../../../config/SocketConfig';

console.log(ENamespaces.home);

io.of(ENamespaces.home).on('connection', (socket) => {
  console.log('homeNamespace: ', socket.id);
});