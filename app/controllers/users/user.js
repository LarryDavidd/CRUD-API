import path from "path";
import fs from "fs";

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
    const newUser = {
      id: userFakeAi++,
      name: name,
      age: age,
      hobbies: hobbies.split(" "),
    };
    users.push(newUser);
    res.statusCode = 200;
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
  let data = "";

  req.on("data", (chunk) => {
    data += chunk.toString();
  });

  req.on("end", () => {
    const userData = JSON.parse(data);
    const { id } = userData;
    users = users.filter((user) => user.id != id);
    console.log(
      users,
      id,
      userData,
      users.filter((user) => user.id !== id)
    );
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ message: "Data received successfully" }));
  });
};
