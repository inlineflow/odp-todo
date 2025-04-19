import { Renderable } from "./renderable";
import { div, h2, h3, section } from "./shorthand";

export class ProjectList extends Renderable {
    constructor(title, ...projects) {
        super(projects);
        this.title = title;
        this.section = section("project-list");
    }

    toHtml() {
        return this.section.append(
            h2(this.title, "project-list-title"),
        )
    }
}