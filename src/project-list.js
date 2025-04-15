import { Renderable } from "./renderable";
import { div, section } from "./shorthand";

export class ProjectList extends Renderable {
    constructor(...projects) {
        super(projects);
    }

    toHtml() {
        return section("project-list")
    }
}