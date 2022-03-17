import Projects from './projects';
import Controller from './controller';

const TodoList = (() => {
  let projects = [];

  projects.push(Projects('Inbox'));
  projects.push(Projects('Today'));
  projects.push(Projects('Upcoming'));
  projects.push(Projects('Default'));

  const _inbox = getProject('Inbox');
  const _defaultProject = getProject('Default');

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

export default TodoList;
