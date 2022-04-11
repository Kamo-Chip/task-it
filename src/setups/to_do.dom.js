import Today from "/src/assets/today.svg";
import Week from "/src/assets/week.svg";
import Inbox from "/src/assets/inbox.svg";
import ExpandMore from "/src/assets/expandm.svg";
import ExpandLess from "/src/assets/expandl.svg";
import { loadToday } from "../loads/load_today";



export function setupTodoDom(){

    const line = document.createElement("hr");

    const container = document.createElement("div");
    
    container.append(setupButtons(), line, setupProjects());

    return container;
}

function setupButtons(){
    
    const container = document.createElement("div");

    const today = document.createElement("div");
    today.classList.add("todo-options");
    const todayIcon = new Image()
    todayIcon.src = Today;
    const title1 = document.createElement("button");
    title1.textContent = "Today";
    title1.classList.add("todo-btns");
    today.append(todayIcon, title1);

    const week = document.createElement("div");
    week.classList.add("todo-options");
    const weekIcon = new Image();
    weekIcon.src = Week;
    const title2 = document.createElement("button");
    title2.textContent = "Week";
    title2.classList.add("todo-btns");
    week.append(weekIcon, title2);

    const inbox = document.createElement("div");
    inbox.classList.add("todo-options");
    const inboxIcon = new Image();
    inboxIcon.src = Inbox;
    const title3 = document.createElement("button");
    title3.textContent = "Inbox";
    title3.classList.add("todo-btns");
    inbox.append(inboxIcon, title3);

    container.append(today, week, inbox);
    
    return container;
}

function setupProjects(){
    const projects = document.createElement("div");
    const title4 = document.createElement("p");
    title4.textContent = "Projects";
    projects.setAttribute("id", "projects");
    
    const expand = new Image();
    expand.src = ExpandMore;
    let count = 1;
    expand.onclick = () =>{
        count++;
        if(count % 2 == 0){
            expand.src = ExpandLess;
        }else{
            expand.src = ExpandMore;
        }
        
    }
    projects.append(title4, expand);

    return projects;
}