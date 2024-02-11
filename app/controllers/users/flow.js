import path from "path";
import fs from "fs";

let userFakeAi = 0;
const users = [];

export function getUsers(request, response) {
  console.log(request, response);

  response.statusCode = 200;

  response.end(JSON.stringify(users));

  // const newUsers = await conn.query(`SELECT * FROM Users`); // sql injection included mb

  // if (newUsers.length > 0) {
  //   response.end(JSON.stringify(newUsers));
  // } else {
  //   channel.push(response);
  // }
}

export function addUsers(_, response) {
  console.log(response, _);
  // const id = ++userFakeAi;
  // const user = { id, name: id * 1000, createdAt: Date.now() };
  // users.push(user);
  // response.end(JSON.stringify(user));
}
