import { Renderable } from "./renderable";
import { div , p, h3, ul } from "./shorthand";

/**
 * @typedef {Object} Todo
 * @property {string} title
 * @property {string} title
 * @property {string} description
 * @property {Date} dueDate
 * @property {"low" | "medium" | "high"} priority
 * @property {string[]} notes
 * @property {string[]} checklist
 */

export class Todo extends Renderable {
    constructor(title, description, dueDate, priority, notes, checklist) {
        super();
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
        this.checklist = checklist;
    }

    toHtml() {
        const elem = 
        div("todo-item").append(
            h3(this.title),
            div("todo-container").append(
                p(this.description, ["todo-item-description"]),
                ul("no-bullet", this.notes),
        ),
        div("todo-item-checklist").append(ul(this.checklist)),
            div("todo-item-tray").append(
            ul("no-bullet",
                p(this.dueDate),
                p(this.priority),
            ) 
            )
        )

        return elem;
    }
}