import { createServer } from "http";
import { middleware, jsonMiddleware } from "./middleware.js";

const PORT = process.env.PORT || 3000;

let users = [
  { id: 1, name: "Amy" },
  { id: 2, name: "Yuki" },
  { id: 3, name: "Armess" },
];

// get users handler for route /api/users
const getUsersHandler = (req, res) => {
  res.write(JSON.stringify(users));
  res.end();
};

//Get user by id handler for route /api/users/:id
const getUserByIdHandler = (req, res) => {
  const id = req.url.split("/")[3];

  const user = users.find((user) => user.id === parseInt(id));
  if (user) {
    res.write(JSON.stringify(user));
  } else {
    res.statusCode = 404;
    res.write(JSON.stringify({ message: "User not found" }));
  }
  res.end();
};

// Create user handler for route /api/users
const createUserHandler = (req, res) => {
  let body = "";

  //Listen for data
  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    const newUser = JSON.parse(body);
    users.push(newUser);
    res.statusCode = 201;
    res.write(JSON.stringify(newUser));
    res.end();
  });
};

const editUserByIdHandler = (req, res) => {
  const id = req.url.split("/")[3];
  const userIndex = users.findIndex((user) => user.id === parseInt(id));

  console.log(id);

  if (userIndex !== -1) {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      users[userIndex].name = JSON.parse(body).name;
      console.log(users);

      res.end(JSON.stringify(users[userIndex]));
    });
  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({ message: "User not found" }));
  }
};

// Delete user by id handler for route /api/users/:id
const deleteUserByIdHandler = (req, res) => {
  const id = req.url.split("/")[3];

  users = users.filter((user) => user.id !== parseInt(id));

  res.end(JSON.stringify(users));
};

// Not found handler
const notFoundHandler = (req, res) => {
  res.statusCode = 404;
  res.write(JSON.stringify({ message: "Route not found" }));
  res.end();
};

const server = createServer((req, res) => {
  middleware(req, res, () => {
    jsonMiddleware(req, res, () => {
      if (req.url === "/api/users" && req.method === "GET") {
        getUsersHandler(req, res);
      } else if (
        req.url.match(/\/api\/users\/([0-9]+)/) &&
        req.method === "GET"
      ) {
        getUserByIdHandler(req, res);
      } else if (req.url === "/api/users" && req.method === "POST") {
        createUserHandler(req, res);
      } else if (
        req.url.match(/\/api\/users\/([0-9]+)/) &&
        req.method === "DELETE"
      ) {
        deleteUserByIdHandler(req, res);
      } else if (
        req.url.match(/\/api\/users\/([0-9]+)/) &&
        req.method === "PATCH"
      ) {
        editUserByIdHandler(req, res);
      } else {
        notFoundHandler(req, res);
      }
    });
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
