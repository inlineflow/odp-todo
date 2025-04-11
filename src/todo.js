import { div , p, h3, ul } from "./shorthand";

export class Todo {
    constructor(title, description, dueDate, priority, notes, checklist) {
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
            div("container").append(
                p(this.description, ["todo-item-description"]),
                ul(this.notes),
        ),
        div("todo-item-checklist").append(ul(this.checklist)),
            div("todo-item-tray").append(
            ul(
                div().setText(this.dueDate),
                div().setText(this.priority)
            ) 
            )
        )

        return elem;
    }
}