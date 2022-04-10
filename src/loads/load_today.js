import { List } from "../todo_list";

let list = new List();

export function loadToday(){
    const container = document.createElement("div");

    const todayTasks = list.getTodaysTasks();

    todayTasks.forEach(element => {
        const task = document.createElement("div");
        task.textContent = element.getTitle();

        container.append(task);
    });

    return container;
}