import { formatDistance } from "date-fns";
import { ProjectFactory } from "./project";
import { TodoFactory } from "./todo";
import { ProjectList } from "./project-list";

export function makeDefaultPList() {
    const tf = new TodoFactory(formatDistance);
    const pf = new ProjectFactory();

    const todos = [
        tf.new("Order a Burger at Nando's for lunch", new Date(2025, 3, 15), "high", ""),
        tf.new("Titlus", new Date(2025, 3, 15), "medium", "notes"),
        tf.new("title", new Date(2025, 3, 15), "low", "notes"),
    ];


    const project = pf.new("My Project", todos, { allowDelete: true });

    const todos2 = [
        tf.new("MyTodo", new Date(2025, 3, 15), "low", "notes"),
        tf.new("MyTodo", new Date(2025, 3, 15), "high", "notes"),
        tf.new("MyTodo", new Date(2025, 3, 15), "medium", "notes"),
    ];


    const project2 = pf.new("My Project2", todos2);
    const project3 = pf.new("All Today", [tf.new("ToToDo", new Date(), "high", "notes")])
    const pList = new ProjectList("Today", project, project2, project3);
    return pList;
}
