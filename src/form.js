import { Renderable } from "./renderable";
import { div, icon, input, label } from "./shorthand";
import arrowIcon from "../assets/icons/arrow.svg"

export class Form extends Renderable {

    constructor(...states) {
        super();
        const s = states.flat(Infinity);
        this.states = s.map(elem => {
            const lab = label(`${elem.title}:`, elem.inputClass);
            const box = div(elem.containerClass).append(
                // label(`${elem.title}:`, elem.inputClass)
            );
            const prompt = {icon: icon(arrowIcon, "prompt-icon"), input: input(elem.title, elem.inputClass)};
            box.append(...Object.values(prompt));
            const x = [lab, box];
            const renderState = function() {
                return x;
            }
            this.renderState = renderState;


            return {prompt: prompt, container: box,  }
        });

        // this.baseForm = [label("Title: ", "add-todo-label"),
        //     div("todo-title-container").append(
        //     // this.btnComplete,
        //         this.arrow,
        //         // input("title", "add-todo-title"),
        //         this.textField.htmlElement)];

        this.arrow = icon(arrowIcon, "prompt-icon");
        this.currentField = this.states[0];
        this.setupHandlers();
        // this.inputBox = div("input-box").append(label(this.states[0].title, this.states[0].classlist), input("title", "add-todo-title low-priority"));
    }

    setupHandlers() {
        this.states.forEach(state => {

            state.prompt.input.addEventListener("keydown", (e) => {
                if (e.key !== 'Enter') {
                    return;
                }

                e.preventDefault();
                // const todoTitle = state.input.value;
                // bus.emit("create-todo", {src: state.container.parentElement, title: todoTitle});
            })

            state.prompt.input.addEventListener("keydown", (e) => {
                const skipKeys = 
                [ "Delete", "Insert", "Home",
                "End", "PageDown", "PageUp",
                "NumLock", "Alt", "Control",
                "Shift", "Tab", "Enter" ];

                if (skipKeys.includes(e.key)) {
                    return;
                }

                const priorityTags = {
                        lp: 'low-priority',
                        mp: 'medium-priority',
                        hp: 'high-priority',
                    };

                const val = this.inputBox.value + e.key;
                const words = val.split(" ");                
                console.log(words);
                

                // for(const w of words) {
                //     for (const key of Object.keys(priorityTags)) {
                //         if (w.toLowerCase() === key) {
                //             this.changePriority(priorityTags[key]);
                //         }
                //     }
                // }
            });
            })
        }
}