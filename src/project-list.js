import { formatDistance } from "date-fns";
import bus from "./event-bus";
import { Renderable } from "./renderable";
import sm from "./save";
import { div, h2, h3, section } from "./shorthand";
import { Project } from "./project";
import { Todo, TodoFactory } from "./todo";

export class ProjectList extends Renderable {
    constructor(title, ...projects) {
        super(section("project-list"), projects);
        this.projects = projects;
        this.title = title;
        bus.on("save-project-list", () => {
            const todos = this.projects.flatMap(p => p.todos);
            const todosJSON = JSON.stringify(todos);

            sm.save("todos", todosJSON);
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
        return { title, children };
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

//export function parseProjectList(json) {
//    const obj = JSON.parse(json)
//    const tf = new TodoFactory(formatDistance);
//    const projects = Array.from(obj.children, proj => {
//        const todos = Array.from(proj.children, todo => tf.new(todo.title, todo.dueDate, todo.priority, []));
//        return new Project(proj.title, todos, proj.opts);
//    });
//
//    return new ProjectList(obj.title, ...projects);
//    // /**
//    //  * @type {Project[]}
//    //  */
//    // const projects = [];
//    // obj.children.forEach(el => {
//    //     // console.log(el);
//    //     const todos = Array.from(el.children, ch => new Todo(ch.title, ch.dueDate, ch.priority, [], formatDistance));
//    //     const project = new Project(el.title, todos);
//    //     // console.log(todos);
//    //    projects.push(project);
//
//    // });
//    // while (obj.children) {
//    //     console.log(obj.children);
//    //     obj = obj.children[0];
//
//    // }
//    // const pList = new ProjectList(obj.title, obj.children);
//    //console.log(obj);
//    //pList = new ProjectList(obj.title, ...projects);
//}
