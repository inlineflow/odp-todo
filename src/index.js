import { div } from "./shorthand";
import { Todo } from "./todo";
import "./styles.css";

const container = div("container");
const todo = new Todo("title", "description", "dueDate", "priority", "notes", "checklist");
container.append(todo.toHtml());

document.body.appendChild(container);