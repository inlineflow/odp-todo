import { isSameDay } from "date-fns";
import bus from "./event-bus";
import { Renderable } from "./renderable";
import { div } from "./shorthand";
import { makeSidebar, Sidebar } from "./sidebar";
import { UserProfile } from "./userProfile";


export class App extends Renderable {
    constructor({ currentProjectList }) {
        super(div("app"));
        this.sidebar = makeSidebar();
        //this.currentProjectList = currentProjectList;
        this.currentProjectList = this.sidebar.getProjectList("today");
        this.addChildren(this.sidebar, this.currentProjectList);
        this.container.addEventListener("click", (e) => {
            // setTimeout(() => {
            bus.emit("root-clicked", e.target);
            e.stopImmediatePropagation();
            // }, 200);
            // e.stopPropagation();
        });
    }

    renderChildren = this.render;
    render = function() {
        let tree = this.renderChildren();
        document.body.append(tree);

    }

    toHtml = () => this.container;
}
