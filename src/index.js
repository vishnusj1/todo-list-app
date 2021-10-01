import Projects from "./projects";
import Controller from "./controller";

const TodoList = (() => {
    let projects = [];

    projects.push(Projects("Default"));

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

export default TodoList;
