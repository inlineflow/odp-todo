import { Renderable } from "./renderable";
import { btn, p } from "./shorthand";

/**
 * Class containing the command to change the main content of the page to a "tab" described by this class.
 */
export class NavItem extends Renderable {
    constructor(title, tree) {
        const container = btn("nav-item").append(
            p(title),
        );
        super(container);
        this.title = title;
        this.tree = tree;
    }
}