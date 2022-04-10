export class ToDo{
    constructor(title, date, tag, priority, completed=false){
        this.title = title;
        this.date = date;
        this.tag = tag;
        this.priority = priority;
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

    getTag(){
        return this.tag;
    }
}
