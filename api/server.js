// BUILD YOUR SERVER HERE

// Imports express and users model

// Call EXPRESS

// Global Middleware

// ENDPOINTS --------------------------->>>>

// [GET] /api/users/:id
//  - findById takes id
//  - if id not found:
//      - 404 -> {message: "The user with the specified ID does not exist"}
//  - if error in retrieving user:
//      - 500 -> {message: "The user information could not be retrieved"}

// [GET] /api/users
//  - find resolves to the list of users (or empty array)
//  - if error in retrieving user:
//      - 500 -> {message: "The users information could not be retrieved"}

// [POST] /api/users
//  - takes id and existing {name, bio} and resolves updated user
//  - if request body is missing name or bio property:
//      - 400 -> {message: "Please provide name and bio for the user"}
//  - if information is valid:
//      - save new user the database
//      - status code 201
//      - return new user document including its id
//  - if error in saving user:
//      - 500 => {message: "There was an error while saving the user to the database"}
//

// [PUT] /api/users/:id
//  - takes new user {name, bio} and resolves new user
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

// [DELETE] /api/users/:id
//  - takes id and resolves to deleted user
//  - if user with id not found
//       - 404 -> {message: "The user iwth the specified ID does not exist"}
//  - if error in removing user
//      - 500 -> {message: "The user could not be removed"}

module.exports = {}; // EXPORT YOUR SERVER instead of {}
