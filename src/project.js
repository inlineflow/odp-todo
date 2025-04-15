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
    }

    // toHtml() {
    //     return super.toHtml().append(
    //         // h3(this.title, "project-title"),
    //     );
    // }
}