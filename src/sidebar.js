import { isSameDay } from "date-fns";
import { NavItem } from "./navItem";
import { ProjectList } from "./project-list";
import { ContainedList, Renderable } from "./renderable";
import { a, div, section, ul } from "./shorthand";
import { UserProfile } from "./userProfile";
import { projectRepo } from "./repos";
import { Project } from "./project";

//const makeLinks = function(items) {
//    const result = [];
//    for (const i of items) {
//        if (typeof i === 'string') {
//            const obj = {}
//            obj.tomarkup = function() {
//                return a(i, "#");
//            }
//            obj.render = function() {
//                return this.tomarkup();
//            }
//            result.push(obj);
//        } else {
//            result.push(i);
//        }
//    }
//
//    return result;
//}

export function makeSidebar() {
    return new Sidebar({
        "user-profile": { markup: new UserProfile("Morris"), pList: () => { } },
        "my-projects": { markup: "My Projects", pList: () => new ProjectList("My Projects", projectRepo) },
        "today": {
            markup: "Today", pList: function() {
                //const projects = projectRepo.filter(el => el.todos.every(todo => isSameDay(todo.dueDate === new Date())));
                const projects = []
                for (const p of projectRepo) {
                    const todos = p.todos.filter(todo => isSameDay(todo.dueDate, new Date()));
                    if (todos.length !== 0) {
                        projects.push(new Project(this.markup, todos));
                    }
                    //p.todos.map(todo => {
                    //    console.log(`Project: ${p.title}, todo: ${todo.title}, dueDate: ${todo.dueDate.toLocaleDateString()}`)
                    //    console.log(`Today: ${isSameDay(todo.dueDate, new Date())}`)
                    //});

                }
                return new ProjectList(this.markup, ...projects);
                //return projects;
            }
        },
        "upcoming": { markup: "Upcoming", render: () => console.log("WIP") },
    },
    );
}

/**
 * Class for changing the main content of the page. Should keep track of the current active "tab". 
 */
export class Sidebar extends ContainedList {
    constructor(navItems) {
        // const items = makeLinks(navItems);
        const map = {}
        for (const key in navItems) {
            const value = navItems[key];
            const markup = value['markup'];
            // console.log(key, navItems[key]);
            if (typeof markup === 'string') {
                map[key] = new NavItem(markup, []);
                // return new NavItem(item, []);
            } else {
                map[key] = markup;
                // return item;
            }
        }
        super(Object.values(map));
        this.nav = navItems;
    }
    /** @param {"user-profile" | "my-projects" | "today" | "upcoming" } key */
    getProjectList(key) {
        const navItem = this.nav[key];
        const projectList = navItem.pList();
        return projectList;
    }

    toHtml() {
        return section("sidebar");
    }
}
