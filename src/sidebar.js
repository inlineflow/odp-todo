import { ContainedList, Renderable } from "./renderable";
import { div, section, ul } from "./shorthand";


export class Sidebar extends ContainedList {
    constructor(...navItems) {
        super(navItems);
        // this.navItems = navItems;
    }

    toHtml() {
        return section("sidebar");
    }
}