import { Renderable } from "./renderable";
import { div , p, h3, ul, h2, h4, span, icon, btn } from "./shorthand";
import circleIcon from "../assets/icons/circle.svg"
import pencilIcon from "../assets/icons/pencil.svg"
import noteIcon from "../assets/icons/note.svg"
import commentIcon from "../assets/icons/comment.svg"
import refreshIcon from "../assets/icons/refresh.svg"
import { formatDistance } from 'date-fns'
import bus from "./event-bus";

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
     * @param {Date} dueDate
     * @param {"low" | "medium" | "high"} priority
     * @param {string[]} notes
     */
    new = (...args) => new Todo(...args, this.formatter);
}

export class Todo extends Renderable {
    /**
     * @param {string} title
     * @param {Date} dueDate
     * @param {"low" | "medium" | "high"} priority
     * @param {string[]} notes
     */
    constructor(title, dueDate, priority, notes, formatter=formatDistance) {
        super(div("todo"));
        this.title = title;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
        this.btnComplete = btn(`btn-complete-todo ${this.priority}-priority`);
        this.btnComplete.addEventListener("click", function(e) {
            bus.emit("todo-completed", this);
        })
        this.formatter = formatter;
    }



    toHtml() {
        // const priorityClass = `${this.priority}-priority`;
        const elem = 
        this.container.append(
        div("todo-first-row").append(
            div("todo-title-container").append(
            this.btnComplete.append(icon(circleIcon, "circle-icon")),// + " " + priorityClass)),
            h4(this.title, "title baskerville"),
            ),
            div("todo-icon-tray").append(
                icon(pencilIcon, "pencil-icon"),
                icon(noteIcon, "note-icon"),
                icon(commentIcon, "comment-icon"),
            )
        ),
            div("todo-second-row").append(
                icon(refreshIcon, "due-date-icon"),
                p(this.formatter(this.dueDate, new Date()), "due-date-text brawler"), // TODO: Translate to natural language
            )
        )

        return elem;
    }
}

export const makeTitle = text => 
        div("todo-title-container").append(
            btn(`btn-complete-todo low-priority`).append(
                icon(circleIcon, "circle-icon"),
            ).addHandler("click", function() {
            bus.emit("todo-completed", this);
            }),
            // this.btnComplete.append(icon(circleIcon, "circle-icon")),// + " " + priorityClass)),
            h4(text, "title baskerville"),
            );

export const makeFirstRow = text => div("todo-first-row").append(
        makeTitle(text),
        div("todo-icon-tray").append(
            icon(pencilIcon, "pencil-icon"),
            icon(noteIcon, "note-icon"),
            icon(commentIcon, "comment-icon"),
        )
    );

export const makeSecondRow = (date, formatter) => 
        div("todo-second-row").append(
            icon(refreshIcon, "due-date-icon"),
            p(formatter(date, new Date()), "due-date-text brawler"), // TODO: Translate to natural language
)