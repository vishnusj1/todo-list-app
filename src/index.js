import todo from "./todo";
import Projects from "./projects";
import controller from "./controller";

const todoList = (() => {
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

    function addTask(projectName, task) {
        const project = getProject(projectName);
        project.addTask(task);
        // console.log(getProject(projectName).getTasks());
    }

    return {
        getDefault,
        getProjects,
        getProject,
        addProject,
        addTask,
    };
})();

export default todoList;
