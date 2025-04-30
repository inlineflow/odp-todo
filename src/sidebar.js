import { NavItem } from "./navItem";
import { ContainedList, Renderable } from "./renderable";
import { a, div, section, ul } from "./shorthand";

const makeLinks = function(items) {
    const result = [];
    for (const i of items) {
        if (typeof i === 'string') {
            const obj = {}
            obj.tomarkup = function() {
                return a(i, "#");
            }
            obj.render = function() {
                return this.tomarkup();
            }
            result.push(obj);
        } else {
            result.push(i);
        }
    }

    return result;
}

/**
 * Class for changing the main content of the page. Should keep track of the current active "tab". 
 */
export class Sidebar extends ContainedList {
    constructor(navItems) {
        // const items = makeLinks(navItems);
        const map = {}
        for(const key in navItems) {
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
        // console.log(map);
        
        // const i = Array.from(navItems, (item) => {
        //     if (typeof item === 'string') {
        //         return new NavItem(item, []);
        //     } else {
        //         return item;
        //     }
        // }).filter(x => x !== undefined);
        super(Object.values(map));
    }

    toHtml() {
        return section("sidebar");
    }
}