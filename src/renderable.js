import { div, h3, parseLi, ul } from "./shorthand";

function addChildren(...items) {
    if (this.children === undefined) return;

    this.children.push(...items);
    return this;
}


function render() {
    let childHtml = [];
    if (this.children.length !== 0) {
        for (const child of this.children) {
            if (child.toHtml !== undefined)
                childHtml.push(child.render());
            else {
                childHtml.push(renderGeneric(child));
            }
        }

    }

    if (this.toHtml !== undefined)
        return this.toHtml().append(...childHtml);

    const ignoreTypes = ["function"];
    let x = Object.entries(this);

    x = x.filter(item => !(ignoreTypes.includes(typeof item[1])));

    return renderGeneric(x).append(childHtml);
}

export class Renderable {
    /**
     * Base class for objects that need to be rendered to HTML
     * @param {HTMLElement} container Container for the child contents, typically a `div` or `section`
     * @param {Object[]} children JS Objects that will be recursively rendered
     */
    constructor(container, children = []) {
        this.container = container;
        this.children = children;
    }
    render = render;
    addChildren = addChildren;
    toHtml() {
        return this.container;
    }
}

export class ContainedList extends Renderable {
    constructor(elements, title, mainClass, ulClass) {
        super(div(mainClass));
        this.title = title;
        this.ul = ul(["no-bullet", "contained-list"], elements);
        this.ul.addClass(ulClass);
        this.children = elements;
    }

    render = function () {
        if (this.toHtml !== undefined)
            return this.toHtml().append(this.ul);
    }

    append = function (...items) {
        this.addChildren(...items);

        for (let i of items) {
            this.ul.append(
                parseLi(i),
            );
        };

        return this;
    }

    remove = function(target) {
        for (let child of this.ul.children) {
            if (child.contains(target)) {
                console.log("funny");
            }
            // const grandchild = child.children[0];
            // if (grandchild == target) console.log("funny");
            
            // console.log(grandchild);
        }
    }

    addClass = classlist => this.ul.addClass(classlist);

    toHtml() {
        return this.container.append(
            h3(this.title)
        );
    }
}