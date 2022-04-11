import { List } from "../todo_list";
import { setupCenter } from "./setup_center";

let list = new List();

export function loadToday(){
    const container = document.createElement("div");
    
    const todayTasks = list.getTodaysTasks();
    
    setupCenter(todayTasks, container);

    return container;
}