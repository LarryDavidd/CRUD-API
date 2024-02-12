import path from "path";
import fs from "fs";

let userFakeAi = 0;
const users = [];

export const getUsers = (request, response) => {
  console.log(request, response);

  response.statusCode = 200;
  console.log(users);

  response.end(JSON.stringify(users));

  // const newUsers = await conn.query(`SELECT * FROM Users`); // sql injection included mb

  // if (newUsers.length > 0) {
  //   response.end(JSON.stringify(newUsers));
  // } else {
  //   channel.push(response);
  // }
};

export const addUsers = (req, res) => {
  let data = "";

  // Получаем данные из тела запроса
  req.on("data", (chunk) => {
    data += chunk.toString();
  });

  // Обрабатываем полученные данные после завершения запроса
  req.on("end", () => {
    const userData = JSON.parse(data);
    console.log(userData); // Выводим данные в консоль
    users.push(userData);
    console.log(users);

    // Далее вы можете обработать данные или сохранить их в базе данных

    // Отправляем ответ клиенту
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ message: "Data received successfully" }));
  });
  // const id = ++userFakeAi;
  // const user = { id, name: id * 1000, createdAt: Date.now() };
  // users.push(user);
  // response.end(JSON.stringify(user));
};

export const chengeUser = (_, response) => {};

export const removeUser = (_, response) => {};
