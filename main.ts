class Todo{
   todoForm: HTMLFormElement;
   showTodo: HTMLDivElement;
   todoInput: HTMLInputElement;
  constructor(){
    this.todoForm=document.getElementById('todo-form') as HTMLFormElement
    this.showTodo=document.getElementById('showtodo') as HTMLDivElement
    this.todoInput = document.getElementById('todo-input') as HTMLInputElement
    this.storetodo()
  }

  
 
  getTodos = ():{
    id:number,
    text:string
  }[] => {
    return JSON.parse(localStorage.getItem('todos')) || []
  }


  saveTodos = (todos:{id:number,text:string}[]):void => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }


  storetodo(){
        this.todoForm.addEventListener('submit', (event) => {
        event.preventDefault();
        this.addTodo(this.todoInput.value);
        this.showtodo()
        this.todoForm.reset();
        });
        this.showtodo()
  }

   addTodo = (todoText: string):void  => {
    const todoId = Math.floor(Math.random() * 100);
    const newTodo = { id: todoId, text: todoText };
  
    const todos = this.getTodos()
    todos.push(newTodo);
    
    this.saveTodos(todos)
  }
  
showtodo=()=>{
  const todos = this.getTodos();
  this.showTodo.innerHTML = '';
  todos.forEach((todo) => {
    const todoItem = document.createElement('div');
    todoItem.innerHTML = `
        <div class="container d-flex justify-content-center mt-4">
        <div class="d-flex align-items-center justify-content-between p-3 bg-light rounded">
          <p id="todo-text" class="h6" style="margin-right: 20px;">${todo.text}</p>
          <div class="d-flex align-items-center">
            <button onclick="todo.update(${todo.id})" class="btn btn-success me-2">Update</button>
            <button onclick="todo.remove(${todo.id})" class="btn btn-danger">Delete</button>
          </div>
        </div>
      </div>
    `;
    this.showTodo.appendChild(todoItem);
  });
}
 update(Id:number):void{
  const todos = this.getTodos();
  const todoIndex = todos.findIndex(todo => todo.id === Id);
  const gettext:any=prompt("update your todo information")
  if(gettext.length)
  todos[todoIndex]={id:Id,text:gettext}
  
  this.saveTodos(todos)
  this.showtodo()

}
 remove(Id:number):void{
  const todos = this.getTodos();
  const todoIndex = todos.findIndex(todo => todo.id === Id);
 
  let todoarr1=todos.slice(0,todoIndex)
  let todoarr2=todos.slice(todoIndex+1)
  let newtodos=[...todoarr1,...todoarr2]
  this.saveTodos(newtodos)
  this.showtodo()
  
}
}


const todo=new Todo()