import { List } from "./todo_list";
import { ToDo } from "./todo";

export class Project{
    list  = new List();

    constructor(title, tasks){
        this.title = title;
        this.tasks = tasks;
    }

    addTask(title, date, priority){
        this.list.addToDo(new ToDo(title, date, this.title, priority));
    }

    getTasks(){
        this.list.getTasksWithTag(this.title);
    }
}