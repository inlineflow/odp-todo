import { AddTodo } from "./btn-addTodo";
import { ContainedList, Renderable } from "./renderable";
import { div, h3 } from "./shorthand";
import { Todo } from "./todo";

export class Project extends ContainedList {
    /**
     * 
     * @param {Todo[]} todos 
     */
    constructor(title, todos) {
        super(todos, title, "project", "project-todos");
        this.title = title;
        this.append(new AddTodo());
    }

}