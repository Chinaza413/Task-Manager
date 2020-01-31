//Define UI VARS
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');


//Load ALL eventlisteners
loadEventListeners();

function loadEventListeners(){
    //DOM load event
    document.addEventListener('DOMContentLoaded', getTasks);
    //add task event
    form.addEventListener('submit', addTask);
    //remove task event
    taskList.addEventListener('click', removeTask);
    //clear tasks event
    clearBtn.addEventListener('click', clearTasks);
    //filterr task event
    filter.addEventListener('keyup', filterTasks);
}

//Get Tasks
function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){

        //Create Li ELement
        const li = document.createElement('li');
        //Add Class
        li.className = 'collection-item';
        //Create TextNode and append to Li
        li.appendChild(document.createTextNode(task));
        // Create new Link Element 
        const link = document.createElement('a');
        //Add Class to link
        link.className = 'delete-item secondary-content';
        // Add icon Html
        link.innerHTML = '<i class="fa fa-remove"></i>';
        //Append the link to Li
        li.appendChild(link);
        //Append Li to UL
        taskList.appendChild(li);
    });
}

// Add Task
function addTask(e) {

    if(taskInput.value === '') {
        alert('Add A Task');
    }


    //Create Li ELement
    const li = document.createElement('li');
    //Add Class
    li.className = 'collection-item';
    //Create TextNode and append to Li
    li.appendChild(document.createTextNode(taskInput.value));
    // Create new Link Element 
    const link = document.createElement('a');
    //Add Class to link
    link.className = 'delete-item secondary-content';
    // Add icon Html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    //Append the link to Li
    li.appendChild(link);
    //Append Li to UL
    taskList.appendChild(li);

    //sstore task in local storage
    storeTaskInLocalStorage(taskInput.value);

    //Clear Input
    taskInput.value = '';

    e.preventDefault();
}

//store task
function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//remove task
function removeTask(e) {
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are you sure?')){
            e.target.parentElement.parentElement.remove();


            //remove from LS
            removeTaskFromLOcalStorage
            (e.target.parentElement.parentElement);
            
        }
    }
}


//remove from ls
function removeTaskFromLOcalStorage(taskItem) {
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
        if(taskItem.textContent === task){
            task.splice(index, 1);
        }
    })

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//clear tasks
function clearTasks(){
    // taskList.innerHTML = '';

    //Faster Method
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }

    //clear task
    clearTasksFromLOcalStorage();
}


//clear tasks from ls
function clearTasksFromLOcalStorage(){
    localStorage.clear();
}


//filter tasks
function filterTasks(e) {
    const text = e.target.value.toLowerCase();
  
    document.querySelectorAll('.collection-item').forEach(function(task){
      const item = task.firstChild.textContent;
      if(item.toLowerCase().indexOf(text) != -1){
        task.style.display = 'block';
      } else {
        task.style.display = 'none';
      }
    });
  }