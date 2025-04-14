import { Renderable } from "./renderable";
import { div, ul } from "./shorthand";


export class Sidebar extends Renderable {
    constructor(...navItems) {
        super();
        this.navItems = navItems;
    }

    toHtml() {
        return ul(
            "no-bullet",
            this.navItems,
        );
    }
}