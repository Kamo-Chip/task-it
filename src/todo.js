import { isAfter } from "date-fns";

export class ToDo{
    constructor(title, date, tag, priority, completed=false, overdue=false){
        this.title = title;
        this.date = date;
        this.tag = tag;
        this.priority = priority;
    }

    getCompleted(){
        return this.completed;
    }
    complete(){
        this.completed = true;
    }

    getTitle(){
        return this.title;
    }

    getDate(){
    
        return this.date;
    }

    getDay(){
        let day =  this.date.getDate();
        let month = this.date.toString().split(" ")[1];

        return `${day} ${month}`;
    }

    setOverdue(){
        this.overdue = true;
    }

    isOverdue(){
        let today = new Date();

        if(isAfter(today, this.date) && (today.getDate() > this.date.getDate())){
            return true;
        }
        return false;
    }

    getTag(){
        return this.tag;
    }

    getPriority(){
        return this.priority
    }
}
