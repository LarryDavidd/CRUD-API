import { createServer } from "http";
import { routes } from "#app/router.js";
import "dotenv/config";
import {
  chengeUser,
  getUser,
  removeUser,
} from "./app/controllers/users/user.js";

const DOMAIN = "http://localhost";
const PORT = Number(process.env.PORT);
const HOST = `${DOMAIN}:${PORT}`;

const app = createServer((request, response) => {
  const parsedUrl = new URL(request.url, HOST);
  const { method } = request;
  request.appParsedUrl = parsedUrl;
  console.log(parsedUrl.pathname, method);

  const idRouteRegex = /^\/api\/users\/.+$/;
  const idMatch = parsedUrl.pathname.match(idRouteRegex);
  if (idMatch) {
    const id = parsedUrl.pathname.split("/")[3];
    console.log(id);
    const idHandlers = routes["/api/users/:id"];
    if (idHandlers) {
      const { PUT, DELETE, GET } = idHandlers;
      if (method === "PUT" && PUT) {
        return chengeUser(request, response, id);
      } else if (method === "DELETE" && DELETE) {
        return removeUser(request, response, id);
      } else if (method === "GET" && GET) {
        return getUser(request, response, id);
      }
    }
  }

  const routeHandlers = routes[parsedUrl.pathname];
  if (!routeHandlers) {
    response.writeHead(404);
    response.end("Not Found");
    return;
  }

  const reqFn = routeHandlers[method];
  if (!reqFn) {
    response.writeHead(404);
    response.end("Method Not Allowed");
    return;
  }

  reqFn(request, response);
});

app.listen(PORT);
console.log("Server is active now");
