import { isSameDay } from "date-fns";
import bus from "./event-bus";
import { Renderable } from "./renderable";
import { div } from "./shorthand";
import { makeSidebar, Sidebar } from "./sidebar";
import { UserProfile } from "./userProfile";
import { parseProjectList } from "./project-list";
import sm from "./save";
import { initRepos, projectRepo } from "./repos";
import { makeDefaultPList } from "./defaultProjectList";


export class App extends Renderable {
  constructor() {
    super(div("app"));
    initRepos()
    const pList = makeDefaultPList()
    this.sidebar = makeSidebar();
    this.currentProjectList = pList;
    //const parsed = parseProjectList(sm.load("Today"))
    //this.currentProjectList = this.sidebar.getProjectList("today");
    this.addChildren(this.sidebar, this.currentProjectList);
    this.container.addEventListener("click", (e) => {
      // setTimeout(() => {
      bus.emit("root-clicked", e.target);
      e.stopImmediatePropagation();
      // }, 200);
      // e.stopPropagation();
    });

    bus.on("navigation", data => {
      const currentPList = this.container.querySelector('.project-list');
      currentPList.replaceWith(data.container);
      //console.log(data);

    });
  }

  renderChildren = this.render;
  render = function() {
    let tree = this.renderChildren();
    document.body.append(tree);

  }

  toHtml = () => this.container;
}
