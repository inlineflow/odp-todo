import { Renderable } from "./renderable";
import { div , p, h3, ul, h2, h4, span } from "./shorthand";

/**
 * @typedef {Object} Todo
 * @property {string} title
 * @property {string} description
 * @property {Date} dueDate
 * @property {"low" | "medium" | "high"} priority
 * @property {string[]} notes
 * @property {string[]} checklist
 */
export class Todo extends Renderable {
    /**
     * @param {string} title
     * @param {string} description
     * @param {Date} dueDate
     * @param {"low" | "medium" | "high"} priority
     * @param {string[]} notes
     * @param {string[]} checklist
     */
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
        const priorityClass = `${this.priority}-priority`;


        const elem = 
        div("todo").append(
            h4(this.title, "title"),
            div("todo-description").append(
                p(this.description),
        ),
        div("todo-checklist").append(ul("no-bullet", this.checklist)),
            div("todo-tray").append(
            ul("no-bullet",
                p(this.dueDate),
                p("priority: ").append(
                    span(this.priority).addClass(priorityClass),
                ),
            ) 
            )
        )

        const todoPriorityClass = `todo-${this.priority}-priority`;
        elem.addClass(todoPriorityClass);

        return elem;
    }
}