import { btn, div, form, icon, input, p } from "./shorthand";
import plusIcon from "../assets/icons/plus-sign.svg";
import circleIcon from "../assets/icons/circle.svg"
import pencilIcon from "../assets/icons/pencil.svg"
import noteIcon from "../assets/icons/note.svg"
import commentIcon from "../assets/icons/comment.svg"
import refreshIcon from "../assets/icons/refresh.svg"
import { Renderable } from "./renderable";
import { formatDistance } from "date-fns";
import bus from "./event-bus";

export class AddTodo extends Renderable {
    constructor() {
        // super(div("btn-container"));
        super(div("add-todo-container"));
        // bus.on("root-clicked", (data) => console.log(this.btnComplete));
        this.btnComplete = btn(`btn-complete-todo ${this.priority}-priority`).append(icon(circleIcon, "circle-icon add-todo-circle"));
        this.state = "button";
        this.button = btn( "btn-add-todo").append(
                icon(plusIcon, "icon-container"),
                p("Add task"),
        );
        this.container.append(this.makeButton()); // this is not a mistake

        this.setupHandlers();
        

    }

    setupHandlers = function() {
        bus.on("root-clicked", (target) => {
            const x = this.container.contains(target);
            if (x) return; 
            
            if (!this.container.contains(target)) {
                // console.log("not child");
                setTimeout(() => {
                    this.switchStateTo("button");
                }, 50);
            }
            
        });

        this.button.addEventListener("click", (e) => {
            setTimeout(() => {
                bus.emit("add-todo", this);
            }, 100);
            // const ev = new CustomEvent("add-todo", {
            //     bubbles: true,
            // });

            // this.dispatchEvent(ev);
        });
    }

    switchStateTo(targetState) {
        if (this.state === targetState) return;

        switch(targetState) {
            case "button":
                this.state = "button";
                break;
            case "form":
                this.state = "form";
                break;
            default:
                throw new Error("State not supported for AddTodo button");
        }

        // const parent = this.container.parentElement;
        const newView = this.newState();
        // this.container = this.toHtml();

        this.container.replaceChildren(newView);
        // parent.replaceChild(newView, this.container);
    }

    newState() {
        return this.state === "button" ? this.makeButton() : this.makeForm() ;
    }

    toHtml() {
        return this.container;
    }

    makeButton() {
        const elem = div("btn-container").append(
            this.button,
        );

        return elem;
    }

    makeForm() {
            const textField = input("title", "add-todo-title");
            textField.addEventListener("keydown", (e) => {
                if (e.key !== 'Enter') {
                    return;
                }
                e.preventDefault()
                
                // console.log(e)
            });

            return form("add-todo").append(
            div("todo-first-row").append(
            div("cont").append(
            this.btnComplete,
            // input("title", "add-todo-title"),
            textField,
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