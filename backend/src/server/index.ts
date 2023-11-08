import expres, { NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';
import { StatusCodes } from 'http-status-codes';
import { routes } from './routes';
import 'dotenv/config';
import cors from 'cors';
import helmet from 'helmet';

const server = expres();

server.use(cors({ origin: ['*',] })); //MUDAR PARA APENAS O DOMÍNIO DO FRONT-END ACESSAR
server.use(helmet());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(routes.miscRoutes);
server.use(routes.loginRoutes);

//Retorna abaixo, em caso de erro do express
// eslint-disable-next-line @typescript-eslint/no-unused-vars
server.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err.stack);
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(`
    <h1>Error-500</h1>
    <h3>Erro ao processar sua solicitação</h3>
  `);
});

server.disable('x-powered-by'); //Não mostra que foi desenvolvido com o express (Não é o mais seguro)

export { server };