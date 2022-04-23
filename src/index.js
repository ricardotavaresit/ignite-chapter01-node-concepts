const express = require('express');
const cors = require('cors');

// const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(cors());
app.use(express.json());

// const users = [];

function checksExistsUserAccount(request, response, next) {

  const { username } = request.headers; 

  const user = users.find(user => user.username === username);

  if( !user ){
    return response.status(400).json({error: "User doesn't exists."});
  }

  request.user = user;

  return next();
}

app.post('/users', (request, response) => {
  const { name, username } = request.body;

  const userAlreadyExists = users.find( (user) => user.username == username );

  if( userAlreadyExists ){
    return response.status(400).json({error: "User already exists."});
  }

  const userData = {
    id: uuidv4(), 
    name, 
    username, 
    todos:[],
  }

  users.push(userData)

  return response.status(201).json(userData);
});

app.get('/todos', checksExistsUserAccount, (request, response) => {
  const { user } = request;
  return response.status(200).json(user.todos); 
});

app.post('/todos', checksExistsUserAccount, (request, response) => {

  const { title, deadline } = request.body;
  const { user } = request;

  const toDoData = { 
    id: uuidv4(), 
    title,
    done: false,
    deadline: new Date(deadline),
    created_at: new Date()
  }

  user.todos.push(toDoData);

  return response.status(201).json(toDoData);

});

app.put('/todos/:id', checksExistsUserAccount, (request, response) => {

  const { id } = request.params;
  const { user } = request;
  const { title, deadline } = request.body;

  const toDoAlreadyExists = user.todos.find( (todo) => todo.id === id );

  if( !toDoAlreadyExists ){
    return response.status(404).json({error:`Todo id:${id} doesn't exist.`});
  }

  toDoAlreadyExists.title = title;
  toDoAlreadyExists.deadline = new Date(deadline);  

  return response.status(200).json(toDoAlreadyExists);
 
});

app.patch('/todos/:id/done', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.delete('/todos/:id', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

module.exports = app;