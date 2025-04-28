import { AddTodo } from "./btn-addTodo";
import { ContainedList, Renderable } from "./renderable";
import { btn, div, form, h3, h4, icon, input, p } from "./shorthand";
import { Todo, TodoFactory } from "./todo";
import bus from "./event-bus";
import { formatDistance } from "date-fns";

export class Project extends ContainedList {
    /**
     * 
     * @param {Todo[]} todos 
     */
    constructor(title, todos) {
        super(todos, title, "project", "project-todos");
        this.AddTodo = new AddTodo();
        this.btnAddTodo = this.AddTodo.render();
        this.append(this.btnAddTodo);
        this.tf = new TodoFactory(formatDistance);
        // this.container = div(this.classlist);
        this.btnComplete = btn(`btn-complete-todo ${this.priority}-priority`);
        // TODO: refactor to use event bus
        bus.on("todo-completed", (target) => {
            console.log(target);
            console.log(this);
            
            const parent = target.closest('.project > ul > li');
            if(parent && parent.childNodes.contains("todo")) {
                parent.remove();
            }
        });

        bus.on("add-todo", (target) => {
            target.switchStateTo("form");
        });

        bus.on("create-todo", ({src: replace, data}) => {
            if (!this.container.contains(replace))
                return;
            
            
            const todo = this.tf.new(title, data.dueDate, data.priority, []);

            replace.remove();
            this.append(todo);
            const newAdd = new AddTodo();
            this.AddTodo = newAdd;
            this.btnAddTodo = this.AddTodo.render();
            this.append(this.btnAddTodo);
        });

    }

    toHtml() { return this.container.append(h3(this.title));}

}