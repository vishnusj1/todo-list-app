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




const Controller = (() => {
    document.addEventListener("DOMContentLoaded", (e) => {
        const projectAddBtn = document.querySelector("#add-btn");
        projectAddBtn.addEventListener("click", addProject);

        const form = document.querySelector(".add-task");

        const taskInput = document.querySelector("#task-input");
        taskInput.addEventListener("click", function (e) {
            toggleTaskInput(form);
        });

        const addTaskBtn = document.querySelector("#add-task-btn");
        addTaskBtn.addEventListener("click", addTask);

        loadInbox();
        initProjectButtons();
    });

    function loadInbox() {
        const project = _index__WEBPACK_IMPORTED_MODULE_2__["default"].getInbox();
        const task1 = (0,_todo__WEBPACK_IMPORTED_MODULE_1__["default"])(
            "A Task",
            "12-12-2000",
            "This is task description",
            2
        );
        const task2 = (0,_todo__WEBPACK_IMPORTED_MODULE_1__["default"])(
            "Another Task",
            "12-12-2000",
            "This is task description",
            1
        );
        _index__WEBPACK_IMPORTED_MODULE_2__["default"].addTask(project, task1);
        _index__WEBPACK_IMPORTED_MODULE_2__["default"].addTask(project, task2);
        loadProject(project);
    }

    function loadProject(project) {
        const title = document.querySelector(".todo-list-header > h2");
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
        const defaultProjects = document.querySelector(".default-projects");
        const userProjects = document.querySelector(".custom-projects");

        defaultProjects.addEventListener("click", (e) => {
            if (e.target.classList.contains("default-project")) {
                openProject(e);
            }
        });
        userProjects.addEventListener("click", (e) => {
            if (e.target.classList.contains("user-project")) {
                openProject(e);
            }
        });
    }

    function openProject(e) {
        const projectName = e.target.textContent;
        const project = _index__WEBPACK_IMPORTED_MODULE_2__["default"].getProject(projectName);
        loadProject(project);
    }

    function addProject() {
        const input = document.querySelector("#project-name");
        const projectName = input.value;
        const project = (0,_projects__WEBPACK_IMPORTED_MODULE_0__["default"])(projectName);

        if (_index__WEBPACK_IMPORTED_MODULE_2__["default"].getProject(projectName)) {
            alert(`${projectName} already exists.`);
            return (input.value = "");
        }

        if (!projectName) {
            return alert("Enter a name for project");
        }

        _index__WEBPACK_IMPORTED_MODULE_2__["default"].addProject(project);
        populateProjectList(project);
        input.value = "";
    }

    function getProject() {
        const projectName = document.querySelector(
            ".todo-list-header > h2"
        ).textContent;
        const project = _index__WEBPACK_IMPORTED_MODULE_2__["default"].getProject(projectName);
        return project;
    }

    function populateProjectList(project) {
        const list = document.querySelector(".custom-projects");
        const listItem = document.createElement("li");
        const projectName = project.getName();
        const form = document.querySelector(".list-form");
        listItem.setAttribute("id", `project-${projectName.toLowerCase()}`);
        listItem.classList.add("list-item", "user-project");
        listItem.textContent = projectName;
        list.insertBefore(listItem, form);
    }

    function toggleTaskInput(form) {
        if (form.classList.contains("active")) {
            form.classList.remove("active");
        } else {
            form.classList.add("active");
        }
    }

    function addTask() {
        const form = document.querySelector(".add-task");
        const titleInput = document.querySelector("#task-name");
        const descInput = document.querySelector("#task-desc");
        const date = document.querySelector("#due-date");
        const priorityInput = document.querySelector("#priority");

        const title = titleInput.value;
        const description = descInput.value;
        const dueDate = date.value;
        const priotiy = priorityInput.value;

        const task = (0,_todo__WEBPACK_IMPORTED_MODULE_1__["default"])(title, dueDate, description, priotiy);
        const project = getProject();

        if (!title) {
            alert("Enter a title");
            return;
        }

        toggleTaskInput(form);
        titleInput.value = "";
        descInput.value = "";
        priorityInput.value = "";
        date.value = "";
        _index__WEBPACK_IMPORTED_MODULE_2__["default"].addTask(project, task);
        loadTasks(project);
    }

    function clearList() {
        const list = document.querySelector(".task-list");
        list.innerHTML = "";
    }

    function populateTaskList(task) {
        const taskList = document.querySelector(".task-list");
        const item = document.createElement("li");
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
        const checkbox = item.querySelector("input[type=checkbox]");
        if (task.getStatus() === true) {
            checkbox.checked = true;
            item.classList.add("checked");
        } else {
            checkbox.checkbox = false;
            item.classList.remove("checked");
        }
    }

    function handleTask() {
        const list = document.querySelectorAll(".task-item");
        list.forEach((item) => {
            item.addEventListener("click", (e) => {
                if (e.target.classList.contains("edit-btn")) {
                    handleEditTask(item);
                } else if (e.target.classList.contains("delete-btn")) {
                    deleteTask(item);
                } else if (e.target.classList.contains("task-button")) {
                    updateStatus(item);
                } else {
                    expandTaskModal(e, item);
                }
            });
        });
    }

    function getTask(item) {
        const taskTitle = item.querySelector(".task-title").textContent;
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
        const list = document.querySelector(".task-list");
        const form = document.querySelector(".edit-task");
        const saveBtn = form.querySelector(".edit-task-btn");
        const title = form.querySelector("#name");
        const desc = form.querySelector("#desc");
        const date = form.querySelector("#due");
        const priority = form.querySelector("#pri");
        const task = getTask(item);

        title.value = task.getTitle();
        desc.value = task.getDesc();
        date.value = task.getDate();
        priority.value = task.getPriority();

        list.insertBefore(form, item);
        list.removeChild(item);
        toggleTaskInput(form);
        saveBtn.addEventListener("click", function (e) {
            updateTask(item);
        });
    }

    function updateTask(item) {
        const container = document.querySelector(".todo-list-body");
        const form = document.querySelector(".edit-task");
        const title = form.querySelector("#name");
        const description = form.querySelector("#desc");
        const date = form.querySelector("#due");
        const priority = form.querySelector("#pri");
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
        const taskTitle = item.querySelector(".task-title").textContent;
        const project = getProject();
        const task = project.getTask(taskTitle);
        _index__WEBPACK_IMPORTED_MODULE_2__["default"].removeTask(project, task);
        loadTasks(project);
    }

    function expandTaskModal(e, item) {
        const modalTask = document.querySelector(".task-expand-modal");
        const modalOverlay = document.querySelector(".modal-overlay");
        populateTaskModal(modalTask, item);
        if (
            e.target.classList.contains("task-item") ||
            e.target.classList.contains("task-title")
        ) {
            modalOverlay.classList.add("active");
            modalTask.classList.add("expand");
        }
        const closeTaskModal = document.querySelector(".close-btn");
        closeTaskModal.addEventListener("click", function (e) {
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
                                    task.getDesc() === undefined
                                        ? ""
                                        : task.getDesc()
                                }</div>
                                <div class="task-date">${task.getDate()}</div>
                            </div>
                        </div>
                    `;
        modalTask.innerHTML = html;
        return modalTask;
    }

    function collapseTaskModal(modalOverlay, modalTask) {
        modalOverlay.classList.remove("active");
        modalTask.classList.remove("expand");
    }
})();

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



const TodoList = (() => {
    let projects = [];

    projects.push((0,_projects__WEBPACK_IMPORTED_MODULE_0__["default"])("Inbox"));
    projects.push((0,_projects__WEBPACK_IMPORTED_MODULE_0__["default"])("Today"));
    projects.push((0,_projects__WEBPACK_IMPORTED_MODULE_0__["default"])("Upcoming"));
    projects.push((0,_projects__WEBPACK_IMPORTED_MODULE_0__["default"])("Default"));

    const _inbox = getProject("Inbox");
    const _defaultProject = getProject("Default");

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
        return projects.find((project) => project.getName() === name);
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
        getInbox,
        getDefault,
        getProjects,
        getProject,
        addProject,
        addTask,
        removeTask,
    };
})();

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
const Projects = (name) => {
    const _name = name;
    let _tasks = [];

    const getIndex = (name) => {
        return _tasks.findIndex((task) => task.getTitle() === name);
    };

    const getName = () => _name;

    const setName = (name) => (_name = name);

    const getTasks = () => _tasks;

    const getTask = (name) => {
        return _tasks.find((task) => task.getTitle() === name);
    };

    const addTask = (task) => {
        _tasks.push(task);
    };

    const removeTask = (task) => {
        return (_tasks = _tasks.filter(
            (todo) => todo.getTitle() !== task.getTitle()
        ));
    };

    return {
        getIndex,
        getName,
        setName,
        getTasks,
        getTask,
        addTask,
        removeTask,
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
const todo = (title, dueDate, description, prioritiy) => {
    let _status = false;

    const getStatus = () => _status;
    const updateStatus = () => {
        _status = !_status;
    };

    const getTitle = () => title;
    const setTitle = (value) => (title = value);

    const getDesc = () => description;
    const setDesc = (value) => (description = value);

    const getDate = () => dueDate;
    const setDate = (value) => (dueDate = value);

    const getPriority = () => prioritiy;
    const setPriority = (value) => (prioritiy = value);

    return {
        getStatus,
        updateStatus,
        getTitle,
        setTitle,
        getDesc,
        setDesc,
        getDate,
        setDate,
        getPriority,
        setPriority,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFrQztBQUNSO0FBQ0s7O0FBRS9CO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBLHdCQUF3Qix1REFBaUI7QUFDekMsc0JBQXNCLGlEQUFJO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsaURBQUk7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsc0RBQWdCO0FBQ3hCLFFBQVEsc0RBQWdCO0FBQ3hCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQSx3QkFBd0IseURBQW1CO0FBQzNDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHFEQUFROztBQUVoQyxZQUFZLHlEQUFtQjtBQUMvQixxQkFBcUIsYUFBYTtBQUNsQztBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxRQUFRLHlEQUFtQjtBQUMzQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IseURBQW1CO0FBQzNDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtDQUErQywwQkFBMEI7QUFDekU7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEscUJBQXFCLGlEQUFJO0FBQ3pCOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLHNEQUFnQjtBQUN4QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9EQUFvRCxnQkFBZ0I7QUFDcEUsbURBQW1ELGVBQWU7QUFDbEU7QUFDQSw4REFBOEQ7QUFDOUQsK0RBQStEO0FBQy9EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSx5REFBbUI7QUFDM0I7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwRUFBMEUsZ0JBQWdCO0FBQzFGLDhEQUE4RDtBQUM5RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUM7QUFDakMseURBQXlELGVBQWU7QUFDeEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRCxpRUFBZSxVQUFVLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDMVRRO0FBQ0k7O0FBRXRDO0FBQ0E7O0FBRUEsa0JBQWtCLHFEQUFRO0FBQzFCLGtCQUFrQixxREFBUTtBQUMxQixrQkFBa0IscURBQVE7QUFDMUIsa0JBQWtCLHFEQUFROztBQUUxQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVELGlFQUFlLFFBQVEsRUFBQzs7Ozs7Ozs7Ozs7Ozs7O0FDckR4QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlFQUFlLFFBQVEsRUFBQzs7Ozs7Ozs7Ozs7Ozs7O0FDdEN4QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUVBQWUsSUFBSSxFQUFDOzs7Ozs7O1VDbENwQjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7VUVOQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8tbGlzdC1hcHAvLi9zcmMvY29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QtYXBwLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL3RvZG8tbGlzdC1hcHAvLi9zcmMvcHJvamVjdHMuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0LWFwcC8uL3NyYy90b2RvLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC1hcHAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kby1saXN0LWFwcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0LWFwcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG8tbGlzdC1hcHAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvLWxpc3QtYXBwL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vdG9kby1saXN0LWFwcC93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vdG9kby1saXN0LWFwcC93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFByb2plY3RzIGZyb20gXCIuL3Byb2plY3RzXCI7XG5pbXBvcnQgdG9kbyBmcm9tIFwiLi90b2RvXCI7XG5pbXBvcnQgVG9kb0xpc3QgZnJvbSBcIi4vaW5kZXhcIjtcblxuY29uc3QgQ29udHJvbGxlciA9ICgoKSA9PiB7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKGUpID0+IHtcbiAgICAgICAgY29uc3QgcHJvamVjdEFkZEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYWRkLWJ0blwiKTtcbiAgICAgICAgcHJvamVjdEFkZEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYWRkUHJvamVjdCk7XG5cbiAgICAgICAgY29uc3QgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWRkLXRhc2tcIik7XG5cbiAgICAgICAgY29uc3QgdGFza0lucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0YXNrLWlucHV0XCIpO1xuICAgICAgICB0YXNrSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICB0b2dnbGVUYXNrSW5wdXQoZm9ybSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IGFkZFRhc2tCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FkZC10YXNrLWJ0blwiKTtcbiAgICAgICAgYWRkVGFza0J0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYWRkVGFzayk7XG5cbiAgICAgICAgbG9hZEluYm94KCk7XG4gICAgICAgIGluaXRQcm9qZWN0QnV0dG9ucygpO1xuICAgIH0pO1xuXG4gICAgZnVuY3Rpb24gbG9hZEluYm94KCkge1xuICAgICAgICBjb25zdCBwcm9qZWN0ID0gVG9kb0xpc3QuZ2V0SW5ib3goKTtcbiAgICAgICAgY29uc3QgdGFzazEgPSB0b2RvKFxuICAgICAgICAgICAgXCJBIFRhc2tcIixcbiAgICAgICAgICAgIFwiMTItMTItMjAwMFwiLFxuICAgICAgICAgICAgXCJUaGlzIGlzIHRhc2sgZGVzY3JpcHRpb25cIixcbiAgICAgICAgICAgIDJcbiAgICAgICAgKTtcbiAgICAgICAgY29uc3QgdGFzazIgPSB0b2RvKFxuICAgICAgICAgICAgXCJBbm90aGVyIFRhc2tcIixcbiAgICAgICAgICAgIFwiMTItMTItMjAwMFwiLFxuICAgICAgICAgICAgXCJUaGlzIGlzIHRhc2sgZGVzY3JpcHRpb25cIixcbiAgICAgICAgICAgIDFcbiAgICAgICAgKTtcbiAgICAgICAgVG9kb0xpc3QuYWRkVGFzayhwcm9qZWN0LCB0YXNrMSk7XG4gICAgICAgIFRvZG9MaXN0LmFkZFRhc2socHJvamVjdCwgdGFzazIpO1xuICAgICAgICBsb2FkUHJvamVjdChwcm9qZWN0KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsb2FkUHJvamVjdChwcm9qZWN0KSB7XG4gICAgICAgIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50b2RvLWxpc3QtaGVhZGVyID4gaDJcIik7XG4gICAgICAgIHRpdGxlLnRleHRDb250ZW50ID0gcHJvamVjdC5nZXROYW1lKCk7XG4gICAgICAgIGxvYWRUYXNrcyhwcm9qZWN0KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsb2FkVGFza3MocHJvamVjdCkge1xuICAgICAgICBjbGVhckxpc3QoKTtcbiAgICAgICAgY29uc3QgdGFza3MgPSBwcm9qZWN0LmdldFRhc2tzKCk7XG4gICAgICAgIHRhc2tzLmZvckVhY2goKHRhc2spID0+IHtcbiAgICAgICAgICAgIHBvcHVsYXRlVGFza0xpc3QodGFzayk7XG4gICAgICAgIH0pO1xuICAgICAgICBoYW5kbGVUYXNrKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5pdFByb2plY3RCdXR0b25zKCkge1xuICAgICAgICBjb25zdCBkZWZhdWx0UHJvamVjdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRlZmF1bHQtcHJvamVjdHNcIik7XG4gICAgICAgIGNvbnN0IHVzZXJQcm9qZWN0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY3VzdG9tLXByb2plY3RzXCIpO1xuXG4gICAgICAgIGRlZmF1bHRQcm9qZWN0cy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgICAgICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJkZWZhdWx0LXByb2plY3RcIikpIHtcbiAgICAgICAgICAgICAgICBvcGVuUHJvamVjdChlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHVzZXJQcm9qZWN0cy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgICAgICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJ1c2VyLXByb2plY3RcIikpIHtcbiAgICAgICAgICAgICAgICBvcGVuUHJvamVjdChlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb3BlblByb2plY3QoZSkge1xuICAgICAgICBjb25zdCBwcm9qZWN0TmFtZSA9IGUudGFyZ2V0LnRleHRDb250ZW50O1xuICAgICAgICBjb25zdCBwcm9qZWN0ID0gVG9kb0xpc3QuZ2V0UHJvamVjdChwcm9qZWN0TmFtZSk7XG4gICAgICAgIGxvYWRQcm9qZWN0KHByb2plY3QpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFkZFByb2plY3QoKSB7XG4gICAgICAgIGNvbnN0IGlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9qZWN0LW5hbWVcIik7XG4gICAgICAgIGNvbnN0IHByb2plY3ROYW1lID0gaW5wdXQudmFsdWU7XG4gICAgICAgIGNvbnN0IHByb2plY3QgPSBQcm9qZWN0cyhwcm9qZWN0TmFtZSk7XG5cbiAgICAgICAgaWYgKFRvZG9MaXN0LmdldFByb2plY3QocHJvamVjdE5hbWUpKSB7XG4gICAgICAgICAgICBhbGVydChgJHtwcm9qZWN0TmFtZX0gYWxyZWFkeSBleGlzdHMuYCk7XG4gICAgICAgICAgICByZXR1cm4gKGlucHV0LnZhbHVlID0gXCJcIik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXByb2plY3ROYW1lKSB7XG4gICAgICAgICAgICByZXR1cm4gYWxlcnQoXCJFbnRlciBhIG5hbWUgZm9yIHByb2plY3RcIik7XG4gICAgICAgIH1cblxuICAgICAgICBUb2RvTGlzdC5hZGRQcm9qZWN0KHByb2plY3QpO1xuICAgICAgICBwb3B1bGF0ZVByb2plY3RMaXN0KHByb2plY3QpO1xuICAgICAgICBpbnB1dC52YWx1ZSA9IFwiXCI7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0UHJvamVjdCgpIHtcbiAgICAgICAgY29uc3QgcHJvamVjdE5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgICAgXCIudG9kby1saXN0LWhlYWRlciA+IGgyXCJcbiAgICAgICAgKS50ZXh0Q29udGVudDtcbiAgICAgICAgY29uc3QgcHJvamVjdCA9IFRvZG9MaXN0LmdldFByb2plY3QocHJvamVjdE5hbWUpO1xuICAgICAgICByZXR1cm4gcHJvamVjdDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwb3B1bGF0ZVByb2plY3RMaXN0KHByb2plY3QpIHtcbiAgICAgICAgY29uc3QgbGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY3VzdG9tLXByb2plY3RzXCIpO1xuICAgICAgICBjb25zdCBsaXN0SXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcbiAgICAgICAgY29uc3QgcHJvamVjdE5hbWUgPSBwcm9qZWN0LmdldE5hbWUoKTtcbiAgICAgICAgY29uc3QgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubGlzdC1mb3JtXCIpO1xuICAgICAgICBsaXN0SXRlbS5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgcHJvamVjdC0ke3Byb2plY3ROYW1lLnRvTG93ZXJDYXNlKCl9YCk7XG4gICAgICAgIGxpc3RJdGVtLmNsYXNzTGlzdC5hZGQoXCJsaXN0LWl0ZW1cIiwgXCJ1c2VyLXByb2plY3RcIik7XG4gICAgICAgIGxpc3RJdGVtLnRleHRDb250ZW50ID0gcHJvamVjdE5hbWU7XG4gICAgICAgIGxpc3QuaW5zZXJ0QmVmb3JlKGxpc3RJdGVtLCBmb3JtKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0b2dnbGVUYXNrSW5wdXQoZm9ybSkge1xuICAgICAgICBpZiAoZm9ybS5jbGFzc0xpc3QuY29udGFpbnMoXCJhY3RpdmVcIikpIHtcbiAgICAgICAgICAgIGZvcm0uY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZvcm0uY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFkZFRhc2soKSB7XG4gICAgICAgIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFkZC10YXNrXCIpO1xuICAgICAgICBjb25zdCB0aXRsZUlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0YXNrLW5hbWVcIik7XG4gICAgICAgIGNvbnN0IGRlc2NJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGFzay1kZXNjXCIpO1xuICAgICAgICBjb25zdCBkYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNkdWUtZGF0ZVwiKTtcbiAgICAgICAgY29uc3QgcHJpb3JpdHlJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJpb3JpdHlcIik7XG5cbiAgICAgICAgY29uc3QgdGl0bGUgPSB0aXRsZUlucHV0LnZhbHVlO1xuICAgICAgICBjb25zdCBkZXNjcmlwdGlvbiA9IGRlc2NJbnB1dC52YWx1ZTtcbiAgICAgICAgY29uc3QgZHVlRGF0ZSA9IGRhdGUudmFsdWU7XG4gICAgICAgIGNvbnN0IHByaW90aXkgPSBwcmlvcml0eUlucHV0LnZhbHVlO1xuXG4gICAgICAgIGNvbnN0IHRhc2sgPSB0b2RvKHRpdGxlLCBkdWVEYXRlLCBkZXNjcmlwdGlvbiwgcHJpb3RpeSk7XG4gICAgICAgIGNvbnN0IHByb2plY3QgPSBnZXRQcm9qZWN0KCk7XG5cbiAgICAgICAgaWYgKCF0aXRsZSkge1xuICAgICAgICAgICAgYWxlcnQoXCJFbnRlciBhIHRpdGxlXCIpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdG9nZ2xlVGFza0lucHV0KGZvcm0pO1xuICAgICAgICB0aXRsZUlucHV0LnZhbHVlID0gXCJcIjtcbiAgICAgICAgZGVzY0lucHV0LnZhbHVlID0gXCJcIjtcbiAgICAgICAgcHJpb3JpdHlJbnB1dC52YWx1ZSA9IFwiXCI7XG4gICAgICAgIGRhdGUudmFsdWUgPSBcIlwiO1xuICAgICAgICBUb2RvTGlzdC5hZGRUYXNrKHByb2plY3QsIHRhc2spO1xuICAgICAgICBsb2FkVGFza3MocHJvamVjdCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2xlYXJMaXN0KCkge1xuICAgICAgICBjb25zdCBsaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YXNrLWxpc3RcIik7XG4gICAgICAgIGxpc3QuaW5uZXJIVE1MID0gXCJcIjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwb3B1bGF0ZVRhc2tMaXN0KHRhc2spIHtcbiAgICAgICAgY29uc3QgdGFza0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhc2stbGlzdFwiKTtcbiAgICAgICAgY29uc3QgaXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcbiAgICAgICAgaXRlbS5jbGFzc0xpc3QuYWRkKGB0YXNrLWl0ZW1gKTtcbiAgICAgICAgY29uc3QgaHRtbCA9IGBcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cInRhc2stYnV0dG9uXCIgdHlwZT1cImNoZWNrYm94XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJ0YXNrLXRpdGxlXCI+JHt0YXNrLmdldFRpdGxlKCl9PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwidGFzay1kYXRlXCI+JHt0YXNrLmdldERhdGUoKX08L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRhc2stb3B0aW9uc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZWRpdC1idG5cIj4mI3gyNzBFOzwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGVsZXRlLWJ0blwiPiZ0aW1lczs8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgYDtcbiAgICAgICAgaXRlbS5pbm5lckhUTUwgPSBodG1sO1xuICAgICAgICBoYW5kbGVDaGVjayh0YXNrLCBpdGVtKTtcbiAgICAgICAgdGFza0xpc3QuYXBwZW5kQ2hpbGQoaXRlbSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaGFuZGxlQ2hlY2sodGFzaywgaXRlbSkge1xuICAgICAgICBjb25zdCBjaGVja2JveCA9IGl0ZW0ucXVlcnlTZWxlY3RvcihcImlucHV0W3R5cGU9Y2hlY2tib3hdXCIpO1xuICAgICAgICBpZiAodGFzay5nZXRTdGF0dXMoKSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgY2hlY2tib3guY2hlY2tlZCA9IHRydWU7XG4gICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoXCJjaGVja2VkXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2hlY2tib3guY2hlY2tib3ggPSBmYWxzZTtcbiAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZShcImNoZWNrZWRcIik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBoYW5kbGVUYXNrKCkge1xuICAgICAgICBjb25zdCBsaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi50YXNrLWl0ZW1cIik7XG4gICAgICAgIGxpc3QuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZWRpdC1idG5cIikpIHtcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlRWRpdFRhc2soaXRlbSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJkZWxldGUtYnRuXCIpKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZVRhc2soaXRlbSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJ0YXNrLWJ1dHRvblwiKSkge1xuICAgICAgICAgICAgICAgICAgICB1cGRhdGVTdGF0dXMoaXRlbSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZXhwYW5kVGFza01vZGFsKGUsIGl0ZW0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRUYXNrKGl0ZW0pIHtcbiAgICAgICAgY29uc3QgdGFza1RpdGxlID0gaXRlbS5xdWVyeVNlbGVjdG9yKFwiLnRhc2stdGl0bGVcIikudGV4dENvbnRlbnQ7XG4gICAgICAgIGNvbnN0IHByb2plY3QgPSBnZXRQcm9qZWN0KCk7XG4gICAgICAgIGNvbnN0IHRhc2sgPSBwcm9qZWN0LmdldFRhc2sodGFza1RpdGxlKTtcbiAgICAgICAgcmV0dXJuIHRhc2s7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlU3RhdHVzKGl0ZW0pIHtcbiAgICAgICAgY29uc3QgdGFzayA9IGdldFRhc2soaXRlbSk7XG4gICAgICAgIGNvbnN0IHByb2plY3QgPSBnZXRQcm9qZWN0KCk7XG4gICAgICAgIHRhc2sudXBkYXRlU3RhdHVzKCk7XG4gICAgICAgIGxvYWRUYXNrcyhwcm9qZWN0KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBoYW5kbGVFZGl0VGFzayhpdGVtKSB7XG4gICAgICAgIGNvbnN0IGxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhc2stbGlzdFwiKTtcbiAgICAgICAgY29uc3QgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZWRpdC10YXNrXCIpO1xuICAgICAgICBjb25zdCBzYXZlQnRuID0gZm9ybS5xdWVyeVNlbGVjdG9yKFwiLmVkaXQtdGFzay1idG5cIik7XG4gICAgICAgIGNvbnN0IHRpdGxlID0gZm9ybS5xdWVyeVNlbGVjdG9yKFwiI25hbWVcIik7XG4gICAgICAgIGNvbnN0IGRlc2MgPSBmb3JtLnF1ZXJ5U2VsZWN0b3IoXCIjZGVzY1wiKTtcbiAgICAgICAgY29uc3QgZGF0ZSA9IGZvcm0ucXVlcnlTZWxlY3RvcihcIiNkdWVcIik7XG4gICAgICAgIGNvbnN0IHByaW9yaXR5ID0gZm9ybS5xdWVyeVNlbGVjdG9yKFwiI3ByaVwiKTtcbiAgICAgICAgY29uc3QgdGFzayA9IGdldFRhc2soaXRlbSk7XG5cbiAgICAgICAgdGl0bGUudmFsdWUgPSB0YXNrLmdldFRpdGxlKCk7XG4gICAgICAgIGRlc2MudmFsdWUgPSB0YXNrLmdldERlc2MoKTtcbiAgICAgICAgZGF0ZS52YWx1ZSA9IHRhc2suZ2V0RGF0ZSgpO1xuICAgICAgICBwcmlvcml0eS52YWx1ZSA9IHRhc2suZ2V0UHJpb3JpdHkoKTtcblxuICAgICAgICBsaXN0Lmluc2VydEJlZm9yZShmb3JtLCBpdGVtKTtcbiAgICAgICAgbGlzdC5yZW1vdmVDaGlsZChpdGVtKTtcbiAgICAgICAgdG9nZ2xlVGFza0lucHV0KGZvcm0pO1xuICAgICAgICBzYXZlQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgdXBkYXRlVGFzayhpdGVtKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlVGFzayhpdGVtKSB7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudG9kby1saXN0LWJvZHlcIik7XG4gICAgICAgIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmVkaXQtdGFza1wiKTtcbiAgICAgICAgY29uc3QgdGl0bGUgPSBmb3JtLnF1ZXJ5U2VsZWN0b3IoXCIjbmFtZVwiKTtcbiAgICAgICAgY29uc3QgZGVzY3JpcHRpb24gPSBmb3JtLnF1ZXJ5U2VsZWN0b3IoXCIjZGVzY1wiKTtcbiAgICAgICAgY29uc3QgZGF0ZSA9IGZvcm0ucXVlcnlTZWxlY3RvcihcIiNkdWVcIik7XG4gICAgICAgIGNvbnN0IHByaW9yaXR5ID0gZm9ybS5xdWVyeVNlbGVjdG9yKFwiI3ByaVwiKTtcbiAgICAgICAgY29uc3QgcHJvamVjdCA9IGdldFByb2plY3QoKTtcbiAgICAgICAgY29uc3QgdGFzayA9IGdldFRhc2soaXRlbSk7XG4gICAgICAgIHRhc2suc2V0VGl0bGUodGl0bGUudmFsdWUpO1xuICAgICAgICB0YXNrLnNldERhdGUoZGF0ZS52YWx1ZSk7XG4gICAgICAgIHRhc2suc2V0RGVzYyhkZXNjcmlwdGlvbi52YWx1ZSk7XG4gICAgICAgIHRhc2suc2V0UHJpb3JpdHkocHJpb3JpdHkudmFsdWUpO1xuXG4gICAgICAgIHRvZ2dsZVRhc2tJbnB1dChmb3JtKTtcbiAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGZvcm0pO1xuICAgICAgICBsb2FkUHJvamVjdChwcm9qZWN0KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkZWxldGVUYXNrKGl0ZW0pIHtcbiAgICAgICAgY29uc3QgdGFza1RpdGxlID0gaXRlbS5xdWVyeVNlbGVjdG9yKFwiLnRhc2stdGl0bGVcIikudGV4dENvbnRlbnQ7XG4gICAgICAgIGNvbnN0IHByb2plY3QgPSBnZXRQcm9qZWN0KCk7XG4gICAgICAgIGNvbnN0IHRhc2sgPSBwcm9qZWN0LmdldFRhc2sodGFza1RpdGxlKTtcbiAgICAgICAgVG9kb0xpc3QucmVtb3ZlVGFzayhwcm9qZWN0LCB0YXNrKTtcbiAgICAgICAgbG9hZFRhc2tzKHByb2plY3QpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGV4cGFuZFRhc2tNb2RhbChlLCBpdGVtKSB7XG4gICAgICAgIGNvbnN0IG1vZGFsVGFzayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFzay1leHBhbmQtbW9kYWxcIik7XG4gICAgICAgIGNvbnN0IG1vZGFsT3ZlcmxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubW9kYWwtb3ZlcmxheVwiKTtcbiAgICAgICAgcG9wdWxhdGVUYXNrTW9kYWwobW9kYWxUYXNrLCBpdGVtKTtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwidGFzay1pdGVtXCIpIHx8XG4gICAgICAgICAgICBlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJ0YXNrLXRpdGxlXCIpXG4gICAgICAgICkge1xuICAgICAgICAgICAgbW9kYWxPdmVybGF5LmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XG4gICAgICAgICAgICBtb2RhbFRhc2suY2xhc3NMaXN0LmFkZChcImV4cGFuZFwiKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBjbG9zZVRhc2tNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2xvc2UtYnRuXCIpO1xuICAgICAgICBjbG9zZVRhc2tNb2RhbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGNvbGxhcHNlVGFza01vZGFsKG1vZGFsT3ZlcmxheSwgbW9kYWxUYXNrKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcG9wdWxhdGVUYXNrTW9kYWwobW9kYWxUYXNrLCBpdGVtKSB7XG4gICAgICAgIGNvbnN0IHRhc2sgPSBnZXRUYXNrKGl0ZW0pO1xuICAgICAgICBjb25zdCBodG1sID0gYFxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1vZGFsLWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtb2RhbC1oZWFkaW5nXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0aXRsZVwiIGlkPVwibW9kYWwtdGl0bGVcIj48aDM+JHt0YXNrLmdldFRpdGxlKCl9PC9oMz48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNsb3NlLWJ0blwiPiZ0aW1lczs8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibW9kYWwtYm9keVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGVzY3JpcHRpb25cIj4ke1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFzay5nZXREZXNjKCkgPT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gXCJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogdGFzay5nZXREZXNjKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGFzay1kYXRlXCI+JHt0YXNrLmdldERhdGUoKX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICBgO1xuICAgICAgICBtb2RhbFRhc2suaW5uZXJIVE1MID0gaHRtbDtcbiAgICAgICAgcmV0dXJuIG1vZGFsVGFzaztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjb2xsYXBzZVRhc2tNb2RhbChtb2RhbE92ZXJsYXksIG1vZGFsVGFzaykge1xuICAgICAgICBtb2RhbE92ZXJsYXkuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcbiAgICAgICAgbW9kYWxUYXNrLmNsYXNzTGlzdC5yZW1vdmUoXCJleHBhbmRcIik7XG4gICAgfVxufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgQ29udHJvbGxlcjtcbiIsImltcG9ydCBQcm9qZWN0cyBmcm9tIFwiLi9wcm9qZWN0c1wiO1xuaW1wb3J0IENvbnRyb2xsZXIgZnJvbSBcIi4vY29udHJvbGxlclwiO1xuXG5jb25zdCBUb2RvTGlzdCA9ICgoKSA9PiB7XG4gICAgbGV0IHByb2plY3RzID0gW107XG5cbiAgICBwcm9qZWN0cy5wdXNoKFByb2plY3RzKFwiSW5ib3hcIikpO1xuICAgIHByb2plY3RzLnB1c2goUHJvamVjdHMoXCJUb2RheVwiKSk7XG4gICAgcHJvamVjdHMucHVzaChQcm9qZWN0cyhcIlVwY29taW5nXCIpKTtcbiAgICBwcm9qZWN0cy5wdXNoKFByb2plY3RzKFwiRGVmYXVsdFwiKSk7XG5cbiAgICBjb25zdCBfaW5ib3ggPSBnZXRQcm9qZWN0KFwiSW5ib3hcIik7XG4gICAgY29uc3QgX2RlZmF1bHRQcm9qZWN0ID0gZ2V0UHJvamVjdChcIkRlZmF1bHRcIik7XG5cbiAgICBmdW5jdGlvbiBnZXRJbmJveCgpIHtcbiAgICAgICAgcmV0dXJuIF9pbmJveDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXREZWZhdWx0KCkge1xuICAgICAgICByZXR1cm4gX2RlZmF1bHRQcm9qZWN0O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFByb2plY3RzKCkge1xuICAgICAgICByZXR1cm4gcHJvamVjdHM7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0UHJvamVjdChuYW1lKSB7XG4gICAgICAgIHJldHVybiBwcm9qZWN0cy5maW5kKChwcm9qZWN0KSA9PiBwcm9qZWN0LmdldE5hbWUoKSA9PT0gbmFtZSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWRkUHJvamVjdChwcm9qZWN0KSB7XG4gICAgICAgIHByb2plY3RzLnB1c2gocHJvamVjdCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWRkVGFzayhwcm9qZWN0LCB0YXNrKSB7XG4gICAgICAgIHByb2plY3QuYWRkVGFzayh0YXNrKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZW1vdmVUYXNrKHByb2plY3QsIHRhc2spIHtcbiAgICAgICAgcHJvamVjdC5yZW1vdmVUYXNrKHRhc2spO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIGdldEluYm94LFxuICAgICAgICBnZXREZWZhdWx0LFxuICAgICAgICBnZXRQcm9qZWN0cyxcbiAgICAgICAgZ2V0UHJvamVjdCxcbiAgICAgICAgYWRkUHJvamVjdCxcbiAgICAgICAgYWRkVGFzayxcbiAgICAgICAgcmVtb3ZlVGFzayxcbiAgICB9O1xufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgVG9kb0xpc3Q7XG4iLCJjb25zdCBQcm9qZWN0cyA9IChuYW1lKSA9PiB7XG4gICAgY29uc3QgX25hbWUgPSBuYW1lO1xuICAgIGxldCBfdGFza3MgPSBbXTtcblxuICAgIGNvbnN0IGdldEluZGV4ID0gKG5hbWUpID0+IHtcbiAgICAgICAgcmV0dXJuIF90YXNrcy5maW5kSW5kZXgoKHRhc2spID0+IHRhc2suZ2V0VGl0bGUoKSA9PT0gbmFtZSk7XG4gICAgfTtcblxuICAgIGNvbnN0IGdldE5hbWUgPSAoKSA9PiBfbmFtZTtcblxuICAgIGNvbnN0IHNldE5hbWUgPSAobmFtZSkgPT4gKF9uYW1lID0gbmFtZSk7XG5cbiAgICBjb25zdCBnZXRUYXNrcyA9ICgpID0+IF90YXNrcztcblxuICAgIGNvbnN0IGdldFRhc2sgPSAobmFtZSkgPT4ge1xuICAgICAgICByZXR1cm4gX3Rhc2tzLmZpbmQoKHRhc2spID0+IHRhc2suZ2V0VGl0bGUoKSA9PT0gbmFtZSk7XG4gICAgfTtcblxuICAgIGNvbnN0IGFkZFRhc2sgPSAodGFzaykgPT4ge1xuICAgICAgICBfdGFza3MucHVzaCh0YXNrKTtcbiAgICB9O1xuXG4gICAgY29uc3QgcmVtb3ZlVGFzayA9ICh0YXNrKSA9PiB7XG4gICAgICAgIHJldHVybiAoX3Rhc2tzID0gX3Rhc2tzLmZpbHRlcihcbiAgICAgICAgICAgICh0b2RvKSA9PiB0b2RvLmdldFRpdGxlKCkgIT09IHRhc2suZ2V0VGl0bGUoKVxuICAgICAgICApKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgZ2V0SW5kZXgsXG4gICAgICAgIGdldE5hbWUsXG4gICAgICAgIHNldE5hbWUsXG4gICAgICAgIGdldFRhc2tzLFxuICAgICAgICBnZXRUYXNrLFxuICAgICAgICBhZGRUYXNrLFxuICAgICAgICByZW1vdmVUYXNrLFxuICAgIH07XG59O1xuZXhwb3J0IGRlZmF1bHQgUHJvamVjdHM7XG4iLCJjb25zdCB0b2RvID0gKHRpdGxlLCBkdWVEYXRlLCBkZXNjcmlwdGlvbiwgcHJpb3JpdGl5KSA9PiB7XG4gICAgbGV0IF9zdGF0dXMgPSBmYWxzZTtcblxuICAgIGNvbnN0IGdldFN0YXR1cyA9ICgpID0+IF9zdGF0dXM7XG4gICAgY29uc3QgdXBkYXRlU3RhdHVzID0gKCkgPT4ge1xuICAgICAgICBfc3RhdHVzID0gIV9zdGF0dXM7XG4gICAgfTtcblxuICAgIGNvbnN0IGdldFRpdGxlID0gKCkgPT4gdGl0bGU7XG4gICAgY29uc3Qgc2V0VGl0bGUgPSAodmFsdWUpID0+ICh0aXRsZSA9IHZhbHVlKTtcblxuICAgIGNvbnN0IGdldERlc2MgPSAoKSA9PiBkZXNjcmlwdGlvbjtcbiAgICBjb25zdCBzZXREZXNjID0gKHZhbHVlKSA9PiAoZGVzY3JpcHRpb24gPSB2YWx1ZSk7XG5cbiAgICBjb25zdCBnZXREYXRlID0gKCkgPT4gZHVlRGF0ZTtcbiAgICBjb25zdCBzZXREYXRlID0gKHZhbHVlKSA9PiAoZHVlRGF0ZSA9IHZhbHVlKTtcblxuICAgIGNvbnN0IGdldFByaW9yaXR5ID0gKCkgPT4gcHJpb3JpdGl5O1xuICAgIGNvbnN0IHNldFByaW9yaXR5ID0gKHZhbHVlKSA9PiAocHJpb3JpdGl5ID0gdmFsdWUpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgZ2V0U3RhdHVzLFxuICAgICAgICB1cGRhdGVTdGF0dXMsXG4gICAgICAgIGdldFRpdGxlLFxuICAgICAgICBzZXRUaXRsZSxcbiAgICAgICAgZ2V0RGVzYyxcbiAgICAgICAgc2V0RGVzYyxcbiAgICAgICAgZ2V0RGF0ZSxcbiAgICAgICAgc2V0RGF0ZSxcbiAgICAgICAgZ2V0UHJpb3JpdHksXG4gICAgICAgIHNldFByaW9yaXR5LFxuICAgIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCB0b2RvO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==