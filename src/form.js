import { Renderable } from "./renderable";
import { div, icon, input, label } from "./shorthand";
import arrowIcon from "../assets/icons/arrow.svg"

export class Form extends Renderable {

    constructor(...states) {
        super();
        const s = states.flat(Infinity);
        this.states = s.map(elem => {
            // let container;
            const container = div(elem.inputContainerClass);
            const lab = label(`${elem.title}:`, elem.inputClass);
            const promptContainer = div("prompt-container").append(
                // icon(arrowIcon, "prompt-icon"),
                // input(elem.title.toLowerCase().replace(' ', '-'), elem.inputClass)
            );
            // if (elem.wrapper !== undefined) {
            //     container = elem.wrapper.append(promptContainer);
            // } else {
            //     container = promptContainer;
            // }
            // const container = elem.wrapper === undefined ? box : elem
            const prompt = {icon: icon(arrowIcon, "prompt-icon"), input: input(elem.title.toLowerCase().replace(' ', '-'), elem.inputClass)};
            if (elem.customPrompt === undefined) {
                promptContainer.append(...Object.values(prompt));
            } else {
                promptContainer.append(elem.customPrompt);
            }
            // promptContainer.append(
            //     icon(arrowIcon, "prompt-icon"),
            //     input(elem.title.toLowerCase().replace(' ', '-'), elem.inputClass)
            // )
            // const x = [lab, container];
            container.append(lab, promptContainer);
            const renderState = function() {
                // return container.append(lab, promptContainer);
                return container;
            }

            const state =  {prompt: prompt, container: container, renderResult: elem.renderResult,
                    renderPrompt: this.renderState,
                    wrapper: elem.wrapper,}
            state.renderPrompt = elem.renderState === undefined ? renderState : elem.renderState.bind(state);
            return state;


        });

        // this.baseForm = [label("Title: ", "add-todo-label"),
        //     div("todo-title-container").append(
        //     // this.btnComplete,
        //         this.arrow,
        //         // input("title", "add-todo-title"),
        //         this.textField.htmlElement)];

        this.arrow = icon(arrowIcon, "prompt-icon");
        this.currentStateIndex = 0;
        this.currentState = this.states[this.currentStateIndex];
        this.setupHandlers();
        // this.inputBox = div("input-box").append(label(this.states[0].title, this.states[0].classlist), input("title", "add-todo-title low-priority"));
    }

    setupHandlers() {
        this.states.forEach(state => {

            state.prompt.input.addEventListener("keydown", (e) => {
                if (e.key !== 'Enter') {
                    e.stopPropagation();
                    return;
                }

                e.preventDefault();

                // this.nextState();
                // const res = state.renderResult();               
                // const parent = state.container.parentElement;
                const todoTitle = state.prompt.input.value;
                const res = state.renderResult(todoTitle);
                state.container.replaceWith(res);                
                const resParent = res.parentElement;
                resParent.append(this.nextState().renderPrompt());
                // state.container.replaceWith(state.renderResult(todoTitle), this.nextState().renderPrompt())
                // state.container.replaceChildren(state.renderResult(todoTitle), this.nextState().renderPrompt());
                // bus.emit("")
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

                const val = state.prompt.input.value + e.key;
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

    nextState = () => {
        this.currentStateIndex++;
        if (this.currentStateIndex >= this.states.length) {
            return {renderPrompt: () => []}
        }
        this.currentState = this.states[this.currentStateIndex];
        return this.currentState;
    }
}