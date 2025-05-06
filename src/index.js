import { Todo, TodoFactory } from "./todo";
import "./styles.css";
import { Project, ProjectFactory } from "./project";
import { parseProjectList, ProjectList } from "./project-list";
import { Sidebar } from "./sidebar";
import { UserProfile } from "./userProfile";
import { formatDistance } from "date-fns";
import { App } from "./app";
import sm from "./save";
import {projectRepo, todoRepo} from "./repos";

window.todoRepo = todoRepo;
window.projectRepo = projectRepo;
const tf = new TodoFactory(formatDistance);
const pf = new ProjectFactory();
const x = tf.new("Titlus",  new Date(2025, 3, 15), "medium", "notes");

const todos = [
    tf.new("Order a Burger at Nando's for lunch", new Date(2025, 3, 15) , "high", ""), 
    x,
    tf.new("title",  new Date(2025, 3, 15), "low", "notes"),
];


const project = pf.new("My Project", todos, {allowDelete: true});

const todos2 = [
    tf.new ("MyTodo", new Date(2025, 3, 15), "low", "notes"), 
    tf.new ("MyTodo", new Date(2025, 3, 15), "high", "notes"),
    tf.new ("MyTodo", new Date(2025, 3, 15), "medium", "notes"),
];


const project2 = pf.new("My Project2", todos2);
const project3 = pf.new("All Today", [tf.new("ToToDo", new Date(), "high", "notes")])
let pList = new ProjectList("Today", project, project2, project3);
window.pList = pList;
const defaultApp = new App();
const sidebar = new Sidebar( {
    "user-profile": {markup: new UserProfile("Morris"), pList: () => {}},
    "my-projects": {markup: "My Projects", pList: () => new ProjectList("My Projects", projectRepo)},
    "today": {markup: "Today", pList: () => {
        const projects = projectRepo.filter(el => el.todos.every(todo => todo.dueDate === new Date()));
        return projects;
    }},
    "upcoming": {markup: "Upcoming", render: () => console.log("WIP")},
},
);


// defaultApp.addChildren(sidebar, pList);
// defaultApp.render();
if(localStorage.getItem("Today") !== null) {
    pList = parseProjectList(sm.load("Today"));
}

defaultApp.addChildren(sidebar, pList);
defaultApp.render();