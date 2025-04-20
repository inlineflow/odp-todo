import { Renderable } from "./renderable";
import { div } from "./shorthand";

export class App extends Renderable {
    constructor() {
        super(div("app"));

        this.container.addEventListener("click", () => {
            const ev = new CustomEvent("root-clicked");

            this.notifyOnClick.forEach((elem) => elem.dispatchEvent(ev));
        });
    }
    /** @type {HTMLElement[]} */
    notifyOnClick = [];
    renderChildren = this.render;
    render = function() {
        let tree = this.renderChildren();
        document.body.append(tree);
        
    }

    /**
     * Registers children as recipients of eventType
     * @param {string} eventType Event type as a string, e.g. => "click"
     * @param {HTMLElement[]} children DOM Elements to register
     */
    register(eventType, ...children){
        switch(eventType) {
            case "click":
                this.notifyOnClick.push(...children);
                return;
            default:
                return;
        }
    }

    toHtml = () => this.container;
}