/** @import {Todo} from './todo' */
/** @import {Project} from './project' */
import { TodoFactory, Todo } from './todo';
import { Project } from './project'
import sm from './save';
import { isSameDay } from 'date-fns';

/** @type {Todo[]} */
export const todoRepo = [];

/** @type {Project[]}*/
export const projectRepo = [];

function initDefaultTodos() {
    const todos = [
        new Todo("Order a Burger at Nando's for lunch", new Date(2025, 3, 15), "high", ""),
        new Todo("Titlus", new Date(2025, 3, 15), "medium", "notes"),
        new Todo("title", new Date(2025, 3, 15), "low", "notes"),
    ];

    const todos2 = [
        new Todo("MyTodo", new Date(2025, 3, 15), "low", "notes"),
        new Todo("MyTodo", new Date(2025, 3, 15), "high", "notes"),
        new Todo("MyTodo", new Date(2025, 3, 15), "medium", "notes"),
    ];

    const todos3 = [
        new Todo("ToToDo", new Date(), "high", "notes")
    ];

    todoRepo.push(...todos, ...todos2, ...todos3);
}

function initDefaultProjects() {
    const project = new Project("My Project", todoRepo.slice(0, 2), { allowDelete: false, allowSave: false, synthtetic: false });
    const project2 = new Project("My Project2", todoRepo.slice(2, 4), { allowSave: false, synthtetic: false });
    const project3 = new Project("All Today", [todoRepo[5]], { allowSave: false, synthetic: true });
    projectRepo.push(project, project2, project3);
}



export function initRepos() {
    const tf = new TodoFactory();
    const todoObjs = JSON.parse(sm.load("todos"))
    if (!todoObjs) {
        initDefaultTodos()
    }

    let todos;

    if (todoObjs) {
        todos = todoObjs.map(t => tf.new(t.title, t.dueDate, t.priority, t.notes));
        if (todos.length !== 0) {
            //todoRepo.push(...todos);
        }
    }

    const projects = JSON.parse(sm.load("projects"))
    if (!projects) {
        initDefaultProjects()
    }

    console.log(todos)
}

//export function loadProjectRepo(key) {
//    sm.load(key);
//}
