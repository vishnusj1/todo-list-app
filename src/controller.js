import Projects from "./projects";
import todo from "./todo";
import todoList from "./index";

const controller = (() => {
    document.addEventListener("DOMContentLoaded", (e) => {
        const projectAddBtn = document.querySelector("#add-btn");
        projectAddBtn.addEventListener("click", addProject);

        const taskAddBtn = document.querySelector("#add-task");
        taskAddBtn.addEventListener("click", openTaskInput);

        loadDefault();
        initProjectButtons();
    });

    function loadDefault() {
        const project = todoList.getDefault();
        populateProjectList(project.getName());
        loadProject(project);
    }

    function loadProject(project) {
        const projectTitle = document.querySelector(".todo-list-header > h2");
        projectTitle.textContent = project.getName();
    }

    function initProjectButtons() {
        // const inbox = document.querySelector("#project-inbox");
        // const today = document.querySelector("#project-today");
        // const week = document.querySelector("#project-week");
        const defaultProject = document.getElementById("project-default");
        const userProjects = document.querySelector(".custom-projects");
        userProjects.addEventListener("click", (e) => {
            if (e.target.classList.contains("user-project")) {
                openProject(e);
            }
        });
        // inbox.addEventListener("click", openProject);
        // today.addEventListener("click", openProject);
        // week.addEventListener("click", openProject);
        defaultProject.addEventListener("click", openProject);
    }

    // function handleProjectSwitch()

    function openProject(e) {
        const projectName = e.target.textContent;
        const project = todoList.getProject(projectName);
        loadProject(project);
    }

    function addProject() {
        const input = document.querySelector("#project-name");
        const projectName = input.value;
        const project = Projects(projectName);

        if (todoList.getProject(projectName)) {
            alert(`${projectName} already exists.`);
            return (input.value = "");
        }

        if (!projectName) {
            return alert("Enter a name for project");
        }

        console.log(todoList.getProjects());
        todoList.addProject(project);
        populateProjectList(projectName);
        input.value = "";
    }

    function populateProjectList(name) {
        const list = document.querySelector(".custom-projects");
        const listItem = document.createElement("li");
        listItem.setAttribute("id", `project-${name.toLowerCase()}`);
        listItem.classList.add("list-item", "user-project");
        listItem.textContent = name;
        list.appendChild(listItem);
    }

    function openTaskInput() {
        const addTask = document.querySelector(".add-task");
        addTask.classList.add("active");
        const taskInput = addTask.querySelector("#task-name");
        const taskName = taskInput.value;

        const addTaskBtn = addTask.querySelector("#add-task");
        addTaskBtn.addEventListener("click", () => {
            addTasks(taskName);
        });
    }

    function addTasks(taskName) {
        const task = todo(taskName);
        const project = document.querySelector(
            ".todo-list-header > h2"
        ).textContent;
        const taask = task.getTitle();
        todoList.addTask(project, task);
        populateTaskList(task);
        console.log(todoList.getProject(project).getTask(taask));
    }
    function populateTaskList(task) {
        const taskList = document.querySelector(".task-list");
        const item = document.createElement("li");
        item.classList.add("task-item");
        const html = `
                    <input class="task-button" type="checkbox"></input>
                    <p class="task-title">${task.getTitle()}</p>
        `;
        item.innerHTML = html;
        taskList.appendChild(item);
    }
    return {
        loadDefault,
        addProject,
    };
})();

export default controller;
