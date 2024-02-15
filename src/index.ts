import { createServer, IncomingMessage, ServerResponse } from 'http';
import { routes } from './router';
import 'dotenv/config';
import { chengeUser, getUser, removeUser } from './controllers/users/user';

import { URL } from 'url';

const DOMAIN = 'http://localhost';
const PORT = Number(process.env.PORT);
const HOST = `${DOMAIN}:${PORT}`;

const app = createServer(
  (request: IncomingMessage, response: ServerResponse) => {
    const parsedUrl = new URL(request.url!, HOST);
    const { method } = request;

    const idRouteRegex = /^\/api\/users\/.+$/;
    const idMatch = parsedUrl.pathname.match(idRouteRegex);
    if (idMatch) {
      const id: string = parsedUrl.pathname.split('/')[3];
      const idHandlers = routes['/api/users/:id'];
      if (idHandlers) {
        if (method === 'PUT') {
          return chengeUser(request, response, id);
        } else if (method === 'DELETE') {
          return removeUser(request, response, id);
        } else if (method === 'GET') {
          return getUser(request, response, id);
        }
      }
    }

    const routeHandlers = routes[parsedUrl.pathname];
    if (!routeHandlers) {
      response.writeHead(404);
      response.end('Not Found');
      return;
    }

    const reqFn = routeHandlers[method!];
    if (!reqFn) {
      response.writeHead(404);
      response.end('Method Not Allowed');
      return;
    }

    reqFn(request, response);
  }
);

app.listen(PORT);
console.log('Server is active now');
