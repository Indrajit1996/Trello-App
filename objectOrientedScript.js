const trash = "https://image.flaticon.com/icons/svg/1214/1214428.svg";
class TrelloBoard {
  constructor(elem) {
    this.elem = elem;
    elem.onclick = this.onClick.bind(this); // (*)
    this.task = null;
    this.lane_count = 5;
    this.task_count = 5;
  }

  addLane = (event) => {
    let value = event.parentNode.children[0].value;
    if(value && value.trim()) {
      this.createLane(value);
    }
    event.parentNode.children[0].value = '';
  }

  createLane = (title) => {
    let task = document.createElement('div');
    task.classList.add('column');
    task.classList.add('dropzone');
    task.classList.add('col-dropzone');

    let taskContent = document.createElement('h3');
    taskContent.classList.add('column-title');
    taskContent.innerText = title;

    let spanDelete = document.createElement('span');
    spanDelete.setAttribute('class', 'exit-lane');
    spanDelete.setAttribute('id', `remove-lane-${this.lane_count}`);
    spanDelete.innerText = 'x';
    spanDelete.addEventListener('click', this.deleteLane);
    taskContent.appendChild(spanDelete);
    this.lane_count++;

    let createUl = document.createElement('ul');
    createUl.classList.add('tasks');
    createUl.setAttribute('id',`tasks-added-${this.task_count}`);

    let addElement = document.createElement('div');
    addElement.classList.add('lane-add');

    let inputElement = document.createElement('input');
    inputElement.setAttribute('placeholder', 'Add Task');
    inputElement.setAttribute('id',`task-value-${this.task_count}`);

    let button  = document.createElement('BUTTON');
    button.setAttribute('id',`add-task-${this.task_count}`);
    button.innerHTML = '+';
    button.addEventListener('click', this.setTaskAttributes);

    addElement.appendChild(inputElement);
    addElement.appendChild(button);

    task.addEventListener('dragstart', this.dragStart);
    task.addEventListener('dragend', this.dragEnd);

    task.appendChild(taskContent);
    task.appendChild(createUl);
    task.appendChild(addElement);
    this.addDropListners();

    let columns = document.getElementById('columns');
    columns.appendChild(task);

    this.task_count++;
  }

  deleteLane = (event) => {
    let id = event.path[2].children[1].id;
    let node = document.getElementById(id).parentNode;
    let parent = node.parentNode;
    parent.removeChild(node);
  }

  addTask = (event) => {
    let value = event.parentNode.children[0].value;
    let childId = event.parentNode.parentNode.children[1].id;
    if(value && value.trim()) {
      this.createTaskCard(value, childId);
    }
    event.parentNode.children[0].value = '';
  }

  setTaskAttributes = (event) => {
    let value = event.path[2].lastElementChild.children[0].value;
    let parentNode = event.path[2].children[1].id;
    if(value && value.trim()) {
      this.createTaskCard(value, parentNode);
      event.path[2].lastElementChild.children[0].value = '';
    }
  }

  addDropListners = () => {
    let dropzones = document.querySelectorAll('.dropzone');
    console.log(dropzones);
    for(let dropzone of dropzones) {
      dropzone.addEventListener('dragenter', this.dragEnter);
      dropzone.addEventListener('dragover', this.dragOver);
      dropzone.addEventListener('dragleave', this.dragLeave);
      dropzone.addEventListener('drop', this.dragDrop);
    }
  }

  createTaskCard = (taskValue, parentNode) => {
    let task = document.createElement('li');
    task.classList.add('task');
    task.classList.add('fill');
    task.setAttribute("draggable", "true");
    task.addEventListener('dragstart', this.dragStart);
    task.addEventListener('dragend', this.dragEnd);

    let taskContent = document.createElement('div');
    taskContent.classList.add('task-content');
    taskContent.innerText = taskValue;
    
    let trash = document.createElement('div');
    trash.classList.add('trash');
    trash.innerText = "X";
    trash.addEventListener('click', this.removeTaskCard);

    task.appendChild(taskContent);
    task.appendChild(trash);

    let tasks = document.getElementById(parentNode);
    tasks.insertBefore(task, tasks.childNodes[0]);
    this.addDropListners();
  }

  removeTaskCard = (event) => {
    let tasks = event.target.parentNode.parentNode;
    let task = event.target.parentNode;
    tasks.removeChild(task);
  }


  onClick = (event) => {
    let { target } = event;
    if(target.tagName === 'BUTTON') {
      if(target.id === 'add-lane') {
        this.addLane(target);
      } else {
        this.addTask(target);
      }
    }
    if(target.tagName === 'SPAN' && event.target.classList[0] === 'exit-lane') {
      this.deleteLane(event);
    }
  };

  dragStart = (event) => {
    event.target.className += ' hold';
    this.task = event.target;
    setTimeout(() => (event.target.className = 'invisible'), 0);
  }

  dragEnd = (event) => {    
    event.target.className = 'task fill';
  }

  dragEnter = (event) => {
    event.preventDefault();
    if(event.target.className === "column dropzone") {
        event.target.className += ' hovered';   
    }
  }

  dragOver = (event) => {
    event.preventDefault();
  }

  dragLeave = (event) => {
    if(event.target.className === "column dropzone hovered") {
      event.target.className = "column dropzone"
    }
  }

  dragDrop = (event) => {
    if(event.target.className === "column dropzone hovered") {
      event.target.className = "column dropzone"
    }
    event.target.append(this.task);
  }
}

var lane =  new TrelloBoard(app);