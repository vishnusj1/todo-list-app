// Object for Todo Item;

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

export default todo;
