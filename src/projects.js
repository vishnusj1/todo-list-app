// Moudle for projects

const projects = (name) => {
    let tasks = [];

    const getName = () => name;
    const setName = (name) => (this.name = name);

    const getTasks = () => tasks;
    const addTask = (task) => {
        tasks.push(task);
    };

    return {
        getName,
        setName,
        getTasks,
        addTask,
    };
};

export default projects;
