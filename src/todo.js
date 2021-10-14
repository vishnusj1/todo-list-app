const todo = (title, dueDate, description, prioritiy) => {
    const getTitle = () => title;
    const setTitle = (value) => (title = value);

    const getDesc = () => description;
    const setDesc = (value) => (description = value);

    const getDate = () => dueDate;
    const setDate = (value) => (dueDate = value);

    const getPriority = () => prioritiy;
    const setPriority = (value) => (prioritiy = value);

    return {
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

export default todo;
