import bus from "./event-bus";
import { Renderable } from "./renderable";
import { div } from "./shorthand";

export class App extends Renderable {
    constructor() {
        super(div("app"));

        this.container.addEventListener("click", (e) => {
            bus.emit("root-clicked", this);
            e.stopPropagation();
        });
    }
    /** @type {HTMLElement[]} */
    notifyOnClick = [];
    renderChildren = this.render;
    render = function() {
        let tree = this.renderChildren();
        document.body.append(tree);
        
    }

    toHtml = () => this.container;
}