import {
  getUsers,
  addUsers,
  chengeUser,
  removeUser,
} from "./controllers/users/user.js";
import { favicon, home } from "./controllers/static.js";

export const routes = {
  "/": {
    GET: home,
  },
  "/favicon.ico": { GET: favicon },
  "/api/users": {
    GET: getUsers,
    POST: addUsers,
  },
  "/api/users/:id": {
    PUT: chengeUser,
    DELETE: removeUser,
  },
};
