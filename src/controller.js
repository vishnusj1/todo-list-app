import Projects from './projects';
import todo from './todo';
import TodoList from './index';

const Controller = (() => {
  document.addEventListener('DOMContentLoaded', (e) => {
    const projectAddBtn = document.querySelector('#add-btn');
    projectAddBtn.addEventListener('click', addProject);

    const form = document.querySelector('.add-task');

    const taskInput = document.querySelector('#task-input');
    taskInput.addEventListener('click', function (e) {
      toggleTaskInput(form);
    });

    const addTaskBtn = document.querySelector('#add-task-btn');
    addTaskBtn.addEventListener('click', addTask);

    loadInbox();
    initProjectButtons();
  });

  function loadInbox() {
    const project = TodoList.getInbox();
    const task1 = todo('A Task', '12-12-2000', 'This is task description', 2);
    const task2 = todo('Another Task', '12-12-2000', 'This is task description', 1);
    TodoList.addTask(project, task1);
    TodoList.addTask(project, task2);
    loadProject(project);
  }

  function loadProject(project) {
    const title = document.querySelector('.todo-list-header > h2');
    title.textContent = project.getName();
    loadTasks(project);
  }

  function loadTasks(project) {
    clearList();
    const tasks = project.getTasks();
    tasks.forEach((task) => {
      populateTaskList(task);
    });
    handleTask();
  }

  function initProjectButtons() {
    const defaultProjects = document.querySelector('.default-projects');
    const userProjects = document.querySelector('.custom-projects');

    defaultProjects.addEventListener('click', (e) => {
      if (e.target.classList.contains('default-project')) {
        openProject(e);
      }
    });
    userProjects.addEventListener('click', (e) => {
      if (e.target.classList.contains('user-project')) {
        openProject(e);
      }
    });
  }

  function openProject(e) {
    const projectName = e.target.textContent;
    const project = TodoList.getProject(projectName);
    loadProject(project);
  }

  function addProject() {
    const input = document.querySelector('#project-name');
    const projectName = input.value;
    const project = Projects(projectName);

    if (TodoList.getProject(projectName)) {
      alert(`${projectName} already exists.`);
      return (input.value = '');
    }

    if (!projectName) {
      return alert('Enter a name for project');
    }

    TodoList.addProject(project);
    populateProjectList(project);
    input.value = '';
  }

  function getProject() {
    const projectName = document.querySelector('.todo-list-header > h2').textContent;
    const project = TodoList.getProject(projectName);
    return project;
  }

  function populateProjectList(project) {
    const list = document.querySelector('.custom-projects');
    const listItem = document.createElement('li');
    const projectName = project.getName();
    const form = document.querySelector('.list-form');
    listItem.setAttribute('id', `project-${projectName.toLowerCase()}`);
    listItem.classList.add('list-item', 'user-project');
    listItem.textContent = projectName;
    list.insertBefore(listItem, form);
  }

  function toggleTaskInput(form) {
    if (form.classList.contains('active')) {
      form.classList.remove('active');
    } else {
      form.classList.add('active');
    }
  }

  function addTask() {
    const form = document.querySelector('.add-task');
    const titleInput = document.querySelector('#task-name');
    const descInput = document.querySelector('#task-desc');
    const date = document.querySelector('#due-date');
    const priorityInput = document.querySelector('#priority');

    const title = titleInput.value;
    const description = descInput.value;
    const dueDate = date.value;
    const priotiy = priorityInput.value;

    const task = todo(title, dueDate, description, priotiy);
    const project = getProject();

    if (!title) {
      alert('Enter a title');
      return;
    }

    toggleTaskInput(form);
    titleInput.value = '';
    descInput.value = '';
    priorityInput.value = '';
    date.value = '';
    TodoList.addTask(project, task);
    loadTasks(project);
  }

  function clearList() {
    const list = document.querySelector('.task-list');
    list.innerHTML = '';
  }

  function populateTaskList(task) {
    const taskList = document.querySelector('.task-list');
    const item = document.createElement('li');
    item.classList.add(`task-item`);
    const html = `
                        <input class="task-button" type="checkbox">
                            <p class="task-title">${task.getTitle()}</p>
                            <p class="task-date">${task.getDate()}</p>
                            <div class="task-options">
                                <div class="edit-btn">&#x270E;</div>
                                <div class="delete-btn">&times;</div>
                            </div>
                    `;
    item.innerHTML = html;
    handleCheck(task, item);
    taskList.appendChild(item);
  }

  function handleCheck(task, item) {
    const checkbox = item.querySelector('input[type=checkbox]');
    if (task.getStatus() === true) {
      checkbox.checked = true;
      item.classList.add('checked');
    } else {
      checkbox.checkbox = false;
      item.classList.remove('checked');
    }
  }

  function handleTask() {
    const list = document.querySelectorAll('.task-item');
    list.forEach((item) => {
      item.addEventListener('click', (e) => {
        if (e.target.classList.contains('edit-btn')) {
          handleEditTask(item);
        } else if (e.target.classList.contains('delete-btn')) {
          deleteTask(item);
        } else if (e.target.classList.contains('task-button')) {
          updateStatus(item);
        } else {
          expandTaskModal(e, item);
        }
      });
    });
  }

  function getTask(item) {
    const taskTitle = item.querySelector('.task-title').textContent;
    const project = getProject();
    const task = project.getTask(taskTitle);
    return task;
  }

  function updateStatus(item) {
    const task = getTask(item);
    const project = getProject();
    task.updateStatus();
    loadTasks(project);
  }

  function handleEditTask(item) {
    const list = document.querySelector('.task-list');
    const form = document.querySelector('.edit-task');
    const saveBtn = form.querySelector('.edit-task-btn');
    const title = form.querySelector('#name');
    const desc = form.querySelector('#desc');
    const date = form.querySelector('#due');
    const priority = form.querySelector('#pri');
    const task = getTask(item);

    title.value = task.getTitle();
    desc.value = task.getDesc();
    date.value = task.getDate();
    priority.value = task.getPriority();

    list.insertBefore(form, item);
    list.removeChild(item);
    toggleTaskInput(form);
    saveBtn.addEventListener('click', function (e) {
      updateTask(item);
    });
  }

  function updateTask(item) {
    const container = document.querySelector('.todo-list-body');
    const form = document.querySelector('.edit-task');
    const title = form.querySelector('#name');
    const description = form.querySelector('#desc');
    const date = form.querySelector('#due');
    const priority = form.querySelector('#pri');
    const project = getProject();
    const task = getTask(item);
    task.setTitle(title.value);
    task.setDate(date.value);
    task.setDesc(description.value);
    task.setPriority(priority.value);

    toggleTaskInput(form);
    container.appendChild(form);
    loadProject(project);
  }

  function deleteTask(item) {
    const taskTitle = item.querySelector('.task-title').textContent;
    const project = getProject();
    const task = project.getTask(taskTitle);
    TodoList.removeTask(project, task);
    loadTasks(project);
  }

  function expandTaskModal(e, item) {
    const modalTask = document.querySelector('.task-expand-modal');
    const modalOverlay = document.querySelector('.modal-overlay');
    populateTaskModal(modalTask, item);
    if (e.target.classList.contains('task-item') || e.target.classList.contains('task-title')) {
      modalOverlay.classList.add('active');
      modalTask.classList.add('expand');
    }
    const closeTaskModal = document.querySelector('.close-btn');
    closeTaskModal.addEventListener('click', function (e) {
      collapseTaskModal(modalOverlay, modalTask);
    });
  }

  function populateTaskModal(modalTask, item) {
    const task = getTask(item);
    const html = `
                        <div class="modal-container">
                            <div class="modal-heading">
                                <div class="title" id="modal-title"><h3>${task.getTitle()}</h3></div>
                                <div class="close-btn">&times;</div>
                            </div>
                            <div class="modal-body">
                                <div class="description">${
                                  task.getDesc() === undefined ? '' : task.getDesc()
                                }</div>
                                <div class="task-date">${task.getDate()}</div>
                            </div>
                        </div>
                    `;
    modalTask.innerHTML = html;
    return modalTask;
  }

  function collapseTaskModal(modalOverlay, modalTask) {
    modalOverlay.classList.remove('active');
    modalTask.classList.remove('expand');
  }
})();

export default Controller;
