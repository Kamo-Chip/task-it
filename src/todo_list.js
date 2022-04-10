import { ToDo } from "./todo";
export class List{
    constructor(){
        this.listOfTodos = [new ToDo("study", new Date("10 April 2022"), "school", 1)];
        
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


