const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list")
const filterTodo = document.querySelector(".filter-todo")


todoButton.addEventListener("click" , addtodo);
todoList.addEventListener("click" , deleteCompleteTodo);
filterTodo.addEventListener("click", filter)
document.addEventListener("DOMContentLoaded" , getTodo)


function addtodo (event){
    event.preventDefault();
    const todoDiv = document.createElement("div")
    todoDiv.classList.add("todo")

    const li = document.createElement("li")
    li.classList.add("list-item")
    todoDiv.appendChild(li)
    li.innerText = todoInput.value
    todoList.appendChild(todoDiv)

    saveLocalTodo(todoInput.value);

    todoInput.value = ""

    const completebutton = document.createElement("button");
    completebutton.innerHTML="<i class='fas fa-check'></i>"
    completebutton.classList.add("complete-btn")
    todoDiv.appendChild(completebutton)

    const trashbutton = document.createElement("button")
    trashbutton.innerHTML="<i class='fas fa-trash'></i>";
    trashbutton.classList.add("trash-btn");
    todoDiv.appendChild(trashbutton)
    
}

function deleteCompleteTodo(event) {
    const item = event.target
    if (item.classList[0] === "trash-btn") {
        const todo = item.parentElement
        removeLocalTodo(todo);
        todo.remove()
       
    } else if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement
        todo.classList.toggle("completed")
    }
}

function filter (event) {
    const todos=todoList.childNodes;
    todos.forEach(function(todo) {
        switch(event.target.value){
            case "All" :
                todo.style.display = "flex"
                break;
            case "Completed" :
                if (todo.classList.contains("completed")){
                    todo.style.display = "flex" 
                } else {
                    todo.style.display = "none"
                }
                break;
            case "Uncompleted" :
                if (todo.classList.contains("completed")){
                    todo.style.display = "none" 
                } else {
                    todo.style.display = "flex"
                }
                break;
        }
    })
}

function saveLocalTodo (todo){
    let saving ;
    if (localStorage.getItem("todos") === null){
      saving = [];
    } else {
        saving = JSON.parse(localStorage.getItem("todos"))
    }
    saving.push(todo);
    localStorage.setItem("todos", JSON.stringify(saving))
}

function removeLocalTodo (todo) {
    let saving ;
    if (localStorage.getItem("todos") === null){
      saving = [];
    } else {
        saving = JSON.parse(localStorage.getItem("todos"))
    }
    const todoIndex = todo.children[0].innerText;
    saving.splice(saving.indexOf(todoIndex), 1);
    localStorage.setItem("todos" , JSON.stringify(saving))

}

function getTodo(){
    let saving ;
    if (localStorage.getItem("todos") === null){
      saving = [];
    } else {
         saving = JSON.parse(localStorage.getItem("todos"))
        }
     saving.forEach(function(todo){
            const todoDiv = document.createElement("div")
            todoDiv.classList.add("todo")
        
            const li = document.createElement("li")
            li.classList.add("list-item")
            todoDiv.appendChild(li)
            todoList.appendChild(todoDiv)
            li.innerText = todo;
        
            const completebutton = document.createElement("button");
            completebutton.innerHTML="<i class='fas fa-check'></i>"
            completebutton.classList.add("complete-btn")
            todoDiv.appendChild(completebutton)
        
            const trashbutton = document.createElement("button")
            trashbutton.innerHTML="<i class='fas fa-trash'></i>";
            trashbutton.classList.add("trash-btn");
            todoDiv.appendChild(trashbutton)
            
        })
    }





