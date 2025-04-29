import { formatDistance } from "date-fns";
import bus from "./event-bus";
import { Renderable } from "./renderable";
import sm from "./save";
import { div, h2, h3, section } from "./shorthand";
import { Project } from "./project";
import { Todo } from "./todo";

export class ProjectList extends Renderable {
    constructor(title, ...projects) {
        super(section("project-list"),projects);
        this.title = title;
        bus.on("save-project-list", () => {
            sm.save(this.title, JSON.stringify(this));
        });
    }

    toHtml() {
        return this.container.append(
            h2(this.title, "project-list-title"),
        )
    }

    toJSON() {
        const title = this.title;
        const children = this.children;
        return {title, children};
        // const title = this.title;
        // const children = [];

        // this.children.forEach(ch => {
        //     if (ch.toJSON) {
        //         children.push(ch.toJSON());
        //     }
        // })

        // return JSON.stringify({title, children});
        // return {title, children};
    }
}

export function parseProjectList(json) {
    const obj = JSON.parse(json)
    const projects = Array.from(obj.children, proj => {
        const todos = Array.from(proj.children, todo => new Todo(todo.title, todo.dueDate, todo.priority, [], formatDistance));
        return new Project(proj.title, todos);
    })
    return new ProjectList(obj.title, ...projects);
    // /**
    //  * @type {Project[]}
    //  */
    // const projects = [];
    // obj.children.forEach(el => {
    //     // console.log(el);
    //     const todos = Array.from(el.children, ch => new Todo(ch.title, ch.dueDate, ch.priority, [], formatDistance));
    //     const project = new Project(el.title, todos);
    //     // console.log(todos);
    //    projects.push(project);
        
    // });
    // while (obj.children) {
    //     console.log(obj.children);
    //     obj = obj.children[0];
        
    // }
    // const pList = new ProjectList(obj.title, obj.children);
    console.log(obj);
    pList = new ProjectList(obj.title, ...projects);
}