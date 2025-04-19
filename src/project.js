import { AddTodo } from "./btn-addTodo";
import { ContainedList, Renderable } from "./renderable";
import circleIcon from "../assets/icons/circle.svg"
import pencilIcon from "../assets/icons/pencil.svg"
import noteIcon from "../assets/icons/note.svg"
import commentIcon from "../assets/icons/comment.svg"
import refreshIcon from "../assets/icons/refresh.svg"
import { btn, div, form, h3, h4, icon, p } from "./shorthand";
import { Todo } from "./todo";
import { formatDistance } from "date-fns";

export class Project extends ContainedList {
    /**
     * 
     * @param {Todo[]} todos 
     */
    constructor(title, todos) {
        super(todos, title, "project", "project-todos");
        this.append(new AddTodo());
        this.container = div(this.classlist);
        this.btnComplete = btn(`btn-complete-todo ${this.priority}-priority`);
        this.container.addEventListener("todo-completed", (e) => {
            // console.log(e.target);
            const parent = e.target.closest('.project > ul > li');
            if(parent && parent.childNodes.contains("todo")) {
                parent.remove();
            }
        });

        this.container.addEventListener("add-todo", (e) => {
            console.log(e);
            console.log(e.target);
            
            const parent = e.target.closest('.project > ul > li');
            if (parent) {
                parent.remove();
            }

            this.append(
                form("add-todo").append(
                    
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
                p(formatDistance(new Date(), new Date()), "brawler"), // TODO: Translate to natural language
            )
        ))});
        // this.container.addEventListener("click", (e)=> {
        //     const parent = e.target.closest('.project > ul > li');
        //     console.log(e.target);
            
        //     // console.log(parent);
        //     // console.log(parent.classList);
        //     // console.log(parent.childNodes);

        //     if(parent && parent.childNodes.contains("todo")) {
        //         parent.remove();
        //     }
            
        //     // if (!parent.classList.contains("btn-complete-todo")) {
        //     //     console.log("Couldn't find element with class .btn-complete-todo");
        //     // }
        //     // parent.remove();
        //     // console.log(e.target.closest('button'));
        //     // console.log(e.target.closest('.project > ul > li > .todo'));
        //     // e.target.closest('.project > ul > li > todo').remove();
        // });
    }

    toHtml() { return this.container.append(h3(this.title));}

}