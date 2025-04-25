import { btn, div, form, h4, icon, input, label, p } from "./shorthand";
import plusIcon from "../assets/icons/plus-sign.svg";
import circleIcon from "../assets/icons/circle.svg"
import pencilIcon from "../assets/icons/pencil.svg"
import noteIcon from "../assets/icons/note.svg"
import commentIcon from "../assets/icons/comment.svg"
import refreshIcon from "../assets/icons/refresh.svg"
import arrowIcon from "../assets/icons/arrow.svg"
import { Renderable } from "./renderable";
import { formatDistance, parse } from "date-fns";
import bus from "./event-bus";
import {Form} from "./form";
import { makeFirstRow, makeSecondRow } from "./todo";

const priorities = ["low", "medium", "high"];

export class AddTodo extends Renderable {
    constructor() {
        // super(div("btn-container"));
        super(div("add-todo-container"));
        // bus.on("root-clicked", (data) => console.log(this.btnComplete));
        // this.btnComplete = btn(`btn-complete-todo ${this.priority}-priority`).append(icon(circleIcon, "circle-icon add-todo-circle"));
        this.arrow = icon(arrowIcon, "prompt-icon");
        this.state = "button";
        this.button = btn( "btn-add-todo").append(
                icon(plusIcon, "icon-container"),
                p("Add task"),
        );
        this.container.append(this.makeButton()); // this is not a mistake
        this.textField = {state: 'low-priority', htmlElement: input("title", "add-todo-title low-priority")};
        this.form = new Form({
            title: "Title",
            inputClass: "add-todo-title",
            inputContainerClass: "add-todo-title-container",
            renderResult: text => makeFirstRow(text, false),
        },
        {
            title: "Due Date",
            inputClass: "add-todo-date",
            inputContainerClass: "todo-date-container",
            wrapper: div("todo-second-row"),
            renderResult: date => makeSecondRow(parse(date, 'dd/MM/yyyy', new Date()), formatDistance),
        },
        {
            title: "Priority",
            inputClass: "add-todo-priority",
            inputContainerClass: "todo-priority-container",
            renderResult: (newPriority) => {
                const root = this.container;
                const children = root.querySelectorAll(":scope > .low-priority");
                children.forEach(ch => ch.classList.replace("low-priority", newPriority));
                root.classList.replace("add-todo-container", "todo");
            },
            customPrompt: div("controls").append(
                btn("priority-control low-priority").append(p("Low")).setAttr("tabindex", 1),
                btn("priority-control medium-priority").append(p("Medium")).setAttr("tabindex", 2),
                btn("priority-control high-priority").append(p("High")).setAttr("tabindex", 3),
            ),
            renderState: function() {
                const secondRow = document.querySelector(".add-todo-container .todo-first-row");
                secondRow.append(this.container);
                this.prompt.container.querySelector(".priority-control.low-priority").focus();
            },
        }
    );



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


            this.textField.htmlElement.addEventListener("keydown", (e) => {
                if (e.key !== 'Enter') {
                    return;
                }

                e.preventDefault();
                const todoTitle = this.textField.htmlElement.value;
                bus.emit("create-todo", {src: this.container.parentElement, title: todoTitle});
                
                // console.log(e)
            });

            this.textField.htmlElement.addEventListener("keydown", (e) => {
                const skipKeys = [
                        "Delete",
                        "Insert",
                        "Home",
                        "End",
                        "PageDown",
                        "PageUp",
                        "NumLock",
                        "Alt",
                        "Control",
                        "Shift",
                        "Tab",
                        "Enter"
                    ];

                if (skipKeys.includes(e.key)) {
                    return;
                }

                const priorityTags = {
                        lp: 'low-priority',
                        mp: 'medium-priority',
                        hp: 'high-priority',
                    };

                // if (e.key === "Backspace") {

                // }

                // for(const x of Object.keys(priorityTags)) {
                //     console.log(x)
                // }

                const val = this.textField.htmlElement.value + e.key;
                const words = val.split(" ");                

                for(const w of words) {
                    for (const key of Object.keys(priorityTags)) {
                        if (w.toLowerCase() === key) {
                            this.changePriority(priorityTags[key]);
                        }
                    }
                }


                // console.log(words);
                

                // for(const w of words) {
                //     // if (!skipKeys.includes(w))
                //     // console.log(w);
                    
                // }
                

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
        if(Array.isArray(newView)) {
            this.container.replaceChildren(...newView);
        } else {
            this.container.replaceChildren(newView);
        }
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
        return this.form.currentState.renderPrompt();
        // return [label("Title: ", "add-todo-label"),
        //     // div("todo-first-row").append(
        //     div("todo-title-container").append(
        //     // this.btnComplete,
        //         this.arrow,
        //         // input("title", "add-todo-title"),
        //         this.textField.htmlElement,

        //         // div("controls").append(
        //         // btn("priority-control high-priority").append(p("Up")).addHandler("click", () => this.increasePriority()),
        //         // btn("priority-control low-priority").append(p("Down")).addHandler("click", () => this.decreasePriority()),
        //         // )
        //     // div("todo-icon-tray").append(
        //     //     btn("priority-control"),
        //     //     btn("priority-control"),
        //         // icon(pencilIcon, "pencil-icon"),
        //         // icon(noteIcon, "note-icon"),
        //     //     icon(commentIcon, "comment-icon"),
        //         // )
        //     // ),
        //     // div("todo-tray").append(
        //     //     icon(refreshIcon, "icon-container"),
        //     //     p(formatDistance(new Date(), new Date()), "brawler"), // TODO: Translate to natural language
        //     // )
        // )];
    }

    changePriority(priority) {
        this.textField.htmlElement.classList.replace(this.textField.state, priority);
        this.textField.state = priority;
    }

    increasePriority() {
        if(this.textField.state >= 2) return;

        const currentPriority = priorities[this.textField.state];

        this.textField.state++;
        const newPriority = priorities[this.textField.state];
        this.textField.htmlElement.classList.replace(`${currentPriority}-priority`, `${newPriority}-priority`);
    }

    decreasePriority() {
        if(this.textField.state <= 0) return;

        const currentPriority = priorities[this.textField.state];

        this.textField.state--;
        const newPriority = priorities[this.textField.state];
        this.textField.htmlElement.classList.replace(`${currentPriority}-priority`, `${newPriority}-priority`);
    }
    
}