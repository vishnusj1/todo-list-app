import todo from "./todo";
import projects from "./projects";

const task = todo("water plants", "water the plants", "12-12-2000", "1");

const project = projects("default");
const inbox = projects("inbox");

project.addTask(task);
console.log(project.getTasks());
