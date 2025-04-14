import { div, parseLi, ul } from "./shorthand";

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
    constructor(children = []) {
        this.children = children;
    }
    render = render;
    addChildren = addChildren;
}

export class ContainedList extends Renderable {
    constructor(elements, title) {
        super(ul("no-bullet", elements));
        this.title = title;
    }

    // ul = ul();

    append = function(...items) {
        for (i of items) {
            this.ul.append(
                parseLi(i),
            );
        };

        return this.ul;
    }

    toHtml() {
        return div('contained-list-container');
    }
}

// function renderGeneric(item) {
//     const parse = (kvPair) => {
//         let name = kvPair[0];
//         let content = kvPair[1];
//         let type = typeof kvPair[1];
//         switch (type) {
//             case "string":
//             case "number":
//                 let p = document.createElement("p");
//                 p.textContent = `${name}: ${content.toString()}`
//                 return p;
//             case "boolean":
//                 let p1 = document.createElement("p");
//                 p1.textContent = `${name}: ${content.toString()}`
//                 return p1;
//         }
//     }
//     const result = [];
//     const kvPairs = Object.entries(item);
//     for (const kv in kvPairs) {
//         if (Array.isArray(kv)) {
//             const el = document.createElement("div");
//             for (const i of kv) {
//                 const child = parse(i);
//                 el.append(child);
//             }
//             result.push(el);
//         }
//         const elem = parse(kv);
//         result.push(elem);
//     }

//     return result;
// }    