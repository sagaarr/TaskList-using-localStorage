const taskList = document.querySelector('.collection');
const clearbtn = document.querySelector('.clear-task');
const form = document.querySelector('#task-form');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// add all events listeners // Here limiting the eventListener scope from global to function 
loadEventListener();

// Load all eventListener 
function loadEventListener(){
  // Load all events when we openUp the browser 
  document.addEventListener('DOMContentLoaded', getTasks);
  // add task event 
  form.addEventListener('submit', addTask);
  // remove task 
  taskList.addEventListener('click', removeTask);
  // clear all task at once 
  clearbtn.addEventListener('click', clearAll);
  // filter task events 
  filter.addEventListener('keyup', filterList);
}

function getTasks(){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  };
  
  tasks.forEach(function(task){
    // create a li element 
    const li = document.createElement('li');
    // Add a class 
    li.className = 'collection-item';
    // Create a text node and append it to li 
    li.appendChild(document.createTextNode(task)); // li.innerHTML = taskInput.value;

    // create a new link element 
    const link = document.createElement('a');
    // Add the class 
    link.className = "delete-item secondary-content";
    //  Add a Icon 
    link.innerHTML = '<i class="fa fa-remove"></i>'
    // Append the link to li 
    li.appendChild(link);
    // append li to ul 
    taskList.appendChild(li);
  })
}

function addTask(e){
if(taskInput.value === ''){
  alert('Put some task ');
}
// create a li element 
const li = document.createElement('li');
// Add a class 
li.className = 'collection-item';
// Create a text node and append it to li 
li.appendChild(document.createTextNode(taskInput.value)); // li.innerHTML = taskInput.value;

// create a new link element 
const link = document.createElement('a');
// Add the class 
link.className = "delete-item secondary-content";
//  Add a Icon 
link.innerHTML = '<i class="fa fa-remove"></i>'
// Append the link to li 
li.appendChild(link);
// append li to ul 
taskList.appendChild(li);
// store in localStorage 
storeTaskInLocalStorage(taskInput.value);
// clear input 
taskInput.value = " ";

 e.preventDefault()
}

// LocalStorage 
function storeTaskInLocalStorage(task){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  };
  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTask(e){
 
  if(e.target.parentElement.classList.contains('delete-item')){
    if(confirm('Are You Shure ?')){
      e.target.parentElement.parentElement.remove();
      // remove From LS 
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

function removeTaskFromLocalStorage(taskItem){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  };

  tasks.forEach(function(task, index){
    if(taskItem.textContent === task){
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
function clearAll(){
  // taskList.innerHTML = "";


  // if(confirm('are You Shure all task will be Gone !!')){
  //   taskList.removeChild();
  // }

  // This is faster method 
  while(taskList.firstChild){
      taskList.removeChild(taskList.firstChild);
  }

  ClearTaskFromLocalStorage();
  
}

function ClearTaskFromLocalStorage(){
  localStorage.clear();
}

function filterList(e){
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(function(tasks){
    // The indexOf() method returns the first index at which a given element can be found in the array, or -1 if it is not present.
    const item = tasks.firstChild.textContent;
    if(item.toLowerCase().indexOf(text) != -1){
      tasks.style.display = 'block';

    }else{
      tasks.style.display = 'none';
    }
  })
}








