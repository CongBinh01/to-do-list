var input = document.querySelector('input');
var button = document.querySelector('button');
var form = document.querySelector('form');
var todos = document.querySelector('.todos');

form.addEventListener('submit', function (event) {
  event.preventDefault();
  let val = input.value.trim();
  if (val) {
    addTodoElement({
      text: val,
    })
  }
  input.value = '' 
})

function addTodoElement(todo) {
  var li = document.createElement('li');
  li.innerHTML = `
            <span> ${todo.text} </span>
            <i class="fa-solid fa-trash"></i>
  `;

  if (todo.status === 'completed') {
    li.setAttribute('class', 'completed');
  }

  li.addEventListener('click', function(){
    this.classList.toggle('completed')
    saveToDoList() 
  })

  li.querySelector('i').addEventListener('click', function(){
    this.parentElement.remove()
    saveToDoList() 
  })
  todos.appendChild(li);
}

function saveToDoList(){
  let todoList = document.querySelectorAll('li')
  let todoStorage = []
  todoList.forEach(function(item){
    let text = item.querySelector('span').innerText
    let status = item.getAttribute('class')

    todoStorage.push({
      text,
      status
    })
  })
  localStorage.setItem('todolist', JSON.stringify(todoStorage))
}

function init(){
  let data = JSON.parse(localStorage.getItem('todolist'))
  data.forEach(function(item){
    addTodoElement(item)
  })
}

init()