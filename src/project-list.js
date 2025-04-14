import { Renderable } from "./renderable";
import { div } from "./shorthand";

export class ProjectList extends Renderable {
    constructor(...projects) {
        super(projects);
    }

    toHtml() {
        return div("project-list")
    }
}