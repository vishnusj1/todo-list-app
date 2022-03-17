/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/controller.js":
/*!***************************!*\
  !*** ./src/controller.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _projects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./projects */ "./src/projects.js");
/* harmony import */ var _todo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./todo */ "./src/todo.js");
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index */ "./src/index.js");




var Controller = function () {
  document.addEventListener('DOMContentLoaded', function (e) {
    var projectAddBtn = document.querySelector('#add-btn');
    projectAddBtn.addEventListener('click', addProject);
    var form = document.querySelector('.add-task');
    var taskInput = document.querySelector('#task-input');
    taskInput.addEventListener('click', function (e) {
      toggleTaskInput(form);
    });
    var addTaskBtn = document.querySelector('#add-task-btn');
    addTaskBtn.addEventListener('click', addTask);
    loadInbox();
    initProjectButtons();
  });

  function loadInbox() {
    var project = _index__WEBPACK_IMPORTED_MODULE_2__["default"].getInbox();
    var task1 = (0,_todo__WEBPACK_IMPORTED_MODULE_1__["default"])('A Task', '12-12-2000', 'This is task description', 2);
    var task2 = (0,_todo__WEBPACK_IMPORTED_MODULE_1__["default"])('Another Task', '12-12-2000', 'This is task description', 1);
    _index__WEBPACK_IMPORTED_MODULE_2__["default"].addTask(project, task1);
    _index__WEBPACK_IMPORTED_MODULE_2__["default"].addTask(project, task2);
    loadProject(project);
  }

  function loadProject(project) {
    var title = document.querySelector('.todo-list-header > h2');
    title.textContent = project.getName();
    loadTasks(project);
  }

  function loadTasks(project) {
    clearList();
    var tasks = project.getTasks();
    tasks.forEach(function (task) {
      populateTaskList(task);
    });
    handleTask();
  }

  function initProjectButtons() {
    var defaultProjects = document.querySelector('.default-projects');
    var userProjects = document.querySelector('.custom-projects');
    defaultProjects.addEventListener('click', function (e) {
      if (e.target.classList.contains('default-project')) {
        openProject(e);
      }
    });
    userProjects.addEventListener('click', function (e) {
      if (e.target.classList.contains('user-project')) {
        openProject(e);
      }
    });
  }

  function openProject(e) {
    var projectName = e.target.textContent;
    var project = _index__WEBPACK_IMPORTED_MODULE_2__["default"].getProject(projectName);
    loadProject(project);
  }

  function addProject() {
    var input = document.querySelector('#project-name');
    var projectName = input.value;
    var project = (0,_projects__WEBPACK_IMPORTED_MODULE_0__["default"])(projectName);

    if (_index__WEBPACK_IMPORTED_MODULE_2__["default"].getProject(projectName)) {
      alert("".concat(projectName, " already exists."));
      return input.value = '';
    }

    if (!projectName) {
      return alert('Enter a name for project');
    }

    _index__WEBPACK_IMPORTED_MODULE_2__["default"].addProject(project);
    populateProjectList(project);
    input.value = '';
  }

  function getProject() {
    var projectName = document.querySelector('.todo-list-header > h2').textContent;
    var project = _index__WEBPACK_IMPORTED_MODULE_2__["default"].getProject(projectName);
    return project;
  }

  function populateProjectList(project) {
    var list = document.querySelector('.custom-projects');
    var listItem = document.createElement('li');
    var projectName = project.getName();
    var form = document.querySelector('.list-form');
    listItem.setAttribute('id', "project-".concat(projectName.toLowerCase()));
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
    var form = document.querySelector('.add-task');
    var titleInput = document.querySelector('#task-name');
    var descInput = document.querySelector('#task-desc');
    var date = document.querySelector('#due-date');
    var priorityInput = document.querySelector('#priority');
    var title = titleInput.value;
    var description = descInput.value;
    var dueDate = date.value;
    var priotiy = priorityInput.value;
    var task = (0,_todo__WEBPACK_IMPORTED_MODULE_1__["default"])(title, dueDate, description, priotiy);
    var project = getProject();

    if (!title) {
      alert('Enter a title');
      return;
    }

    toggleTaskInput(form);
    titleInput.value = '';
    descInput.value = '';
    priorityInput.value = '';
    date.value = '';
    _index__WEBPACK_IMPORTED_MODULE_2__["default"].addTask(project, task);
    loadTasks(project);
  }

  function clearList() {
    var list = document.querySelector('.task-list');
    list.innerHTML = '';
  }

  function populateTaskList(task) {
    var taskList = document.querySelector('.task-list');
    var item = document.createElement('li');
    item.classList.add("task-item");
    var html = "\n                        <input class=\"task-button\" type=\"checkbox\">\n                            <p class=\"task-title\">".concat(task.getTitle(), "</p>\n                            <p class=\"task-date\">").concat(task.getDate(), "</p>\n                            <div class=\"task-options\">\n                                <div class=\"edit-btn\">&#x270E;</div>\n                                <div class=\"delete-btn\">&times;</div>\n                            </div>\n                    ");
    item.innerHTML = html;
    handleCheck(task, item);
    taskList.appendChild(item);
  }

  function handleCheck(task, item) {
    var checkbox = item.querySelector('input[type=checkbox]');

    if (task.getStatus() === true) {
      checkbox.checked = true;
      item.classList.add('checked');
    } else {
      checkbox.checkbox = false;
      item.classList.remove('checked');
    }
  }

  function handleTask() {
    var list = document.querySelectorAll('.task-item');
    list.forEach(function (item) {
      item.addEventListener('click', function (e) {
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
    var taskTitle = item.querySelector('.task-title').textContent;
    var project = getProject();
    var task = project.getTask(taskTitle);
    return task;
  }

  function updateStatus(item) {
    var task = getTask(item);
    var project = getProject();
    task.updateStatus();
    loadTasks(project);
  }

  function handleEditTask(item) {
    var list = document.querySelector('.task-list');
    var form = document.querySelector('.edit-task');
    var saveBtn = form.querySelector('.edit-task-btn');
    var title = form.querySelector('#name');
    var desc = form.querySelector('#desc');
    var date = form.querySelector('#due');
    var priority = form.querySelector('#pri');
    var task = getTask(item);
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
    var container = document.querySelector('.todo-list-body');
    var form = document.querySelector('.edit-task');
    var title = form.querySelector('#name');
    var description = form.querySelector('#desc');
    var date = form.querySelector('#due');
    var priority = form.querySelector('#pri');
    var project = getProject();
    var task = getTask(item);
    task.setTitle(title.value);
    task.setDate(date.value);
    task.setDesc(description.value);
    task.setPriority(priority.value);
    toggleTaskInput(form);
    container.appendChild(form);
    loadProject(project);
  }

  function deleteTask(item) {
    var taskTitle = item.querySelector('.task-title').textContent;
    var project = getProject();
    var task = project.getTask(taskTitle);
    _index__WEBPACK_IMPORTED_MODULE_2__["default"].removeTask(project, task);
    loadTasks(project);
  }

  function expandTaskModal(e, item) {
    var modalTask = document.querySelector('.task-expand-modal');
    var modalOverlay = document.querySelector('.modal-overlay');
    populateTaskModal(modalTask, item);

    if (e.target.classList.contains('task-item') || e.target.classList.contains('task-title')) {
      modalOverlay.classList.add('active');
      modalTask.classList.add('expand');
    }

    var closeTaskModal = document.querySelector('.close-btn');
    closeTaskModal.addEventListener('click', function (e) {
      collapseTaskModal(modalOverlay, modalTask);
    });
  }

  function populateTaskModal(modalTask, item) {
    var task = getTask(item);
    var html = "\n                        <div class=\"modal-container\">\n                            <div class=\"modal-heading\">\n                                <div class=\"title\" id=\"modal-title\"><h3>".concat(task.getTitle(), "</h3></div>\n                                <div class=\"close-btn\">&times;</div>\n                            </div>\n                            <div class=\"modal-body\">\n                                <div class=\"description\">").concat(task.getDesc() === undefined ? '' : task.getDesc(), "</div>\n                                <div class=\"task-date\">").concat(task.getDate(), "</div>\n                            </div>\n                        </div>\n                    ");
    modalTask.innerHTML = html;
    return modalTask;
  }

  function collapseTaskModal(modalOverlay, modalTask) {
    modalOverlay.classList.remove('active');
    modalTask.classList.remove('expand');
  }
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Controller);

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _projects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./projects */ "./src/projects.js");
/* harmony import */ var _controller__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./controller */ "./src/controller.js");



var TodoList = function () {
  var projects = [];
  projects.push((0,_projects__WEBPACK_IMPORTED_MODULE_0__["default"])('Inbox'));
  projects.push((0,_projects__WEBPACK_IMPORTED_MODULE_0__["default"])('Today'));
  projects.push((0,_projects__WEBPACK_IMPORTED_MODULE_0__["default"])('Upcoming'));
  projects.push((0,_projects__WEBPACK_IMPORTED_MODULE_0__["default"])('Default'));

  var _inbox = getProject('Inbox');

  var _defaultProject = getProject('Default');

  function getInbox() {
    return _inbox;
  }

  function getDefault() {
    return _defaultProject;
  }

  function getProjects() {
    return projects;
  }

  function getProject(name) {
    return projects.find(function (project) {
      return project.getName() === name;
    });
  }

  function addProject(project) {
    projects.push(project);
  }

  function addTask(project, task) {
    project.addTask(task);
  }

  function removeTask(project, task) {
    project.removeTask(task);
  }

  return {
    getInbox: getInbox,
    getDefault: getDefault,
    getProjects: getProjects,
    getProject: getProject,
    addProject: addProject,
    addTask: addTask,
    removeTask: removeTask
  };
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TodoList);

/***/ }),

/***/ "./src/projects.js":
/*!*************************!*\
  !*** ./src/projects.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _readOnlyError(name) { throw new TypeError("\"" + name + "\" is read-only"); }

var Projects = function Projects(name) {
  var _name = name;
  var _tasks = [];

  var getIndex = function getIndex(name) {
    return _tasks.findIndex(function (task) {
      return task.getTitle() === name;
    });
  };

  var getName = function getName() {
    return _name;
  };

  var setName = function setName(name) {
    return name, _readOnlyError("_name");
  };

  var getTasks = function getTasks() {
    return _tasks;
  };

  var getTask = function getTask(name) {
    return _tasks.find(function (task) {
      return task.getTitle() === name;
    });
  };

  var addTask = function addTask(task) {
    _tasks.push(task);
  };

  var removeTask = function removeTask(task) {
    return _tasks = _tasks.filter(function (todo) {
      return todo.getTitle() !== task.getTitle();
    });
  };

  return {
    getIndex: getIndex,
    getName: getName,
    setName: setName,
    getTasks: getTasks,
    getTask: getTask,
    addTask: addTask,
    removeTask: removeTask
  };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Projects);

/***/ }),

/***/ "./src/todo.js":
/*!*********************!*\
  !*** ./src/todo.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var todo = function todo(title, dueDate, description, prioritiy) {
  var _status = false;

  var getStatus = function getStatus() {
    return _status;
  };

  var updateStatus = function updateStatus() {
    _status = !_status;
  };

  var getTitle = function getTitle() {
    return title;
  };

  var setTitle = function setTitle(value) {
    return title = value;
  };

  var getDesc = function getDesc() {
    return description;
  };

  var setDesc = function setDesc(value) {
    return description = value;
  };

  var getDate = function getDate() {
    return dueDate;
  };

  var setDate = function setDate(value) {
    return dueDate = value;
  };

  var getPriority = function getPriority() {
    return prioritiy;
  };

  var setPriority = function setPriority(value) {
    return prioritiy = value;
  };

  return {
    getStatus: getStatus,
    updateStatus: updateStatus,
    getTitle: getTitle,
    setTitle: setTitle,
    getDesc: getDesc,
    setDesc: setDesc,
    getDate: getDate,
    setDate: setDate,
    getPriority: getPriority,
    setPriority: setPriority
  };
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (todo);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Ly90b2RvLWxpc3QtYXBwLy4vc3JjL2NvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0LWFwcC8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QtYXBwLy4vc3JjL3Byb2plY3RzLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC1hcHAvLi9zcmMvdG9kby5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QtYXBwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8tbGlzdC1hcHAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG8tbGlzdC1hcHAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvLWxpc3QtYXBwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kby1saXN0LWFwcC93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL3RvZG8tbGlzdC1hcHAvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL3RvZG8tbGlzdC1hcHAvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQcm9qZWN0cyBmcm9tICcuL3Byb2plY3RzJztcbmltcG9ydCB0b2RvIGZyb20gJy4vdG9kbyc7XG5pbXBvcnQgVG9kb0xpc3QgZnJvbSAnLi9pbmRleCc7XG5cbmNvbnN0IENvbnRyb2xsZXIgPSAoKCkgPT4ge1xuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKGUpID0+IHtcbiAgICBjb25zdCBwcm9qZWN0QWRkQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FkZC1idG4nKTtcbiAgICBwcm9qZWN0QWRkQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYWRkUHJvamVjdCk7XG5cbiAgICBjb25zdCBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFkZC10YXNrJyk7XG5cbiAgICBjb25zdCB0YXNrSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGFzay1pbnB1dCcpO1xuICAgIHRhc2tJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICB0b2dnbGVUYXNrSW5wdXQoZm9ybSk7XG4gICAgfSk7XG5cbiAgICBjb25zdCBhZGRUYXNrQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2FkZC10YXNrLWJ0bicpO1xuICAgIGFkZFRhc2tCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhZGRUYXNrKTtcblxuICAgIGxvYWRJbmJveCgpO1xuICAgIGluaXRQcm9qZWN0QnV0dG9ucygpO1xuICB9KTtcblxuICBmdW5jdGlvbiBsb2FkSW5ib3goKSB7XG4gICAgY29uc3QgcHJvamVjdCA9IFRvZG9MaXN0LmdldEluYm94KCk7XG4gICAgY29uc3QgdGFzazEgPSB0b2RvKCdBIFRhc2snLCAnMTItMTItMjAwMCcsICdUaGlzIGlzIHRhc2sgZGVzY3JpcHRpb24nLCAyKTtcbiAgICBjb25zdCB0YXNrMiA9IHRvZG8oJ0Fub3RoZXIgVGFzaycsICcxMi0xMi0yMDAwJywgJ1RoaXMgaXMgdGFzayBkZXNjcmlwdGlvbicsIDEpO1xuICAgIFRvZG9MaXN0LmFkZFRhc2socHJvamVjdCwgdGFzazEpO1xuICAgIFRvZG9MaXN0LmFkZFRhc2socHJvamVjdCwgdGFzazIpO1xuICAgIGxvYWRQcm9qZWN0KHByb2plY3QpO1xuICB9XG5cbiAgZnVuY3Rpb24gbG9hZFByb2plY3QocHJvamVjdCkge1xuICAgIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRvZG8tbGlzdC1oZWFkZXIgPiBoMicpO1xuICAgIHRpdGxlLnRleHRDb250ZW50ID0gcHJvamVjdC5nZXROYW1lKCk7XG4gICAgbG9hZFRhc2tzKHByb2plY3QpO1xuICB9XG5cbiAgZnVuY3Rpb24gbG9hZFRhc2tzKHByb2plY3QpIHtcbiAgICBjbGVhckxpc3QoKTtcbiAgICBjb25zdCB0YXNrcyA9IHByb2plY3QuZ2V0VGFza3MoKTtcbiAgICB0YXNrcy5mb3JFYWNoKCh0YXNrKSA9PiB7XG4gICAgICBwb3B1bGF0ZVRhc2tMaXN0KHRhc2spO1xuICAgIH0pO1xuICAgIGhhbmRsZVRhc2soKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGluaXRQcm9qZWN0QnV0dG9ucygpIHtcbiAgICBjb25zdCBkZWZhdWx0UHJvamVjdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGVmYXVsdC1wcm9qZWN0cycpO1xuICAgIGNvbnN0IHVzZXJQcm9qZWN0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jdXN0b20tcHJvamVjdHMnKTtcblxuICAgIGRlZmF1bHRQcm9qZWN0cy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdkZWZhdWx0LXByb2plY3QnKSkge1xuICAgICAgICBvcGVuUHJvamVjdChlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB1c2VyUHJvamVjdHMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygndXNlci1wcm9qZWN0JykpIHtcbiAgICAgICAgb3BlblByb2plY3QoZSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBvcGVuUHJvamVjdChlKSB7XG4gICAgY29uc3QgcHJvamVjdE5hbWUgPSBlLnRhcmdldC50ZXh0Q29udGVudDtcbiAgICBjb25zdCBwcm9qZWN0ID0gVG9kb0xpc3QuZ2V0UHJvamVjdChwcm9qZWN0TmFtZSk7XG4gICAgbG9hZFByb2plY3QocHJvamVjdCk7XG4gIH1cblxuICBmdW5jdGlvbiBhZGRQcm9qZWN0KCkge1xuICAgIGNvbnN0IGlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2plY3QtbmFtZScpO1xuICAgIGNvbnN0IHByb2plY3ROYW1lID0gaW5wdXQudmFsdWU7XG4gICAgY29uc3QgcHJvamVjdCA9IFByb2plY3RzKHByb2plY3ROYW1lKTtcblxuICAgIGlmIChUb2RvTGlzdC5nZXRQcm9qZWN0KHByb2plY3ROYW1lKSkge1xuICAgICAgYWxlcnQoYCR7cHJvamVjdE5hbWV9IGFscmVhZHkgZXhpc3RzLmApO1xuICAgICAgcmV0dXJuIChpbnB1dC52YWx1ZSA9ICcnKTtcbiAgICB9XG5cbiAgICBpZiAoIXByb2plY3ROYW1lKSB7XG4gICAgICByZXR1cm4gYWxlcnQoJ0VudGVyIGEgbmFtZSBmb3IgcHJvamVjdCcpO1xuICAgIH1cblxuICAgIFRvZG9MaXN0LmFkZFByb2plY3QocHJvamVjdCk7XG4gICAgcG9wdWxhdGVQcm9qZWN0TGlzdChwcm9qZWN0KTtcbiAgICBpbnB1dC52YWx1ZSA9ICcnO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0UHJvamVjdCgpIHtcbiAgICBjb25zdCBwcm9qZWN0TmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50b2RvLWxpc3QtaGVhZGVyID4gaDInKS50ZXh0Q29udGVudDtcbiAgICBjb25zdCBwcm9qZWN0ID0gVG9kb0xpc3QuZ2V0UHJvamVjdChwcm9qZWN0TmFtZSk7XG4gICAgcmV0dXJuIHByb2plY3Q7XG4gIH1cblxuICBmdW5jdGlvbiBwb3B1bGF0ZVByb2plY3RMaXN0KHByb2plY3QpIHtcbiAgICBjb25zdCBsaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmN1c3RvbS1wcm9qZWN0cycpO1xuICAgIGNvbnN0IGxpc3RJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICBjb25zdCBwcm9qZWN0TmFtZSA9IHByb2plY3QuZ2V0TmFtZSgpO1xuICAgIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubGlzdC1mb3JtJyk7XG4gICAgbGlzdEl0ZW0uc2V0QXR0cmlidXRlKCdpZCcsIGBwcm9qZWN0LSR7cHJvamVjdE5hbWUudG9Mb3dlckNhc2UoKX1gKTtcbiAgICBsaXN0SXRlbS5jbGFzc0xpc3QuYWRkKCdsaXN0LWl0ZW0nLCAndXNlci1wcm9qZWN0Jyk7XG4gICAgbGlzdEl0ZW0udGV4dENvbnRlbnQgPSBwcm9qZWN0TmFtZTtcbiAgICBsaXN0Lmluc2VydEJlZm9yZShsaXN0SXRlbSwgZm9ybSk7XG4gIH1cblxuICBmdW5jdGlvbiB0b2dnbGVUYXNrSW5wdXQoZm9ybSkge1xuICAgIGlmIChmb3JtLmNsYXNzTGlzdC5jb250YWlucygnYWN0aXZlJykpIHtcbiAgICAgIGZvcm0uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvcm0uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gYWRkVGFzaygpIHtcbiAgICBjb25zdCBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFkZC10YXNrJyk7XG4gICAgY29uc3QgdGl0bGVJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0YXNrLW5hbWUnKTtcbiAgICBjb25zdCBkZXNjSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGFzay1kZXNjJyk7XG4gICAgY29uc3QgZGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkdWUtZGF0ZScpO1xuICAgIGNvbnN0IHByaW9yaXR5SW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJpb3JpdHknKTtcblxuICAgIGNvbnN0IHRpdGxlID0gdGl0bGVJbnB1dC52YWx1ZTtcbiAgICBjb25zdCBkZXNjcmlwdGlvbiA9IGRlc2NJbnB1dC52YWx1ZTtcbiAgICBjb25zdCBkdWVEYXRlID0gZGF0ZS52YWx1ZTtcbiAgICBjb25zdCBwcmlvdGl5ID0gcHJpb3JpdHlJbnB1dC52YWx1ZTtcblxuICAgIGNvbnN0IHRhc2sgPSB0b2RvKHRpdGxlLCBkdWVEYXRlLCBkZXNjcmlwdGlvbiwgcHJpb3RpeSk7XG4gICAgY29uc3QgcHJvamVjdCA9IGdldFByb2plY3QoKTtcblxuICAgIGlmICghdGl0bGUpIHtcbiAgICAgIGFsZXJ0KCdFbnRlciBhIHRpdGxlJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdG9nZ2xlVGFza0lucHV0KGZvcm0pO1xuICAgIHRpdGxlSW5wdXQudmFsdWUgPSAnJztcbiAgICBkZXNjSW5wdXQudmFsdWUgPSAnJztcbiAgICBwcmlvcml0eUlucHV0LnZhbHVlID0gJyc7XG4gICAgZGF0ZS52YWx1ZSA9ICcnO1xuICAgIFRvZG9MaXN0LmFkZFRhc2socHJvamVjdCwgdGFzayk7XG4gICAgbG9hZFRhc2tzKHByb2plY3QpO1xuICB9XG5cbiAgZnVuY3Rpb24gY2xlYXJMaXN0KCkge1xuICAgIGNvbnN0IGxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGFzay1saXN0Jyk7XG4gICAgbGlzdC5pbm5lckhUTUwgPSAnJztcbiAgfVxuXG4gIGZ1bmN0aW9uIHBvcHVsYXRlVGFza0xpc3QodGFzaykge1xuICAgIGNvbnN0IHRhc2tMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRhc2stbGlzdCcpO1xuICAgIGNvbnN0IGl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgIGl0ZW0uY2xhc3NMaXN0LmFkZChgdGFzay1pdGVtYCk7XG4gICAgY29uc3QgaHRtbCA9IGBcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cInRhc2stYnV0dG9uXCIgdHlwZT1cImNoZWNrYm94XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJ0YXNrLXRpdGxlXCI+JHt0YXNrLmdldFRpdGxlKCl9PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwidGFzay1kYXRlXCI+JHt0YXNrLmdldERhdGUoKX08L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRhc2stb3B0aW9uc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZWRpdC1idG5cIj4mI3gyNzBFOzwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGVsZXRlLWJ0blwiPiZ0aW1lczs8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgYDtcbiAgICBpdGVtLmlubmVySFRNTCA9IGh0bWw7XG4gICAgaGFuZGxlQ2hlY2sodGFzaywgaXRlbSk7XG4gICAgdGFza0xpc3QuYXBwZW5kQ2hpbGQoaXRlbSk7XG4gIH1cblxuICBmdW5jdGlvbiBoYW5kbGVDaGVjayh0YXNrLCBpdGVtKSB7XG4gICAgY29uc3QgY2hlY2tib3ggPSBpdGVtLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W3R5cGU9Y2hlY2tib3hdJyk7XG4gICAgaWYgKHRhc2suZ2V0U3RhdHVzKCkgPT09IHRydWUpIHtcbiAgICAgIGNoZWNrYm94LmNoZWNrZWQgPSB0cnVlO1xuICAgICAgaXRlbS5jbGFzc0xpc3QuYWRkKCdjaGVja2VkJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNoZWNrYm94LmNoZWNrYm94ID0gZmFsc2U7XG4gICAgICBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2NoZWNrZWQnKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBoYW5kbGVUYXNrKCkge1xuICAgIGNvbnN0IGxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGFzay1pdGVtJyk7XG4gICAgbGlzdC5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnZWRpdC1idG4nKSkge1xuICAgICAgICAgIGhhbmRsZUVkaXRUYXNrKGl0ZW0pO1xuICAgICAgICB9IGVsc2UgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnZGVsZXRlLWJ0bicpKSB7XG4gICAgICAgICAgZGVsZXRlVGFzayhpdGVtKTtcbiAgICAgICAgfSBlbHNlIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3Rhc2stYnV0dG9uJykpIHtcbiAgICAgICAgICB1cGRhdGVTdGF0dXMoaXRlbSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZXhwYW5kVGFza01vZGFsKGUsIGl0ZW0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldFRhc2soaXRlbSkge1xuICAgIGNvbnN0IHRhc2tUaXRsZSA9IGl0ZW0ucXVlcnlTZWxlY3RvcignLnRhc2stdGl0bGUnKS50ZXh0Q29udGVudDtcbiAgICBjb25zdCBwcm9qZWN0ID0gZ2V0UHJvamVjdCgpO1xuICAgIGNvbnN0IHRhc2sgPSBwcm9qZWN0LmdldFRhc2sodGFza1RpdGxlKTtcbiAgICByZXR1cm4gdGFzaztcbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZVN0YXR1cyhpdGVtKSB7XG4gICAgY29uc3QgdGFzayA9IGdldFRhc2soaXRlbSk7XG4gICAgY29uc3QgcHJvamVjdCA9IGdldFByb2plY3QoKTtcbiAgICB0YXNrLnVwZGF0ZVN0YXR1cygpO1xuICAgIGxvYWRUYXNrcyhwcm9qZWN0KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGhhbmRsZUVkaXRUYXNrKGl0ZW0pIHtcbiAgICBjb25zdCBsaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRhc2stbGlzdCcpO1xuICAgIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZWRpdC10YXNrJyk7XG4gICAgY29uc3Qgc2F2ZUJ0biA9IGZvcm0ucXVlcnlTZWxlY3RvcignLmVkaXQtdGFzay1idG4nKTtcbiAgICBjb25zdCB0aXRsZSA9IGZvcm0ucXVlcnlTZWxlY3RvcignI25hbWUnKTtcbiAgICBjb25zdCBkZXNjID0gZm9ybS5xdWVyeVNlbGVjdG9yKCcjZGVzYycpO1xuICAgIGNvbnN0IGRhdGUgPSBmb3JtLnF1ZXJ5U2VsZWN0b3IoJyNkdWUnKTtcbiAgICBjb25zdCBwcmlvcml0eSA9IGZvcm0ucXVlcnlTZWxlY3RvcignI3ByaScpO1xuICAgIGNvbnN0IHRhc2sgPSBnZXRUYXNrKGl0ZW0pO1xuXG4gICAgdGl0bGUudmFsdWUgPSB0YXNrLmdldFRpdGxlKCk7XG4gICAgZGVzYy52YWx1ZSA9IHRhc2suZ2V0RGVzYygpO1xuICAgIGRhdGUudmFsdWUgPSB0YXNrLmdldERhdGUoKTtcbiAgICBwcmlvcml0eS52YWx1ZSA9IHRhc2suZ2V0UHJpb3JpdHkoKTtcblxuICAgIGxpc3QuaW5zZXJ0QmVmb3JlKGZvcm0sIGl0ZW0pO1xuICAgIGxpc3QucmVtb3ZlQ2hpbGQoaXRlbSk7XG4gICAgdG9nZ2xlVGFza0lucHV0KGZvcm0pO1xuICAgIHNhdmVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICAgdXBkYXRlVGFzayhpdGVtKTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZVRhc2soaXRlbSkge1xuICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50b2RvLWxpc3QtYm9keScpO1xuICAgIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZWRpdC10YXNrJyk7XG4gICAgY29uc3QgdGl0bGUgPSBmb3JtLnF1ZXJ5U2VsZWN0b3IoJyNuYW1lJyk7XG4gICAgY29uc3QgZGVzY3JpcHRpb24gPSBmb3JtLnF1ZXJ5U2VsZWN0b3IoJyNkZXNjJyk7XG4gICAgY29uc3QgZGF0ZSA9IGZvcm0ucXVlcnlTZWxlY3RvcignI2R1ZScpO1xuICAgIGNvbnN0IHByaW9yaXR5ID0gZm9ybS5xdWVyeVNlbGVjdG9yKCcjcHJpJyk7XG4gICAgY29uc3QgcHJvamVjdCA9IGdldFByb2plY3QoKTtcbiAgICBjb25zdCB0YXNrID0gZ2V0VGFzayhpdGVtKTtcbiAgICB0YXNrLnNldFRpdGxlKHRpdGxlLnZhbHVlKTtcbiAgICB0YXNrLnNldERhdGUoZGF0ZS52YWx1ZSk7XG4gICAgdGFzay5zZXREZXNjKGRlc2NyaXB0aW9uLnZhbHVlKTtcbiAgICB0YXNrLnNldFByaW9yaXR5KHByaW9yaXR5LnZhbHVlKTtcblxuICAgIHRvZ2dsZVRhc2tJbnB1dChmb3JtKTtcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZm9ybSk7XG4gICAgbG9hZFByb2plY3QocHJvamVjdCk7XG4gIH1cblxuICBmdW5jdGlvbiBkZWxldGVUYXNrKGl0ZW0pIHtcbiAgICBjb25zdCB0YXNrVGl0bGUgPSBpdGVtLnF1ZXJ5U2VsZWN0b3IoJy50YXNrLXRpdGxlJykudGV4dENvbnRlbnQ7XG4gICAgY29uc3QgcHJvamVjdCA9IGdldFByb2plY3QoKTtcbiAgICBjb25zdCB0YXNrID0gcHJvamVjdC5nZXRUYXNrKHRhc2tUaXRsZSk7XG4gICAgVG9kb0xpc3QucmVtb3ZlVGFzayhwcm9qZWN0LCB0YXNrKTtcbiAgICBsb2FkVGFza3MocHJvamVjdCk7XG4gIH1cblxuICBmdW5jdGlvbiBleHBhbmRUYXNrTW9kYWwoZSwgaXRlbSkge1xuICAgIGNvbnN0IG1vZGFsVGFzayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50YXNrLWV4cGFuZC1tb2RhbCcpO1xuICAgIGNvbnN0IG1vZGFsT3ZlcmxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbC1vdmVybGF5Jyk7XG4gICAgcG9wdWxhdGVUYXNrTW9kYWwobW9kYWxUYXNrLCBpdGVtKTtcbiAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCd0YXNrLWl0ZW0nKSB8fCBlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3Rhc2stdGl0bGUnKSkge1xuICAgICAgbW9kYWxPdmVybGF5LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgICAgbW9kYWxUYXNrLmNsYXNzTGlzdC5hZGQoJ2V4cGFuZCcpO1xuICAgIH1cbiAgICBjb25zdCBjbG9zZVRhc2tNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jbG9zZS1idG4nKTtcbiAgICBjbG9zZVRhc2tNb2RhbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICBjb2xsYXBzZVRhc2tNb2RhbChtb2RhbE92ZXJsYXksIG1vZGFsVGFzayk7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBwb3B1bGF0ZVRhc2tNb2RhbChtb2RhbFRhc2ssIGl0ZW0pIHtcbiAgICBjb25zdCB0YXNrID0gZ2V0VGFzayhpdGVtKTtcbiAgICBjb25zdCBodG1sID0gYFxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGFsLWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RhbC1oZWFkaW5nXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0aXRsZVwiIGlkPVwibW9kYWwtdGl0bGVcIj48aDM+JHt0YXNrLmdldFRpdGxlKCl9PC9oMz48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNsb3NlLWJ0blwiPiZ0aW1lczs8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibW9kYWwtYm9keVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGVzY3JpcHRpb25cIj4ke1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhc2suZ2V0RGVzYygpID09PSB1bmRlZmluZWQgPyAnJyA6IHRhc2suZ2V0RGVzYygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRhc2stZGF0ZVwiPiR7dGFzay5nZXREYXRlKCl9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgYDtcbiAgICBtb2RhbFRhc2suaW5uZXJIVE1MID0gaHRtbDtcbiAgICByZXR1cm4gbW9kYWxUYXNrO1xuICB9XG5cbiAgZnVuY3Rpb24gY29sbGFwc2VUYXNrTW9kYWwobW9kYWxPdmVybGF5LCBtb2RhbFRhc2spIHtcbiAgICBtb2RhbE92ZXJsYXkuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG4gICAgbW9kYWxUYXNrLmNsYXNzTGlzdC5yZW1vdmUoJ2V4cGFuZCcpO1xuICB9XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBDb250cm9sbGVyO1xuIiwiaW1wb3J0IFByb2plY3RzIGZyb20gJy4vcHJvamVjdHMnO1xuaW1wb3J0IENvbnRyb2xsZXIgZnJvbSAnLi9jb250cm9sbGVyJztcblxuY29uc3QgVG9kb0xpc3QgPSAoKCkgPT4ge1xuICBsZXQgcHJvamVjdHMgPSBbXTtcblxuICBwcm9qZWN0cy5wdXNoKFByb2plY3RzKCdJbmJveCcpKTtcbiAgcHJvamVjdHMucHVzaChQcm9qZWN0cygnVG9kYXknKSk7XG4gIHByb2plY3RzLnB1c2goUHJvamVjdHMoJ1VwY29taW5nJykpO1xuICBwcm9qZWN0cy5wdXNoKFByb2plY3RzKCdEZWZhdWx0JykpO1xuXG4gIGNvbnN0IF9pbmJveCA9IGdldFByb2plY3QoJ0luYm94Jyk7XG4gIGNvbnN0IF9kZWZhdWx0UHJvamVjdCA9IGdldFByb2plY3QoJ0RlZmF1bHQnKTtcblxuICBmdW5jdGlvbiBnZXRJbmJveCgpIHtcbiAgICByZXR1cm4gX2luYm94O1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHtcbiAgICByZXR1cm4gX2RlZmF1bHRQcm9qZWN0O1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0UHJvamVjdHMoKSB7XG4gICAgcmV0dXJuIHByb2plY3RzO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0UHJvamVjdChuYW1lKSB7XG4gICAgcmV0dXJuIHByb2plY3RzLmZpbmQoKHByb2plY3QpID0+IHByb2plY3QuZ2V0TmFtZSgpID09PSBuYW1lKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZFByb2plY3QocHJvamVjdCkge1xuICAgIHByb2plY3RzLnB1c2gocHJvamVjdCk7XG4gIH1cblxuICBmdW5jdGlvbiBhZGRUYXNrKHByb2plY3QsIHRhc2spIHtcbiAgICBwcm9qZWN0LmFkZFRhc2sodGFzayk7XG4gIH1cblxuICBmdW5jdGlvbiByZW1vdmVUYXNrKHByb2plY3QsIHRhc2spIHtcbiAgICBwcm9qZWN0LnJlbW92ZVRhc2sodGFzayk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGdldEluYm94LFxuICAgIGdldERlZmF1bHQsXG4gICAgZ2V0UHJvamVjdHMsXG4gICAgZ2V0UHJvamVjdCxcbiAgICBhZGRQcm9qZWN0LFxuICAgIGFkZFRhc2ssXG4gICAgcmVtb3ZlVGFzayxcbiAgfTtcbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IFRvZG9MaXN0O1xuIiwiY29uc3QgUHJvamVjdHMgPSAobmFtZSkgPT4ge1xuICBjb25zdCBfbmFtZSA9IG5hbWU7XG4gIGxldCBfdGFza3MgPSBbXTtcblxuICBjb25zdCBnZXRJbmRleCA9IChuYW1lKSA9PiB7XG4gICAgcmV0dXJuIF90YXNrcy5maW5kSW5kZXgoKHRhc2spID0+IHRhc2suZ2V0VGl0bGUoKSA9PT0gbmFtZSk7XG4gIH07XG5cbiAgY29uc3QgZ2V0TmFtZSA9ICgpID0+IF9uYW1lO1xuXG4gIGNvbnN0IHNldE5hbWUgPSAobmFtZSkgPT4gKF9uYW1lID0gbmFtZSk7XG5cbiAgY29uc3QgZ2V0VGFza3MgPSAoKSA9PiBfdGFza3M7XG5cbiAgY29uc3QgZ2V0VGFzayA9IChuYW1lKSA9PiB7XG4gICAgcmV0dXJuIF90YXNrcy5maW5kKCh0YXNrKSA9PiB0YXNrLmdldFRpdGxlKCkgPT09IG5hbWUpO1xuICB9O1xuXG4gIGNvbnN0IGFkZFRhc2sgPSAodGFzaykgPT4ge1xuICAgIF90YXNrcy5wdXNoKHRhc2spO1xuICB9O1xuXG4gIGNvbnN0IHJlbW92ZVRhc2sgPSAodGFzaykgPT4ge1xuICAgIHJldHVybiAoX3Rhc2tzID0gX3Rhc2tzLmZpbHRlcigodG9kbykgPT4gdG9kby5nZXRUaXRsZSgpICE9PSB0YXNrLmdldFRpdGxlKCkpKTtcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIGdldEluZGV4LFxuICAgIGdldE5hbWUsXG4gICAgc2V0TmFtZSxcbiAgICBnZXRUYXNrcyxcbiAgICBnZXRUYXNrLFxuICAgIGFkZFRhc2ssXG4gICAgcmVtb3ZlVGFzayxcbiAgfTtcbn07XG5leHBvcnQgZGVmYXVsdCBQcm9qZWN0cztcbiIsImNvbnN0IHRvZG8gPSAodGl0bGUsIGR1ZURhdGUsIGRlc2NyaXB0aW9uLCBwcmlvcml0aXkpID0+IHtcbiAgbGV0IF9zdGF0dXMgPSBmYWxzZTtcblxuICBjb25zdCBnZXRTdGF0dXMgPSAoKSA9PiBfc3RhdHVzO1xuICBjb25zdCB1cGRhdGVTdGF0dXMgPSAoKSA9PiB7XG4gICAgX3N0YXR1cyA9ICFfc3RhdHVzO1xuICB9O1xuXG4gIGNvbnN0IGdldFRpdGxlID0gKCkgPT4gdGl0bGU7XG4gIGNvbnN0IHNldFRpdGxlID0gKHZhbHVlKSA9PiAodGl0bGUgPSB2YWx1ZSk7XG5cbiAgY29uc3QgZ2V0RGVzYyA9ICgpID0+IGRlc2NyaXB0aW9uO1xuICBjb25zdCBzZXREZXNjID0gKHZhbHVlKSA9PiAoZGVzY3JpcHRpb24gPSB2YWx1ZSk7XG5cbiAgY29uc3QgZ2V0RGF0ZSA9ICgpID0+IGR1ZURhdGU7XG4gIGNvbnN0IHNldERhdGUgPSAodmFsdWUpID0+IChkdWVEYXRlID0gdmFsdWUpO1xuXG4gIGNvbnN0IGdldFByaW9yaXR5ID0gKCkgPT4gcHJpb3JpdGl5O1xuICBjb25zdCBzZXRQcmlvcml0eSA9ICh2YWx1ZSkgPT4gKHByaW9yaXRpeSA9IHZhbHVlKTtcblxuICByZXR1cm4ge1xuICAgIGdldFN0YXR1cyxcbiAgICB1cGRhdGVTdGF0dXMsXG4gICAgZ2V0VGl0bGUsXG4gICAgc2V0VGl0bGUsXG4gICAgZ2V0RGVzYyxcbiAgICBzZXREZXNjLFxuICAgIGdldERhdGUsXG4gICAgc2V0RGF0ZSxcbiAgICBnZXRQcmlvcml0eSxcbiAgICBzZXRQcmlvcml0eSxcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHRvZG87XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiIl0sIm5hbWVzIjpbIlByb2plY3RzIiwidG9kbyIsIlRvZG9MaXN0IiwiQ29udHJvbGxlciIsImRvY3VtZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJwcm9qZWN0QWRkQnRuIiwicXVlcnlTZWxlY3RvciIsImFkZFByb2plY3QiLCJmb3JtIiwidGFza0lucHV0IiwidG9nZ2xlVGFza0lucHV0IiwiYWRkVGFza0J0biIsImFkZFRhc2siLCJsb2FkSW5ib3giLCJpbml0UHJvamVjdEJ1dHRvbnMiLCJwcm9qZWN0IiwiZ2V0SW5ib3giLCJ0YXNrMSIsInRhc2syIiwibG9hZFByb2plY3QiLCJ0aXRsZSIsInRleHRDb250ZW50IiwiZ2V0TmFtZSIsImxvYWRUYXNrcyIsImNsZWFyTGlzdCIsInRhc2tzIiwiZ2V0VGFza3MiLCJmb3JFYWNoIiwidGFzayIsInBvcHVsYXRlVGFza0xpc3QiLCJoYW5kbGVUYXNrIiwiZGVmYXVsdFByb2plY3RzIiwidXNlclByb2plY3RzIiwidGFyZ2V0IiwiY2xhc3NMaXN0IiwiY29udGFpbnMiLCJvcGVuUHJvamVjdCIsInByb2plY3ROYW1lIiwiZ2V0UHJvamVjdCIsImlucHV0IiwidmFsdWUiLCJhbGVydCIsInBvcHVsYXRlUHJvamVjdExpc3QiLCJsaXN0IiwibGlzdEl0ZW0iLCJjcmVhdGVFbGVtZW50Iiwic2V0QXR0cmlidXRlIiwidG9Mb3dlckNhc2UiLCJhZGQiLCJpbnNlcnRCZWZvcmUiLCJyZW1vdmUiLCJ0aXRsZUlucHV0IiwiZGVzY0lucHV0IiwiZGF0ZSIsInByaW9yaXR5SW5wdXQiLCJkZXNjcmlwdGlvbiIsImR1ZURhdGUiLCJwcmlvdGl5IiwiaW5uZXJIVE1MIiwidGFza0xpc3QiLCJpdGVtIiwiaHRtbCIsImdldFRpdGxlIiwiZ2V0RGF0ZSIsImhhbmRsZUNoZWNrIiwiYXBwZW5kQ2hpbGQiLCJjaGVja2JveCIsImdldFN0YXR1cyIsImNoZWNrZWQiLCJxdWVyeVNlbGVjdG9yQWxsIiwiaGFuZGxlRWRpdFRhc2siLCJkZWxldGVUYXNrIiwidXBkYXRlU3RhdHVzIiwiZXhwYW5kVGFza01vZGFsIiwiZ2V0VGFzayIsInRhc2tUaXRsZSIsInNhdmVCdG4iLCJkZXNjIiwicHJpb3JpdHkiLCJnZXREZXNjIiwiZ2V0UHJpb3JpdHkiLCJyZW1vdmVDaGlsZCIsInVwZGF0ZVRhc2siLCJjb250YWluZXIiLCJzZXRUaXRsZSIsInNldERhdGUiLCJzZXREZXNjIiwic2V0UHJpb3JpdHkiLCJyZW1vdmVUYXNrIiwibW9kYWxUYXNrIiwibW9kYWxPdmVybGF5IiwicG9wdWxhdGVUYXNrTW9kYWwiLCJjbG9zZVRhc2tNb2RhbCIsImNvbGxhcHNlVGFza01vZGFsIiwidW5kZWZpbmVkIiwicHJvamVjdHMiLCJwdXNoIiwiX2luYm94IiwiX2RlZmF1bHRQcm9qZWN0IiwiZ2V0RGVmYXVsdCIsImdldFByb2plY3RzIiwibmFtZSIsImZpbmQiLCJfbmFtZSIsIl90YXNrcyIsImdldEluZGV4IiwiZmluZEluZGV4Iiwic2V0TmFtZSIsImZpbHRlciIsInByaW9yaXRpeSIsIl9zdGF0dXMiXSwic291cmNlUm9vdCI6IiJ9