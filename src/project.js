import { AddTodo } from "./btn-addTodo";
import { ContainedList, Renderable } from "./renderable";
import { btn, div, form, h3, h4, icon, input, p } from "./shorthand";
import { Todo, TodoFactory } from "./todo";
import bus from "./event-bus";
import { formatDistance, parse } from "date-fns";
import { projectRepo } from "./repos";

export class ProjectFactory {
    /**
     * 
     * @param  {string} title 
     * @param  {Todo[]} todos 
     * @param  {opts} opts 
     * @returns 
     */
    new = (...args) => {
        const project = new Project(...args);
        projectRepo.push(project);
        return project;
    }
}

/**
 * 
 * @param {Todo[]} todos 
 */
export class Project extends ContainedList {
    /**
     * 
     * @param {Todo[]} todos 
     */
    constructor(title, todos, opts) {
        super(todos, title, "project", "project-todos");
        this.todos = todos.filter(i => i instanceof Todo);
        this.AddTodo = new AddTodo();
        this.btnAddTodo = this.AddTodo.render();
        this.append(this.AddTodo);
        this.tf = new TodoFactory(formatDistance);
        // this.container = div(this.classlist);
        this.btnComplete = btn(`btn-complete-todo ${this.priority}-priority`);
        this.opts = opts !== undefined ? opts : {};
        console.log(this.opts);
        // TODO: refactor to use event bus
        bus.on("todo-completed", (target) => {
            // console.log(target);
            // console.log(this);

            const container = target.closest('.project > ul > li');
            if (container && container.childNodes.contains("todo")) {
                container.remove();
            }

            const parentTodo = target.closest('.todo');
            const id = parentTodo.getAttribute('todo-id');
            this.children = this.children.filter(el => el.id !== id);

            bus.emit("save-project-list");
        });

        bus.on("add-todo", (target) => {
            target.switchStateTo("form");
        });

        bus.on("create-todo", ({ replace, data }) => {
            if (!this.container.contains(replace))
                return;
            const container = replace.closest(".add-todo-container").parentElement;
            if (!container) {
                console.log("Can't find add-todo-container");
                return;
            }

            const date = parse(data.dueDate, "dd/MM/yyyy", new Date())
            const todo = this.tf.new(data.title, date, data.priority, []);

            // replace.remove();
            container.remove();
            this.append(todo);
            const newAdd = new AddTodo();
            this.AddTodo = newAdd;
            this.btnAddTodo = this.AddTodo.render();
            this.append(this.btnAddTodo);
            // console.log(JSON.stringify(todo));
            bus.emit("save-project-list");

        });

    }

    toHtml() {
        const elem = this.container.append(h3(this.title))
        if (this.opts.allowDelete) {
            const btnDelete = btn("delete-project").append(p("Delete"));
            elem.append(btnDelete)
        }

        return elem;
    }
    toJSON() {
        const title = this.title;
        const children = this.children.filter(el => el instanceof Todo);
        return { title, children };
        // const title = this.title;
        // const children = [];

        // this.children.forEach(ch => {
        //     if (ch.toJSON) {
        //         children.push(ch.toJSON());
        //     }
        // })

        // return JSON.stringify({title, children});
    }

}
