import { IncomingMessage, ServerResponse } from 'http';
import { v4 as uuidv4, validate as validateUUID } from 'uuid';

interface User {
  id: string;
  name: string;
  age: number;
  hobbies: string[];
}

const users: User[] = [];

export const getUsers = (_: IncomingMessage, res: ServerResponse) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(users));
};

export const getUser = (
  req: IncomingMessage,
  res: ServerResponse,
  id: string
) => {
  const user = users.find((user) => user.id === id);
  if (user) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(user));
  } else if (!validateUUID(id)) {
    res.statusCode = 400;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ message: 'Incorrect user id' }));
  } else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ message: 'User not found' }));
  }
};

export const addUsers = (req: IncomingMessage, res: ServerResponse) => {
  let data = '';

  req.on('data', (chunk) => {
    data += chunk.toString();
  });

  req.on('end', () => {
    const userData = JSON.parse(data);
    const { name, age, hobbies } = userData;

    if (!name || !age || !hobbies) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Missing required fields' }));
      return;
    }

    const newUser: User = {
      id: uuidv4(),
      name: name,
      age: age,
      hobbies: hobbies.split(' '),
    };
    users.push(newUser);
    res.statusCode = 201;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ message: 'Data received successfully' }));
  });
};

export const chengeUser = (
  req: IncomingMessage,
  res: ServerResponse,
  id: string
) => {
  let data = '';

  req.on('data', (chunk) => {
    data += chunk.toString();
  });

  req.on('end', () => {
    const userData = JSON.parse(data);
    const { name, age, hobbies } = userData;
    const userIndex = users.findIndex((user) => user.id === id);

    if (userIndex !== -1) {
      users.forEach((user, i) => {
        if (user.id == id)
          users[i] = {
            id: id,
            name: name,
            age: age,
            hobbies: hobbies.split(' '),
          };
      });
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ message: 'Data received successfully' }));
    } else {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ message: 'User not found' }));
    }

    if (!name || !age || !hobbies || !validateUUID(id)) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Missing required fields' }));
      return;
    }
  });
};

export const removeUser = (
  req: IncomingMessage,
  res: ServerResponse,
  id: string
) => {
  const userIndex = users.findIndex((user) => user.id === id);
  if (userIndex !== -1) {
    users.splice(userIndex, 1);
    res.statusCode = 204;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ message: 'Data received successfully' }));
  } else if (!validateUUID(id)) {
    res.statusCode = 400;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ message: 'Incorrect user id' }));
  } else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ message: 'User not found' }));
  }
};
