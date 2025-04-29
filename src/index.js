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
const sidebar = new Sidebar(
        new UserProfile("Morris"),
        "My Projects",
        "Today",
        "Upcoming",
);


// defaultApp.addChildren(sidebar, pList);
// defaultApp.render();
if(localStorage.getItem("Today") !== null) {
    pList = parseProjectList(sm.load("Today"));
    // const obj = JSON.parse(sm.load("Today"))
    // /**
    //  * @type {Project[]}
    //  */
    // const projects = [];
    // obj.children.forEach(el => {
    //     // console.log(el);
    //     const todos = Array.from(el.children, ch => new Todo(ch.title, ch.dueDate, ch.priority, [], formatDistance));
    //     const project = new Project(el.title, todos);
    //     // console.log(todos);
    //    projects.push(project);
        
    // });
    // // while (obj.children) {
    // //     console.log(obj.children);
    // //     obj = obj.children[0];
        
    // // }
    // // const pList = new ProjectList(obj.title, obj.children);
    // console.log(obj);
    // pList = new ProjectList(obj.title, ...projects);
    
    // pList = 
}

defaultApp.addChildren(sidebar, pList);
defaultApp.render();