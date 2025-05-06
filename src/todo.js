import { Renderable } from "./renderable";
import { div , p, h3, ul, h2, h4, span, icon, btn } from "./shorthand";
import circleIcon from "../assets/icons/circle.svg"
import pencilIcon from "../assets/icons/pencil.svg"
import noteIcon from "../assets/icons/note.svg"
import commentIcon from "../assets/icons/comment.svg"
import refreshIcon from "../assets/icons/refresh.svg"
import { formatDistance } from 'date-fns'
import bus from "./event-bus";
import {todoRepo} from "./repos";

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
    new = (...args) =>{
        const todo = new Todo(...args, this.formatter);
        todoRepo.push(todo);
        return todo;
    }
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
        this.id = crypto.randomUUID();
        this.container.setAttr("todo-id", this.id);
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

    toJSON() {
        const title = this.title;
        const dueDate = this.dueDate;
        const priority = this.priority;
        const res = {title, dueDate, priority};
        return res;
    }
}

export const makeTitle = (text, disableCompleteTab=false) =>  {
        const button = btn(`btn-complete-todo low-priority`).append(
                icon(circleIcon, "circle-icon"),
            ).addHandler("click", function() {
            bus.emit("todo-completed", this);
            });

        if(disableCompleteTab) {
            button.setAttr("tabindex", -1);
        }

        const elem = div("todo-title-container").append(
            button,
            // this.btnComplete.append(icon(circleIcon, "circle-icon")),// + " " + priorityClass)),
            h4(text, "title baskerville"),
            );

        return elem;
}

export const makeFirstRow = (text, {includeIcons=true, disableCompleteTab=false}) => {
    const elem = div("todo-first-row").append(
        makeTitle(text, disableCompleteTab));
        if (includeIcons) {
            elem.append(div("todo-icon-tray").append(
                icon(pencilIcon, "pencil-icon"),
                icon(noteIcon, "note-icon"),
                icon(commentIcon, "comment-icon"),
            ));
        }
        return elem;
};

export const makeSecondRow = (date, formatter) => 
        div("todo-second-row").append(
            icon(refreshIcon, "due-date-icon"),
            p(formatter(date, new Date()), "due-date-text brawler"), // TODO: Translate to natural language
)