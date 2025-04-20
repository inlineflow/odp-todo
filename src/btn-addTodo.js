import { btn, div, form, icon, input, p } from "./shorthand";
import plusIcon from "../assets/icons/plus-sign.svg";
import circleIcon from "../assets/icons/circle.svg"
import pencilIcon from "../assets/icons/pencil.svg"
import noteIcon from "../assets/icons/note.svg"
import commentIcon from "../assets/icons/comment.svg"
import refreshIcon from "../assets/icons/refresh.svg"
import { Renderable } from "./renderable";
import { formatDistance } from "date-fns";

export class AddTodo extends Renderable {
    constructor() {
        super(div("btn-container"));
        this.container.addEventListener("root-clicked", (e) => console.log(e));
        this.btnComplete = btn(`btn-complete-todo ${this.priority}-priority`);
        this.button = btn( "btn-add-todo").append(
                icon(plusIcon, "icon-container"),
                p("Add task"),
        );
        
        this.button.addEventListener("click", function(e) {
            const ev = new CustomEvent("add-todo", {
                bubbles: true,
            });

            this.dispatchEvent(ev);
        });

        // this.icon = icon(plusIcon, "icon-container");
        // this.icon = div("icon-container");
        // this.icon.innerHTML = plusIcon;
    }

    toHtml() {
        return this.container.append(
            this.button,
        );
    }

    makeForm() {
            return form("add-todo").append(
            div("todo-first-row").append(
            div("cont").append(
            this.btnComplete.append(icon(circleIcon, "circle-icon add-todo-circle")),// + " " + priorityClass)),
            input("title", "add-todo-title"),
            ),
            div("todo-icon-tray").append(
                icon(pencilIcon, "pencil-icon"),
                icon(noteIcon, "note-icon"),
                icon(commentIcon, "comment-icon"),
            )
                ),
            div("todo-tray").append(
                icon(refreshIcon, "icon-container"),
                p(formatDistance(new Date(), new Date()), "brawler"), // TODO: Translate to natural language
            )
        );
    }
    
}