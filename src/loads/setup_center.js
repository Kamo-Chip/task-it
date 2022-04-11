export function setupCenter(array, container, heading){
    array.forEach(element => {
        const task = document.createElement("div");
        task.classList.add("task-container");
        const title = document.createElement("p");
        title.textContent = element.getTitle();

        const date = document.createElement("p");
        date.textContent = element.getDay();
        
        const priority = document.createElement("div");
        priority.classList.add("priority");
        
        switch(element.getPriority()){
            case 1:
                priority.style.backgroundColor = "yellow";
                break;
            case 2:
                priority.style.backgroundColor = "orange";
                break;
            case 3:
                priority.style.backgroundColor = "red";
                break;
        }

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";

        task.append(title, date, priority, checkbox);
        container.append(heading, task);
    });
}