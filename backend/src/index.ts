import { server } from './server';

const SERVER_PORT = process.env.SERVER_PORT || 5550;

server.listen(SERVER_PORT, () => {
  console.log(`Server is running on: http://localhost:${SERVER_PORT}`);  
});