import { ToDo } from "./todo";
export class List{
    constructor(){
        this.listOfTodos = [new ToDo("Study physics", new Date("11 April 2022"), "school", 1),
         new ToDo("Pack lunch", new Date("12 April 2022"), "health", 2),
          new ToDo("Send Steve the plans", new Date("14 April 2022"), "work", 3),
           new ToDo("Call mom", new Date("11 April 2022"), "family", 3),
        new ToDo("Mow lawn", new Date("25 April 2022"), "house", 2)];
        
    }

    addToDo(title, date, tag = "miscellaneous", priority){
        this.listOfTodos.push(new ToDo(title, date, tag, priority));
    }

    removeToDo(title){
        let newArr = [];

        for(let i = 0; i < this.listOfTodos.length; i++){
            if(this.listOfTodos[i].getTitle() !== title){
                newArr.push(this.listOfTodos[i]);
            }
        }

        this.listOfTodos = newArr;
    }

    getTodaysTasks(){
        let todayArr = [];
        let today = new Date();
        let todayString = today.getDate() + today.getMonth() + today.getYear();
        for(let i = 0; i < this.listOfTodos.length; i++){
            let date = this.listOfTodos[i].getDate();
            let dateString = date.getDate() + date.getMonth() + date.getYear();
            
            if(dateString === todayString){
                todayArr.push(this.listOfTodos[i]);
            }
        }
        return todayArr;
    }

    getWeeksTasks(){
        let today = new Date();
        let dayInWeek = today.getDay();
        let weekArr = [];
        let dateOfStart;
        let dateOfEnd;
        let dateToday = today.getDate();

        if(dayInWeek === 0){
            dateOfStart = dateToday;
            dateOfEnd = dateOfStart + 7;
        }else{
            let count = 0;
            while(count < dayInWeek){
                count++;
            }

            dateOfStart = dateToday - count;
            dateOfEnd = dateOfStart + 7;
        }

        for(let i = 0; i < this.listOfTodos.length; i++){
            if(this.listOfTodos[i].getDate().getDate() >= dateOfStart && this.listOfTodos[i].getDate().getDate() <= dateOfEnd){
                weekArr.push(this.listOfTodos[i]);
            }
        }
        return weekArr;
    }

    getInbox(){
        return this.listOfTodos;
    }

    getTasksWithTag(tag){
        let tagArr = [];
        for(let i = 0; i < this.listOfTodos.length; i++){
            if(this.listOfTodos[i].getTag() === tag){
                tagArr.push(this.listOfTodos[i]);
            }
        }
        return tagArr;
    }
}


