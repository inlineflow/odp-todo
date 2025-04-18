import { Renderable } from "./renderable";
import { div , p, h3, ul, h2, h4, span, icon } from "./shorthand";
import pencilIcon from "../assets/icons/pencil.svg"
import noteIcon from "../assets/icons/note.svg"
import commentIcon from "../assets/icons/comment.svg"
import refreshIcon from "../assets/icons/refresh.svg"
import { formatDistance } from 'date-fns'

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
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
    }

    // formatter = //new Intl.DateTimeFormat('en-GB');


    toHtml() {
        const priorityClass = `${this.priority}-priority`;
        const elem = 
        div("todo").append(
        div("todo-first-row").append(
            h4(this.title, "title baskerville"),
            div("todo-icon-tray").append(
                icon(pencilIcon),
                icon(noteIcon),
                icon(commentIcon, "comment-icon"),
            )
        ),
            div("todo-tray").append(
                icon(refreshIcon, "icon-container"),
                p(formatDistance(this.dueDate, new Date()), "brawler"), // TODO: Translate to natural language
            )
        )

        // const todoPriorityClass = `todo-${this.priority}-priority`;
        // elem.addClass(todoPriorityClass);

        return elem;
    }
}