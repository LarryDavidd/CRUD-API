import path from "path";
import fs from "fs";
import { validate, v4 } from "uuid";

let userFakeAi = 0;
let users = [];

export const getUsers = (_, response) => {
  response.statusCode = 200;

  response.end(JSON.stringify(users));
};

export const addUsers = (req, res) => {
  let data = "";

  req.on("data", (chunk) => {
    data += chunk.toString();
  });

  req.on("end", () => {
    const userData = JSON.parse(data);
    const { name, age, hobbies } = userData;

    if (!name || !age || !hobbies) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Missing required fields" }));
      return;
    }

    const newUser = {
      id: userFakeAi++,
      name: name,
      age: age,
      hobbies: hobbies.split(" "),
    };
    users.push(newUser);
    res.statusCode = 201;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ message: "Data received successfully" }));
  });
};

export const chengeUser = (req, res) => {
  let data = "";

  req.on("data", (chunk) => {
    data += chunk.toString();
  });

  req.on("end", () => {
    const userData = JSON.parse(data);
    const { id, name, age, hobbies } = userData;

    if (!name || !age || !hobbies) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Missing required fields" }));
      return;
    }

    users.forEach((user) => {
      if (user.id == id)
        user = {
          id: id,
          name: name,
          age: age,
          hobbies: hobbies.split(" "),
        };
    });
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ message: "Data received successfully" }));
  });
};

export const removeUser = (req, res) => {
  const id = req.params.id;
  const userIndex = users.findIndex((user) => user.id === id);
  if (userIndex !== -1) {
    users = users.filter((user) => user.id != id);
    res.statusCode = 204;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ message: "Data received successfully" }));
  } else if (!validate(id)) {
    res.statusCode = 400;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ message: "Incorrect user id" }));
  } else {
    res.statusCode = 404;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ message: "User not found" }));
  }
};
