import { createServer } from "http";
import { routes } from "#app/router.js";
import "dotenv/config";

const DOMAIN = "http://localhost";
const PORT = Number(process.env.PORT);
const HOST = `${DOMAIN}:${PORT}`;

const app = createServer((request, response) => {
  const parsedUrl = new URL(request.url, HOST);
  const { method } = request;
  request.appParsedUrl = parsedUrl;

  const reqFn =
    routes[parsedUrl.pathname][method] ??
    ((_, response) => response.end("404"));
  reqFn(request, response);
});

app.listen(PORT);
console.log("Server is active now");
