import { io, ENamespaces } from '../../../config/SocketConfig';

console.log(ENamespaces.user);

io.of(ENamespaces.user).on('connection', (socket) => {
  console.log('userNamespace: ', socket.id);
});