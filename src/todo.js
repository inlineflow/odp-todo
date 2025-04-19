import { Renderable } from "./renderable";
import { div , p, h3, ul, h2, h4, span, icon, btn } from "./shorthand";
import circleIcon from "../assets/icons/circle.svg"
import pencilIcon from "../assets/icons/pencil.svg"
import noteIcon from "../assets/icons/note.svg"
import commentIcon from "../assets/icons/comment.svg"
import refreshIcon from "../assets/icons/refresh.svg"
import { formatDistance } from 'date-fns'

/**
 * @typedef {Object} Todo
 * @property {string} title
 * @property {Date} dueDate
 * @property {"low" | "medium" | "high"} priority
 * @property {string[]} notes
 */

/**
 * @typedef {Object} DateFormatter
 * @property {(targetDate: Date) => string} format - returns the ETA until the targetDate. the date for comparison is based on the specific formatter provided
 */

export class TodoFactory {
    /**
     * @param {DateFormatter} formatter - an object for formatting the date, has to have format
     */
    constructor(formatter) {
        this.formatter = formatter;
    }


    /**
     * @param {string} title
     * @param {string} description
     * @param {Date} dueDate
     * @param {"low" | "medium" | "high"} priority
     * @param {string[]} notes
     * @param {string[]} checklist
     */
    new = (...args) => new Todo(...args, this.formatter);
}

export class Todo extends Renderable {
    /**
     * @param {string} title
     * @param {string} description
     * @param {Date} dueDate
     * @param {"low" | "medium" | "high"} priority
     * @param {string[]} notes
     * @param {string[]} checklist
     */
    constructor(title, dueDate, priority, notes) {
        super();
        this.title = title;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
        this.btnComplete = btn(`btn-complete-todo ${this.priority}-priority`);
        this.btnComplete.addEventListener("click", function(e) {
            const ev = new CustomEvent("todo-completed", {
                bubbles: true,
            });
            this.dispatchEvent(ev);
        })
        // this.btnComplete.addEventListener("click", (e) => console.log("child"));
    }

    // formatter = //new Intl.DateTimeFormat('en-GB');


    toHtml() {
        // const priorityClass = `${this.priority}-priority`;
        const elem = 
        div("todo").append(
        div("todo-first-row").append(
            div("cont").append(
            this.btnComplete.append(icon(circleIcon, "circle-icon")),// + " " + priorityClass)),
            h4(this.title, "title baskerville"),
            ),
            div("todo-icon-tray").append(
                icon(pencilIcon, "pencil-icon"),
                icon(noteIcon, "note-icon"),
                icon(commentIcon, "comment-icon"),
            )
        ),
            div("todo-tray").append(
                icon(refreshIcon, "icon-container"),
                p(formatDistance(this.dueDate, new Date()), "brawler"), // TODO: Translate to natural language
            )
        )

        return elem;
    }
}