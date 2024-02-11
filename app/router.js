import { getUsers, addUsers } from "./controllers/users/flow.js";
import { favicon, home } from "./controllers/static.js";

export const routes = {
  "/": home,
  "/favicon.ico": favicon,
  "/api/users": getUsers,
  "/api/users/create": addUsers,
};
