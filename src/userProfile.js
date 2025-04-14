import { Renderable } from "./renderable";
import { div, p } from "./shorthand";


export class UserProfile extends Renderable {
    constructor(userName) {
        super();
        this.userName = userName;
    }

    toHtml() {
        return div("user-profile").append(
            div("user-avatar"),
            p(`Hello, ${this.userName}`),
        )
    }
}