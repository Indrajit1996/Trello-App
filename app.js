const trash = "https://image.flaticon.com/icons/svg/1214/1214428.svg"

document.getElementById('add-lane').addEventListener('click', function() {
    let taskValue = document.getElementById('task-value').value;
    if (taskValue) addLane(taskValue);
    document.getElementById('task-value').value = '';
});
document.getElementById('add-task-1').addEventListener('click', function() {
    let taskValue = document.getElementById('task-value-1').value;
    if (taskValue) addTask(taskValue, 'tasks-added-backlog');
    document.getElementById('task-value-1').value = '';
});
document.getElementById('add-task-2').addEventListener('click', function() {
    let taskValue = document.getElementById('task-value-2').value;
    if (taskValue) addTask(taskValue, 'tasks-added-todo');
    document.getElementById('task-value-2').value = '';
});
document.getElementById('remove-lane-1').addEventListener('click', function() {
    let node = document.getElementById('remove-lane-1').parentNode.parentNode;
    let parent = node.parentNode;
    parent.removeChild(node);
});
document.getElementById('remove-lane-2').addEventListener('click', function() {
    let node = document.getElementById('remove-lane-2').parentNode.parentNode;
    let parent = node.parentNode;
    parent.removeChild(node);
});


var count = 5;
var count_lane = 5;
const addTask = (taskValue, parentNode) => {
    let task = document.createElement('li');
    task.classList.add('task');
    task.classList.add('fill');
    task.setAttribute("draggable", "true");
    task.addEventListener('dragstart', dragStart);
    task.addEventListener('dragend', dragEnd);

    let taskContent = document.createElement('div');
    taskContent.classList.add('task-content');
    taskContent.innerText = taskValue;
    
    let trash = document.createElement('div');
    trash.classList.add('trash');
    trash.innerText = "X";
    trash.addEventListener('click', removeTask);

    task.appendChild(taskContent);
    task.appendChild(trash);

    let tasks = document.getElementById(parentNode);
    tasks.insertBefore(task, tasks.childNodes[0]);
}


const addLane = (title) => {
    let task = document.createElement('div');
    task.classList.add('column');
    task.classList.add('dropzone');
    task.classList.add('col-dropzone');

    let taskContent = document.createElement('h3');
    taskContent.classList.add('column-title');
    taskContent.innerText = title;

    let spanDelete = document.createElement('span');
    spanDelete.setAttribute('class', 'exit-lane');
    spanDelete.setAttribute('id', `remove-lane-${count_lane}`);
    spanDelete.innerText = 'x';
    spanDelete.addEventListener('click', deleteButton);
    taskContent.appendChild(spanDelete);
    count_lane++;

    let createUl = document.createElement('ul');
    createUl.classList.add('tasks');
    createUl.setAttribute('id',`tasks-added-${count}`);

    let addElement = document.createElement('div');
    addElement.classList.add('lane-add');

    let inputElement = document.createElement('input');
    inputElement.setAttribute('placeholder', 'Add Task');
    inputElement.setAttribute('id',`tasks-value-${count}`);

    let button  = document.createElement('BUTTON');
    button.setAttribute('id',`add-task-${count}`);
    button.innerHTML = '+';
    button.addEventListener('click', addButton);

    addElement.appendChild(inputElement);
    addElement.appendChild(button);

    task.appendChild(taskContent);
    task.appendChild(createUl);
    task.appendChild(addElement);

    let columns = document.getElementById('columns');
    columns.appendChild(task);

    count++;
}

function addButton(e) {
    let value = e.path[2].lastElementChild.children[0].value;
    let parentNode = e.path[2].children[1].id;
    if(value && value.trim()) {
        addTask(value, parentNode);
        e.path[2].lastElementChild.children[0].value = '';
    }
}

function deleteButton(e) {
    let id = e.path[2].children[1].id;
    let node = document.getElementById(id).parentNode;
    let parent = node.parentNode;
    parent.removeChild(node);
}

const removeTask = (event) => {
    let tasks = event.target.parentNode.parentNode;
    let task = event.target.parentNode;
    tasks.removeChild(task);
}


// DRAG & DROP

const dragStart = (event) => {
    event.target.className += ' hold';
    task = event.target;
    setTimeout(() => (event.target.className = 'invisible'), 0);
}

const dragEnd = (event) => {    
    event.target.className = 'task fill';
}

let dropzones = document.querySelectorAll('.dropzone');

const dragEnter = (event) => {
    event.preventDefault();
    if(event.target.className === "column dropzone") {
        event.target.className += ' hovered';   
    }
}

const dragOver = (event) => {
    event.preventDefault();
}

const dragLeave = (event) => {
    if(event.target.className === "column dropzone hovered") {
        event.target.className = "column dropzone"
    }
}

const dragDrop = (event) => {
    if(event.target.className === "column dropzone hovered") {
        event.target.className = "column dropzone"
    }
    event.target.append(task);
}

for(let dropzone of dropzones) {
    dropzone.addEventListener('dragenter', dragEnter);
    dropzone.addEventListener('dragover', dragOver);
    dropzone.addEventListener('dragleave', dragLeave);
    dropzone.addEventListener('drop', dragDrop);
}
