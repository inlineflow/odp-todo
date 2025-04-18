import { btn, div, icon, p } from "./shorthand";
import plusIcon from "../assets/icons/plus-sign.svg";
import { Renderable } from "./renderable";

export class AddTodo extends Renderable {
    constructor() {
        super();
        this.button = btn(
            "",
              "btn-add-todo").append(
                p("Add task"),
                icon(plusIcon, "icon-container"),
              );

        // this.icon = icon(plusIcon, "icon-container");
        // this.icon = div("icon-container");
        // this.icon.innerHTML = plusIcon;
    }

    toHtml() {
        return div("btn-container").append(
            // this.icon,
            this.button,
        );
    }
    
}