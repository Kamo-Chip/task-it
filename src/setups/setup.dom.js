
import Rocket from "/src/assets/logo.svg";
import { setupTodoDom } from "./to_do.dom";
import { setupFlashcardDom } from "./flashcard.dom";
import { loadToday } from "../loads/load_today";
import { loadWeek } from "../loads/load_week";
import { loadInbox } from "../loads/load_inbox";

export function setupDom(){
    const features = document.createElement("div");
    features.setAttribute("id", "todo-features");
    features.append(setupTodoDom());
    
    const siderbar1 = document.createElement("div");
    siderbar1.setAttribute("id", "main-sidebar");

    const brand = document.createElement("div");
    brand.setAttribute("id", "brand");

    const logo = new Image();
    logo.src = Rocket;
    logo.setAttribute("id", "logo");
    
    const name = document.createElement("p");
    name.textContent = "TaskIt";

    brand.append(logo, name);

    const btnContainer = document.createElement("div");
    btnContainer.setAttribute("id", "btn-container");

    const btnToDo = document.createElement("button");
    btnToDo.textContent = "To-Do";
    btnToDo.classList.add("sidebar-btn"); 
    btnToDo.addEventListener("click", () =>{
        features.innerHTML = null;
        features.classList = null;
        features.classList.add("todo-features");
        features.append(setupTodoDom());
    });

    const btnFlashCards = document.createElement("button");
    btnFlashCards.textContent = "Flash Cards";
    btnFlashCards.classList.add("sidebar-btn");
    btnFlashCards.addEventListener("click", () =>{
        features.innerHTML = null;
        features.classList = null;
        features.classList.add("flashcard-features");
        features.append(setupFlashcardDom());
    })
    btnContainer.append(btnToDo, btnFlashCards);

    siderbar1.append(brand, btnContainer);
    
    const center = loadInbox();
    
    window.addEventListener("click", (e)=>{
        if(e.target.textContent === "Today"){
            center.innerHTML = null;
            center.append(loadToday());
        }else if(e.target.textContent === "Week"){
            center.innerHTML = null;
            center.append(loadWeek());
        }else if(e.target.textContent === "Inbox"){
            center.innerHTML = null;
            center.append(loadInbox());
        }
    });

    center.setAttribute("id", "center")
    document.body.append(siderbar1, center, features);
}