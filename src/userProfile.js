import { Renderable } from "./renderable";
import { div, p } from "./shorthand";


export class UserProfile extends Renderable {
    constructor(userName) {
        super(div("user-profile"));
        this.userName = userName;
    }

    toHtml() {
        return this.container.append(
            div("user-avatar"),
            p(`Hello, ${this.userName}`),
        )
    }
}