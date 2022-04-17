import { ToDo } from "./todo";

export class List{
    constructor(){
        this.listOfTodos = [];
        
    }

    addToDo(title, date, tag = "miscellaneous", priority){
        this.listOfTodos.push(new ToDo(title, date, tag, priority));
    }

    removeToDo(title){
        let newArr = [];
        let check = 0; 

        for(let i = 0; i < this.listOfTodos.length; i++){
            if(this.listOfTodos[i].getTitle() === title && check === 0){
                check++;
                continue;
            }else{
                newArr.push(this.listOfTodos[i])
            }
        }
    
        this.listOfTodos = newArr;
    }

    setOverdue(){
        for(let i = 0; i < this.listOfTodos.length; i++){
            if(this.listOfTodos[i].isOverdue()){
                this.listOfTodos[i].setOverdue();
            }
        }
    }

    getTodaysTasks(){
        this.setOverdue();
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
        this.setOverdue();
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
        this.setOverdue();
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

    removeTasksWithTag(tag){
        let newArr = [];

        for(let i = 0; i < this.listOfTodos.length; i++){
            if(this.listOfTodos[i].getTag() !== tag){
                newArr.push(this.listOfTodos[i]);
            }
        }
        this.listOfTodos = newArr;
    }

    isPresent(task){
        let isPresent = false;
        for(let i = 0; i < this.listOfTodos.length; i++){
            if(this.listOfTodos[i].getTitle() === task){
                isPresent = true;
            }
        }
        return isPresent;
    }

    getProjects(){
        let projects = [];

        for(let i = 0; i < this.listOfTodos.length; i++){
            if(projects.indexOf(this.listOfTodos[i].getTag()) < 0){
                projects.push(this.listOfTodos[i].getTag());
            }
        }
        return projects;
    }
}


