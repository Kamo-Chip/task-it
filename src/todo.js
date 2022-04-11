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
        //Add code to specify day e.g today or tomorrow
        return this.date;
    }

    getDay(){
        let day =  this.date.getDate();
        let month = this.date.toString().split(" ")[1];

        return `${day}, ${month}`;
    }

    getTag(){
        return this.tag;
    }

    getPriority(){
        return this.priority
    }
}
