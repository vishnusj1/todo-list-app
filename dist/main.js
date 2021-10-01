/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/controller.js":
/*!***************************!*\
  !*** ./src/controller.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _projects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./projects */ "./src/projects.js");
/* harmony import */ var _projects__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_projects__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _todo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./todo */ "./src/todo.js");
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index */ "./src/index.js");




const controller = (() => {
    document.addEventListener("DOMContentLoaded", (e) => {
        const projectAddBtn = document.querySelector("#add-btn");
        projectAddBtn.addEventListener("click", addProject);

        const taskInput = document.querySelector("#task-input");
        taskInput.addEventListener("click", toggleTaskInput);

        const addTaskBtn = document.querySelector("#add-task");
        addTaskBtn.addEventListener("click", addTask);

        loadDefault();
        initProjectButtons();
    });

    function loadDefault() {
        const project = _index__WEBPACK_IMPORTED_MODULE_2__["default"].getDefault();
        populateProjectList(project);
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
    }

    function initProjectButtons() {
        const userProjects = document.querySelector(".custom-projects");
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
        const project = _projects__WEBPACK_IMPORTED_MODULE_0___default()(projectName);

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

    function populateProjectList(project) {
        const list = document.querySelector(".custom-projects");
        const listItem = document.createElement("li");
        const projectName = project.getName();
        listItem.setAttribute("id", `project-${projectName.toLowerCase()}`);
        listItem.classList.add("list-item", "user-project");
        listItem.textContent = projectName;
        list.appendChild(listItem);
    }

    function toggleTaskInput() {
        const inputDiv = document.querySelector(".add-task");
        if (inputDiv.classList.contains("active")) {
            inputDiv.classList.remove("active");
        } else {
            inputDiv.classList.add("active");
        }
    }

    function addTask() {
        const input = document.querySelector("#task-name");
        const taskName = input.value;
        const task = (0,_todo__WEBPACK_IMPORTED_MODULE_1__["default"])(taskName);
        const projectName = document.querySelector(
            ".todo-list-header > h2"
        ).textContent;
        const project = _index__WEBPACK_IMPORTED_MODULE_2__["default"].getProject(projectName);

        if (!taskName) {
            return;
        }
        toggleTaskInput();
        input.value = "";
        _index__WEBPACK_IMPORTED_MODULE_2__["default"].addTask(project, task);
        loadTasks(project);
    }

    function populateTaskList(task) {
        const list = document.querySelector(".task-list");
        const item = document.createElement("li");
        item.classList.add("task-item");
        const html = `
                    <input class="task-button" type="checkbox"></input>
                    <p class="task-title">${task.getTitle()}</p>
        `;
        item.innerHTML = html;
        list.appendChild(item);
    }

    function clearList() {
        const list = document.querySelector(".task-list");
        list.innerHTML = "";
    }
})();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (controller);


/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _projects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./projects */ "./src/projects.js");
/* harmony import */ var _projects__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_projects__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _todo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./todo */ "./src/todo.js");
/* harmony import */ var _controller__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./controller */ "./src/controller.js");




const todoList = (() => {
    let projects = [];

    projects.push(_projects__WEBPACK_IMPORTED_MODULE_0___default()("Default"));

    const _defaultProject = getProject("Default");

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

    return {
        getDefault,
        getProjects,
        getProject,
        addProject,
        addTask,
    };
})();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (todoList);


/***/ }),

/***/ "./src/projects.js":
/*!*************************!*\
  !*** ./src/projects.js ***!
  \*************************/
/***/ (() => {

const Projects = (name) => {
    const _name = name;
    const _tasks = [];

    const getName = () => _name;

    const setName = (name) => (_name = name);

    const getTasks = () => _tasks;

    const getTask = (name) => {
        return _tasks.find((task) => task.getTitle() === name);
    };

    const addTask = (task) => {
        _tasks.push(task);
    };

    return {
        getName,
        setName,
        getTasks,
        getTask,
        addTask,
    };
};


/***/ }),

/***/ "./src/todo.js":
/*!*********************!*\
  !*** ./src/todo.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const todo = (title, description, dueDate, priotiy) => {
    const getTitle = () => title;
    const getDesc = () => description;
    const getDue = () => dueDate;
    const getPriority = () => priotiy;
    return {
        getTitle,
        getDesc,
        getDue,
        getPriority,
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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBa0M7QUFDUjtBQUNLOztBQUUvQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQSx3QkFBd0IseURBQW1CO0FBQzNDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQSx3QkFBd0IseURBQW1CO0FBQzNDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGdEQUFROztBQUVoQyxZQUFZLHlEQUFtQjtBQUMvQixxQkFBcUIsYUFBYTtBQUNsQztBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxRQUFRLHlEQUFtQjtBQUMzQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQ0FBK0MsMEJBQTBCO0FBQ3pFO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsaURBQUk7QUFDekI7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHlEQUFtQjs7QUFFM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsc0RBQWdCO0FBQ3hCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNENBQTRDLGdCQUFnQjtBQUM1RDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQsaUVBQWUsVUFBVSxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2hJUTtBQUNSO0FBQ1k7O0FBRXRDO0FBQ0E7O0FBRUEsa0JBQWtCLGdEQUFROztBQUUxQjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRCxpRUFBZSxRQUFRLEVBQUM7Ozs7Ozs7Ozs7O0FDeEN4QjtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpRUFBZSxJQUFJLEVBQUM7Ozs7Ozs7VUNicEI7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlDQUFpQyxXQUFXO1dBQzVDO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1VFTkE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QtYXBwLy4vc3JjL2NvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0LWFwcC8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QtYXBwLy4vc3JjL3Byb2plY3RzLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC1hcHAvLi9zcmMvdG9kby5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QtYXBwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8tbGlzdC1hcHAvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vdG9kby1saXN0LWFwcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0LWFwcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG8tbGlzdC1hcHAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvLWxpc3QtYXBwL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vdG9kby1saXN0LWFwcC93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vdG9kby1saXN0LWFwcC93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFByb2plY3RzIGZyb20gXCIuL3Byb2plY3RzXCI7XG5pbXBvcnQgdG9kbyBmcm9tIFwiLi90b2RvXCI7XG5pbXBvcnQgdG9kb0xpc3QgZnJvbSBcIi4vaW5kZXhcIjtcblxuY29uc3QgY29udHJvbGxlciA9ICgoKSA9PiB7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKGUpID0+IHtcbiAgICAgICAgY29uc3QgcHJvamVjdEFkZEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYWRkLWJ0blwiKTtcbiAgICAgICAgcHJvamVjdEFkZEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYWRkUHJvamVjdCk7XG5cbiAgICAgICAgY29uc3QgdGFza0lucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0YXNrLWlucHV0XCIpO1xuICAgICAgICB0YXNrSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRvZ2dsZVRhc2tJbnB1dCk7XG5cbiAgICAgICAgY29uc3QgYWRkVGFza0J0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYWRkLXRhc2tcIik7XG4gICAgICAgIGFkZFRhc2tCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGFkZFRhc2spO1xuXG4gICAgICAgIGxvYWREZWZhdWx0KCk7XG4gICAgICAgIGluaXRQcm9qZWN0QnV0dG9ucygpO1xuICAgIH0pO1xuXG4gICAgZnVuY3Rpb24gbG9hZERlZmF1bHQoKSB7XG4gICAgICAgIGNvbnN0IHByb2plY3QgPSB0b2RvTGlzdC5nZXREZWZhdWx0KCk7XG4gICAgICAgIHBvcHVsYXRlUHJvamVjdExpc3QocHJvamVjdCk7XG4gICAgICAgIGxvYWRQcm9qZWN0KHByb2plY3QpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxvYWRQcm9qZWN0KHByb2plY3QpIHtcbiAgICAgICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRvZG8tbGlzdC1oZWFkZXIgPiBoMlwiKTtcbiAgICAgICAgdGl0bGUudGV4dENvbnRlbnQgPSBwcm9qZWN0LmdldE5hbWUoKTtcbiAgICAgICAgbG9hZFRhc2tzKHByb2plY3QpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxvYWRUYXNrcyhwcm9qZWN0KSB7XG4gICAgICAgIGNsZWFyTGlzdCgpO1xuICAgICAgICBjb25zdCB0YXNrcyA9IHByb2plY3QuZ2V0VGFza3MoKTtcbiAgICAgICAgdGFza3MuZm9yRWFjaCgodGFzaykgPT4ge1xuICAgICAgICAgICAgcG9wdWxhdGVUYXNrTGlzdCh0YXNrKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5pdFByb2plY3RCdXR0b25zKCkge1xuICAgICAgICBjb25zdCB1c2VyUHJvamVjdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmN1c3RvbS1wcm9qZWN0c1wiKTtcbiAgICAgICAgdXNlclByb2plY3RzLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgICAgICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcInVzZXItcHJvamVjdFwiKSkge1xuICAgICAgICAgICAgICAgIG9wZW5Qcm9qZWN0KGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvcGVuUHJvamVjdChlKSB7XG4gICAgICAgIGNvbnN0IHByb2plY3ROYW1lID0gZS50YXJnZXQudGV4dENvbnRlbnQ7XG4gICAgICAgIGNvbnN0IHByb2plY3QgPSB0b2RvTGlzdC5nZXRQcm9qZWN0KHByb2plY3ROYW1lKTtcbiAgICAgICAgbG9hZFByb2plY3QocHJvamVjdCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWRkUHJvamVjdCgpIHtcbiAgICAgICAgY29uc3QgaW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2plY3QtbmFtZVwiKTtcbiAgICAgICAgY29uc3QgcHJvamVjdE5hbWUgPSBpbnB1dC52YWx1ZTtcbiAgICAgICAgY29uc3QgcHJvamVjdCA9IFByb2plY3RzKHByb2plY3ROYW1lKTtcblxuICAgICAgICBpZiAodG9kb0xpc3QuZ2V0UHJvamVjdChwcm9qZWN0TmFtZSkpIHtcbiAgICAgICAgICAgIGFsZXJ0KGAke3Byb2plY3ROYW1lfSBhbHJlYWR5IGV4aXN0cy5gKTtcbiAgICAgICAgICAgIHJldHVybiAoaW5wdXQudmFsdWUgPSBcIlwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghcHJvamVjdE5hbWUpIHtcbiAgICAgICAgICAgIHJldHVybiBhbGVydChcIkVudGVyIGEgbmFtZSBmb3IgcHJvamVjdFwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRvZG9MaXN0LmFkZFByb2plY3QocHJvamVjdCk7XG4gICAgICAgIHBvcHVsYXRlUHJvamVjdExpc3QocHJvamVjdCk7XG4gICAgICAgIGlucHV0LnZhbHVlID0gXCJcIjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwb3B1bGF0ZVByb2plY3RMaXN0KHByb2plY3QpIHtcbiAgICAgICAgY29uc3QgbGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY3VzdG9tLXByb2plY3RzXCIpO1xuICAgICAgICBjb25zdCBsaXN0SXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcbiAgICAgICAgY29uc3QgcHJvamVjdE5hbWUgPSBwcm9qZWN0LmdldE5hbWUoKTtcbiAgICAgICAgbGlzdEl0ZW0uc2V0QXR0cmlidXRlKFwiaWRcIiwgYHByb2plY3QtJHtwcm9qZWN0TmFtZS50b0xvd2VyQ2FzZSgpfWApO1xuICAgICAgICBsaXN0SXRlbS5jbGFzc0xpc3QuYWRkKFwibGlzdC1pdGVtXCIsIFwidXNlci1wcm9qZWN0XCIpO1xuICAgICAgICBsaXN0SXRlbS50ZXh0Q29udGVudCA9IHByb2plY3ROYW1lO1xuICAgICAgICBsaXN0LmFwcGVuZENoaWxkKGxpc3RJdGVtKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0b2dnbGVUYXNrSW5wdXQoKSB7XG4gICAgICAgIGNvbnN0IGlucHV0RGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hZGQtdGFza1wiKTtcbiAgICAgICAgaWYgKGlucHV0RGl2LmNsYXNzTGlzdC5jb250YWlucyhcImFjdGl2ZVwiKSkge1xuICAgICAgICAgICAgaW5wdXREaXYuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlucHV0RGl2LmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhZGRUYXNrKCkge1xuICAgICAgICBjb25zdCBpbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGFzay1uYW1lXCIpO1xuICAgICAgICBjb25zdCB0YXNrTmFtZSA9IGlucHV0LnZhbHVlO1xuICAgICAgICBjb25zdCB0YXNrID0gdG9kbyh0YXNrTmFtZSk7XG4gICAgICAgIGNvbnN0IHByb2plY3ROYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgICAgIFwiLnRvZG8tbGlzdC1oZWFkZXIgPiBoMlwiXG4gICAgICAgICkudGV4dENvbnRlbnQ7XG4gICAgICAgIGNvbnN0IHByb2plY3QgPSB0b2RvTGlzdC5nZXRQcm9qZWN0KHByb2plY3ROYW1lKTtcblxuICAgICAgICBpZiAoIXRhc2tOYW1lKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdG9nZ2xlVGFza0lucHV0KCk7XG4gICAgICAgIGlucHV0LnZhbHVlID0gXCJcIjtcbiAgICAgICAgdG9kb0xpc3QuYWRkVGFzayhwcm9qZWN0LCB0YXNrKTtcbiAgICAgICAgbG9hZFRhc2tzKHByb2plY3QpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBvcHVsYXRlVGFza0xpc3QodGFzaykge1xuICAgICAgICBjb25zdCBsaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50YXNrLWxpc3RcIik7XG4gICAgICAgIGNvbnN0IGl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XG4gICAgICAgIGl0ZW0uY2xhc3NMaXN0LmFkZChcInRhc2staXRlbVwiKTtcbiAgICAgICAgY29uc3QgaHRtbCA9IGBcbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwidGFzay1idXR0b25cIiB0eXBlPVwiY2hlY2tib3hcIj48L2lucHV0PlxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cInRhc2stdGl0bGVcIj4ke3Rhc2suZ2V0VGl0bGUoKX08L3A+XG4gICAgICAgIGA7XG4gICAgICAgIGl0ZW0uaW5uZXJIVE1MID0gaHRtbDtcbiAgICAgICAgbGlzdC5hcHBlbmRDaGlsZChpdGVtKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjbGVhckxpc3QoKSB7XG4gICAgICAgIGNvbnN0IGxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhc2stbGlzdFwiKTtcbiAgICAgICAgbGlzdC5pbm5lckhUTUwgPSBcIlwiO1xuICAgIH1cbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IGNvbnRyb2xsZXI7XG4iLCJpbXBvcnQgUHJvamVjdHMgZnJvbSBcIi4vcHJvamVjdHNcIjtcbmltcG9ydCB0b2RvIGZyb20gXCIuL3RvZG9cIjtcbmltcG9ydCBjb250cm9sbGVyIGZyb20gXCIuL2NvbnRyb2xsZXJcIjtcblxuY29uc3QgdG9kb0xpc3QgPSAoKCkgPT4ge1xuICAgIGxldCBwcm9qZWN0cyA9IFtdO1xuXG4gICAgcHJvamVjdHMucHVzaChQcm9qZWN0cyhcIkRlZmF1bHRcIikpO1xuXG4gICAgY29uc3QgX2RlZmF1bHRQcm9qZWN0ID0gZ2V0UHJvamVjdChcIkRlZmF1bHRcIik7XG5cbiAgICBmdW5jdGlvbiBnZXREZWZhdWx0KCkge1xuICAgICAgICByZXR1cm4gX2RlZmF1bHRQcm9qZWN0O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFByb2plY3RzKCkge1xuICAgICAgICByZXR1cm4gcHJvamVjdHM7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0UHJvamVjdChuYW1lKSB7XG4gICAgICAgIHJldHVybiBwcm9qZWN0cy5maW5kKChwcm9qZWN0KSA9PiBwcm9qZWN0LmdldE5hbWUoKSA9PT0gbmFtZSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWRkUHJvamVjdChwcm9qZWN0KSB7XG4gICAgICAgIHByb2plY3RzLnB1c2gocHJvamVjdCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWRkVGFzayhwcm9qZWN0LCB0YXNrKSB7XG4gICAgICAgIHByb2plY3QuYWRkVGFzayh0YXNrKTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBnZXREZWZhdWx0LFxuICAgICAgICBnZXRQcm9qZWN0cyxcbiAgICAgICAgZ2V0UHJvamVjdCxcbiAgICAgICAgYWRkUHJvamVjdCxcbiAgICAgICAgYWRkVGFzayxcbiAgICB9O1xufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgdG9kb0xpc3Q7XG4iLCJjb25zdCBQcm9qZWN0cyA9IChuYW1lKSA9PiB7XG4gICAgY29uc3QgX25hbWUgPSBuYW1lO1xuICAgIGNvbnN0IF90YXNrcyA9IFtdO1xuXG4gICAgY29uc3QgZ2V0TmFtZSA9ICgpID0+IF9uYW1lO1xuXG4gICAgY29uc3Qgc2V0TmFtZSA9IChuYW1lKSA9PiAoX25hbWUgPSBuYW1lKTtcblxuICAgIGNvbnN0IGdldFRhc2tzID0gKCkgPT4gX3Rhc2tzO1xuXG4gICAgY29uc3QgZ2V0VGFzayA9IChuYW1lKSA9PiB7XG4gICAgICAgIHJldHVybiBfdGFza3MuZmluZCgodGFzaykgPT4gdGFzay5nZXRUaXRsZSgpID09PSBuYW1lKTtcbiAgICB9O1xuXG4gICAgY29uc3QgYWRkVGFzayA9ICh0YXNrKSA9PiB7XG4gICAgICAgIF90YXNrcy5wdXNoKHRhc2spO1xuICAgIH07XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBnZXROYW1lLFxuICAgICAgICBzZXROYW1lLFxuICAgICAgICBnZXRUYXNrcyxcbiAgICAgICAgZ2V0VGFzayxcbiAgICAgICAgYWRkVGFzayxcbiAgICB9O1xufTtcbiIsImNvbnN0IHRvZG8gPSAodGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvdGl5KSA9PiB7XG4gICAgY29uc3QgZ2V0VGl0bGUgPSAoKSA9PiB0aXRsZTtcbiAgICBjb25zdCBnZXREZXNjID0gKCkgPT4gZGVzY3JpcHRpb247XG4gICAgY29uc3QgZ2V0RHVlID0gKCkgPT4gZHVlRGF0ZTtcbiAgICBjb25zdCBnZXRQcmlvcml0eSA9ICgpID0+IHByaW90aXk7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgZ2V0VGl0bGUsXG4gICAgICAgIGdldERlc2MsXG4gICAgICAgIGdldER1ZSxcbiAgICAgICAgZ2V0UHJpb3JpdHksXG4gICAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHRvZG87XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=