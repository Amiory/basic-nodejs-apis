# Basic Node.js APIs

A minimal Node.js API server demonstrating how to handle HTTP requests using the built-in `http` module, without relying on external frameworks.

## 🚀 Features

- Handles HTTP requests using the core `http` module.
- Includes middleware for logging and basic error handling.
- Provides a simple API endpoint to demonstrate server functionality.

## 📂 Project Structure

```
basic-nodejs-apis/
├── server.js
├── userController.js
├── middleware.js
├── package.json
├── package-lock.json
└── .gitignore
```

- `server.js`: Main server file where the HTTP server is created and routes are defined.
- `userController.js`: Contains functions for handling requests related to users.
- `middleware.js`: Contains middleware functions for logging and error handling.
- `package.json`: Project metadata and dependencies.
- `package-lock.json`: Exact versions of installed dependencies.
- `.gitignore`: Specifies files and directories to be ignored by Git.

## 🛠️ Technologies

- [Node.js](https://nodejs.org/) (no frameworks)

## 🔧 Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/Amiory/basic-nodejs-apis.git
cd basic-nodejs-apis
npm install
```

## ➡️ API Endpoints

- GET /api/users - Get all users
- POST /api/users - Create a user
- GET /api/users/:id - Get user by ID
- PATCH /api/users/:id - Update a user
- DELETE /api/users/:id - Delete a user

## ▶️ Usage

Start the server:

```bash
node server.js
```

Use an API client such as Postman or curl to use the API endpoints.

By default, the server runs on `http://localhost:3000`.

## 📖 Learning Purpose

This project is intended for practicing:

- Basic Node.js server setup
- Handling HTTP requests with the core `http` module
- Implementing middleware functions
- Understanding how frameworks like Express work under the hood

## 📜 License

This project is licensed under the MIT License.
