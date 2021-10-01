import Projects from "./projects";
import todo from "./todo";
import TodoList from "./index";

const Controller = (() => {
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
        const project = TodoList.getDefault();
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
        const project = TodoList.getProject(projectName);
        loadProject(project);
    }

    function addProject() {
        const input = document.querySelector("#project-name");
        const projectName = input.value;
        const project = Projects(projectName);

        if (TodoList.getProject(projectName)) {
            alert(`${projectName} already exists.`);
            return (input.value = "");
        }

        if (!projectName) {
            return alert("Enter a name for project");
        }

        TodoList.addProject(project);
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
        const task = todo(taskName);
        const projectName = document.querySelector(
            ".todo-list-header > h2"
        ).textContent;
        const project = TodoList.getProject(projectName);

        if (!taskName) {
            return;
        }
        toggleTaskInput();
        input.value = "";
        TodoList.addTask(project, task);
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

export default Controller;
