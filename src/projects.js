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
export default Projects;
