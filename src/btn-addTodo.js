import { btn, div, icon } from "./shorthand";
import plusIcon from "../assets/icons/plus-sign.svg";
import { Renderable } from "./renderable";

export class AddTodo extends Renderable {
    constructor() {
        super();
        this.button = btn(icon(plusIcon, "icon-container"), /*"Add task"*/ "btn-add-todo");
        // this.icon = icon(plusIcon, "icon-container");
        // this.icon = div("icon-container");
        // this.icon.innerHTML = plusIcon;
    }

    toHtml() {
        return div("btn-container").append(
            this.icon,
            this.button,
        );
    }
    
}