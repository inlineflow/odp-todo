import { ContainedList, Renderable } from "./renderable";
import { div, h3 } from "./shorthand";
import { Todo } from "./todo";

export class Project extends Renderable {
    /**
     * 
     * @param {Todo[]} todos 
     */
    constructor(title, todos) {
        super(todos, title);
        this.title = title;
    }

    toHtml() {
        return div("project-container").append(
            h3(this.title, "project-title"),
        );
    }
}