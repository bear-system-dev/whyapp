import { httpServer } from './server';

const SERVER_PORT = process.env.SERVER_PORT || 5550;

httpServer.listen(SERVER_PORT, () => {
  console.log(`Server is running on: http://localhost:${SERVER_PORT}`);
});