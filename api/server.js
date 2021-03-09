// BUILD YOUR SERVER HERE

// Imports express and users model
const express = require("express");
const Users = require("./users/model");

// Call EXPRESS

const server = express();

// Global Middleware

server.use(express.json());

// ENDPOINTS --------------------------->>>>

// [GET] /api/users/:id
//  - findById takes id
//  - if id not found:
//      - 404 -> {message: "The user with the specified ID does not exist"}
//  - if error in retrieving user:
//      - 500 -> {message: "The user information could not be retrieved"}

server.get("/api/users/:id", (req, res) => {
  const id = req.params.id;
  Users.findById(id)
    .then((user) => {
      if (!user) {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist" });
      } else {
        res.json(user);
      }
    })
    .catch(() => {
      res
        .status(500)
        .json({ message: "The user information could not be retrieved" });
    });
});

// [GET] /api/users
//  - find resolves to the list of users (or empty array)
//  - if error in retrieving user:
//      - 500 -> {message: "The users information could not be retrieved"}

server.get("/api/users", (req, res) => {
  Users.find()
    .then((user) => {
      res.status(200).json(user);
    })
    .catch(() => {
      res
        .status(500)
        .json({ message: "The users information could not be retrieved" });
    });
});

// [POST] /api/users
//  - insert takes new user {name, bio} and resolves new user
//  - if request body is missing name or bio property:
//      - 400 -> {message: "Please provide name and bio for the user"}
//  - if information is valid:
//      - save new user the database
//      - status code 201
//      - return new user document including its id
//  - if error in saving user:
//      - 500 => {message: "There was an error while saving the user to the database"}

server.post("/api/users", (req, res) => {
  const newUser = req.body;

  if (!newUser.name || !newUser.bio) {
    res
      .status(400)
      .json({ message: "Pleas provide name and bio for the user" });
  } else {
    Users.insert(newUser)
      .then((user) => {
        res.status(201).json(user);
      })
      .catch(() => {
        res.status(500).json({
          message: "There was an error while saving the user to the database",
        });
      });
  }
});

// [PUT] /api/users/:id
//  - update takes id and existing {name, bio} and resolves updated user
//  - if user with id is not found:
//      - 404 -> {message: "The user with the specified ID does not exist"}
//  - if request body is missing name or bio property:
//      - 400 -> {message: "Please provide name and bio for the user"}
//  - if error when updating user:
//      - 500 -> {message: "The user information could not be modified"}
//  - if user found and new information is correct:
//      - update user doc in database using the new info sent in request body
//      - status code 200
//      - return newly updated user document

server.put("/api/users/:id", async (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  try {
    if (!changes.name || !changes.bio) {
      res
        .status(400)
        .json({ message: "Please provide name and bio for the user" });
    } else {
      const updateUser = await Users.update(id, changes);
      if (!updateUser) {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist" });
      } else {
        res.status(200).json(updateUser);
      }
    }
  } catch {
    res
      .status(500)
      .json({ message: "The user information could not be modified" });
  }
});

// [DELETE] /api/users/:id
//  - remove takes id and resolves to deleted user
//  - if user with id not found
//       - 404 -> {message: "The user iwth the specified ID does not exist"}
//  - if error in removing user
//      - 500 -> {message: "The user could not be removed"}

server.delete("/api/users/:id", async (req, res) => {
  try {
    const removed = await Users.remove(req.params.id);
    if (!removed) {
      res
        .status(404)
        .json({ message: "The user with the specified ID does not exist" });
    } else {
      res.json(removed);
    }
  } catch {
    res.status(500).json({ message: "The user could not be removed" });
  }
});

module.exports = server; // EXPORT YOUR SERVER instead of {}
