import { List } from "../todo_list";
import { setupCenter } from "./setup_center";

let list = new List();

export function loadInbox(){
    const container = document.createElement("div");
    const inboxTasks = list.getInbox();
    const heading = document.createElement("p");
    heading.textContent = "Inbox";
    
    setupCenter(inboxTasks, container, heading);

    return container;
}