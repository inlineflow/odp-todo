import "./styles.css";
import { App } from "./app";
import { projectRepo, todoRepo } from "./repos";
import { makeDefaultPList } from "./defaultProjectList";

window.todoRepo = () => todoRepo;
window.projectRepo = () => projectRepo;
let pList = makeDefaultPList()
const defaultApp = new App({ currentProjectList: pList });
defaultApp.render();
