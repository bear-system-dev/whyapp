import { Server } from 'socket.io';
import { httpServer } from '../index';
import helmet from 'helmet';
import session from 'express-session';

if (!process.env.SECRET_KEY) throw new Error('[SocketConfig] No SECRET_KEY found in this enviroment');

enum ENamespaces {
  home = '/',
  user = '/user'
}

const io = new Server(httpServer, {
  cors: {
    origin: '*'
  }
});

io.engine.use(helmet());
io.engine.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: true,
    maxAge: 1000 * 60 * 60 * 2 //2h
  }
}));

io.use((socket, next) => {
  next();
  // adicionar autenticação recebendo o token jwt e verificando. Se errado, retornar não autorizado
});

export { io, ENamespaces };