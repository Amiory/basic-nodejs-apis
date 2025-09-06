const users = [
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

  if (userIndex !== -1) {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      users[userIndex].name = JSON.parse(body).name;
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
  const userIndex = users.findIndex((user) => user.id === parseInt(id));

  if (userIndex !== -1) {
    const deletedUser = users.splice(userIndex, 1);
    res.statusCode = 200;
    res.end(JSON.stringify(deletedUser[0]));
  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({ message: "User not found" }));
  }
};

export {
  getUsersHandler,
  getUserByIdHandler,
  editUserByIdHandler,
  deleteUserByIdHandler,
  createUserHandler,
};
