import { AddTodo } from "./btn-addTodo";
import { ContainedList, Renderable } from "./renderable";
import circleIcon from "../assets/icons/circle.svg"
import pencilIcon from "../assets/icons/pencil.svg"
import noteIcon from "../assets/icons/note.svg"
import commentIcon from "../assets/icons/comment.svg"
import refreshIcon from "../assets/icons/refresh.svg"
import { btn, div, form, h3, h4, icon, input, p } from "./shorthand";
import { Todo } from "./todo";
import { formatDistance } from "date-fns";
import bus from "./event-bus";

export class Project extends ContainedList {
    /**
     * 
     * @param {Todo[]} todos 
     */
    constructor(title, todos) {
        super(todos, title, "project", "project-todos");
        this.btnAddTodo = new AddTodo();
        this.append(this.btnAddTodo);
        // this.container = div(this.classlist);
        this.btnComplete = btn(`btn-complete-todo ${this.priority}-priority`);
        // TODO: refactor to use event bus
        bus.on("todo-completed", (target) => {
            console.log(target);
            console.log(this);
            
            const parent = target.closest('.project > ul > li');
            if(parent && parent.childNodes.contains("todo")) {
                parent.remove();
            }
        });

        // this.container.addEventListener("todo-completed", (e) => {
        //     const parent = e.target.closest('.project > ul > li');
        //     if(parent && parent.childNodes.contains("todo")) {
        //         parent.remove();
        //     }
        // });

        // TODO: refactor to use event bus
        this.container.addEventListener("add-todo", (e) => {
            const parent = e.target.closest('.project > ul > li');
            if (parent) {
                parent.remove();
            }

            this.append(
                this.btnAddTodo.makeForm(),
            )
        });

    }

    toHtml() { return this.container.append(h3(this.title));}

}