import { div } from "./shorthand";
import { Todo } from "./todo";
import "./styles.css";
import { Project } from "./project";
import { ProjectList } from "./project-list";
import { Sidebar } from "./sidebar";
import { UserProfile } from "./userProfile";

const container = div("container");
const todos = [
    new Todo("title", "description", "dueDate", "priority", "notes", "checklist"), 
    new Todo("title", "description", "dueDate", "priority", "notes", "checklist"),
    new Todo("title", "description", "dueDate", "priority", "notes", "checklist"),
];

const project = new Project("My Project", todos);

const todos2 = [
    new Todo("MyTodo", "description", "dueDate", "priority", "notes", "checklist"), 
    new Todo("MyTodo", "description", "dueDate", "priority", "notes", "checklist"),
    new Todo("MyTodo", "description", "dueDate", "priority", "notes", "checklist"),
];


const project2 = new Project("My Project2", todos2);
const pList = new ProjectList(project, project2);
container.append(pList.render());

document.body.appendChild(container);
const app = document.querySelector(".app");
const sidebar = new Sidebar(
    new UserProfile("Morris"),
    "123",
    "abc",
    "I love Jesus",
)

container.append(div("sidebar-container").append(sidebar.render()));
// app.appendChild(sidebar.render());
app.appendChild(container);

