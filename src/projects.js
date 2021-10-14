const Projects = (name) => {
    const _name = name;
    let _tasks = [];

    const getIndex = (name) =>
        _tasks.findIndex((task) => task.getTitle() === name);

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
export default Projects;
