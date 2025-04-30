import { Todo, TodoFactory } from "./todo";
import "./styles.css";
import { Project } from "./project";
import { parseProjectList, ProjectList } from "./project-list";
import { Sidebar } from "./sidebar";
import { UserProfile } from "./userProfile";
import { formatDistance } from "date-fns";
import { App } from "./app";
import sm from "./save";

const tf = new TodoFactory(formatDistance);
const x = tf.new("Titlus",  new Date(2025, 3, 15), "medium", "notes");

const todos = [
    new Todo("Order a Burger at Nando's for lunch", new Date(2025, 3, 15) , "high", ""), 
    x,
    new Todo("title",  new Date(2025, 3, 15), "low", "notes"),
];


const project = new Project("My Project", todos);

const todos2 = [
    new Todo("MyTodo", new Date(2025, 3, 15), "low", "notes"), 
    new Todo("MyTodo", new Date(2025, 3, 15), "high", "notes"),
    new Todo("MyTodo", new Date(2025, 3, 15), "medium", "notes"),
];


const project2 = new Project("My Project2", todos2);
let pList = new ProjectList("Today", project, project2);
const defaultApp = new App();
const sidebar = new Sidebar( {
    "user-profile": {html: new UserProfile("Morris"), render: () => console.log("WIP")},
    "my-projects": {html: "My Projects", render: () => console.log("WIP")},
    "today": {html: "Today", render: () => console.log("WIP")},
    "upcoming": {html: "Upcoming", render: () => console.log("WIP")},
},
);


// defaultApp.addChildren(sidebar, pList);
// defaultApp.render();
if(localStorage.getItem("Today") !== null) {
    pList = parseProjectList(sm.load("Today"));
}

defaultApp.addChildren(sidebar, pList);
defaultApp.render();