import { List } from "../todo_list";
import { setupCenter } from "./setup_center";

let list = new List();

export function loadWeek(){
    const container = document.createElement("div");
    
    const weekTasks = list.getWeeksTasks();
    
    setupCenter(weekTasks, container);

    return container;
}