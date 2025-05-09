import "./styles.css";
import { App } from "./app";
import { projectRepo, todoRepo } from "./repos";
import { makeDefaultPList } from "./defaultProjectList";

window.todoRepo = () => todoRepo;
window.projectRepo = () => projectRepo;
const defaultApp = new App();
defaultApp.render();
