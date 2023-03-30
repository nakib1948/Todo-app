
const todoForm = document.getElementById('todo-form');
const getTodos = () => {
  return JSON.parse(localStorage.getItem('todos')) || [];
};

const saveTodos = (todos) => {
  localStorage.setItem('todos', JSON.stringify(todos));
};
const addTodo = (todoText) => {
  const todoId = Math.floor(Math.random() * 100);
  const newTodo = { id: todoId, text: todoText };

  console.log(newTodo)
  const todos = getTodos()
  todos.push(newTodo);
  
  saveTodos(todos)
  showtodo()
};




todoForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const todoInput = document.getElementById('todo-input');
  const todoText = todoInput.value;

  console.log(todoText);

  addTodo(todoText);
  showtodo()
  todoForm.reset();
});


const showtodo=()=>{
    const showtodo=document.getElementById('showtodo')
    const todos = getTodos();
    showtodo.innerHTML = '';
    todos.forEach((todo) => {
      const todoItem = document.createElement('div');
      todoItem.innerHTML = `
          <div class="container d-flex justify-content-center mt-4">
          <div class="d-flex align-items-center justify-content-between p-3 bg-light rounded">
            <p id="todo-text" class="h6" style="margin-right: 20px;">${todo.text}</p>
            <div class="d-flex align-items-center">
              <button onclick="update(${todo.id})" class="btn btn-success me-2">Update</button>
              <button onclick="remove(${todo.id})" class="btn btn-danger">Delete</button>
            </div>
          </div>
        </div>
      `;
      showtodo.appendChild(todoItem);
    });
}

function update(Id){
  const todos = getTodos();
  const todoIndex = todos.findIndex(todo => todo.id === Id);
  const gettext=prompt("update your todo information")
  if(gettext.length)
  todos[todoIndex]={id:Id,text:gettext}
  
  saveTodos(todos)
  showtodo()

}
function remove(Id){
  const todos = getTodos();
  const todoIndex = todos.findIndex(todo => todo.id === Id);
 
  let todoarr1=todos.slice(0,todoIndex)
  let todoarr2=todos.slice(todoIndex+1)
  let newtodos=[...todoarr1,...todoarr2]
  saveTodos(newtodos)
  showtodo()
  
}
showtodo()

