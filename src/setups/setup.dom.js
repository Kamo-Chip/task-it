import Add from "/src/assets/add.svg";
import { List } from "../todo_list";
import { ProjectsList } from "../projects.list";
import Today from "/src/assets/today.svg";
import Week from "/src/assets/week.svg";
import Inbox from "/src/assets/inbox.svg";
import ExpandMore from "/src/assets/expandm.svg";
import ExpandLess from "/src/assets/expandl.svg";
import Rocket from "/src/assets/logo.svg";

let tasks = new List();
let pList = new ProjectsList(tasks);

export function setupCenter(array, container, header, heading) {

    const form = createForm(heading, container, header);

    let addIcon = new Image();
    addIcon.src = Add;
    addIcon.addEventListener("click", () => {
        document.body.append(form);
    });

    header.append(addIcon, heading);
    container.append(header);
    loadTasks(array, container);
}

function createForm(heading, container, header) {
    const form = document.createElement("div");
    form.classList.add("form");

    const titleDiv = document.createElement("div");
    titleDiv.classList.add("form-div");
    const taskTitle = document.createElement("input");
    taskTitle.classList.add("input-task");
    taskTitle.type = "text";
    taskTitle.placeholder = "What do you plan on doing?";
    const titleError = document.createElement("p");
    titleDiv.append(taskTitle, titleError);

    const dateDiv = document.createElement("div");
    dateDiv.classList.add("form-div");
    const dateOfTask = document.createElement("input");
    dateOfTask.classList.add("input-date");
    dateOfTask.type = "date";
    const dateError = document.createElement("p");
    dateDiv.append(dateOfTask, dateError);

    const tagDiv = document.createElement("div");
    tagDiv.classList.add("form-div");
    const tag = document.createElement("input");
    tag.classList.add("input-task");
    tag.type = "text";
    tag.placeholder = "What is the task related to?";
    const tagError = document.createElement("p");
    tagDiv.append(tag, tagError);

    const label1 = document.createElement("h3");
    label1.textContent = "1";
    const priority1 = document.createElement("input");
    priority1.setAttribute("type", "radio");

    const label2 = document.createElement("h3");
    label2.textContent = "2";
    const priority2 = document.createElement("input");
    priority2.setAttribute("type", "radio");

    const label3 = document.createElement("h3");
    label3.textContent = "3";
    const priority3 = document.createElement("input");
    priority3.setAttribute("type", "radio");

    priority1.classList.add("radio");
    priority2.classList.add("radio");
    priority3.classList.add("radio");

    let priorityValue = 0;

    priority1.addEventListener("click", () => {
        priorityValue = 1;
        priority2.checked = false;
        priority3.checked = false;
    });
    priority2.addEventListener("click", () => {
        priorityValue = 2;
        priority1.checked = false;
        priority3.checked = false;
    });
    priority3.addEventListener("click", () => {
        priorityValue = 3;
        priority2.checked = false;
        priority1.checked = false;
    });

    const priorityDiv = document.createElement("div");
    priorityDiv.classList.add("form-div");
    const priorityError = document.createElement("p");
    const buttonGroup = document.createElement("div");
    buttonGroup.classList.add("button-group");
    buttonGroup.append(label1, priority1, label2, priority2, label3, priority3);
    priorityDiv.append(buttonGroup, priorityError);

    const add = document.createElement("button");
    add.classList.add("add-btn");
    add.textContent = "Add";

    add.addEventListener("click", () => {
        if (heading.textContent === "Inbox") {
            if (isValid(taskTitle.value, titleError, tag.value, tagError, priorityValue, priorityError, dateOfTask.valueAsDate, dateError)) {
                tasks.addToDo(taskTitle.value, dateOfTask.valueAsDate, tag.value, priorityValue);
                container.innerHTML = null;
                container.append(header);
                loadTasks(tasks.getInbox(), container);
                document.body.removeChild(form);
                localStorage.setItem("taskStorage", JSON.stringify(tasks));  
                document.body.innerHTML = null;
                setupDom();
            } else {
                loadTasks(tasks.getInbox(), container);
                return;
            }
        } else if (heading.textContent === "Today") {
            if (isValid(taskTitle.value, titleError, tag.value, tagError, priorityValue, priorityError, new Date(), dateError)) {
                tasks.addToDo(taskTitle.value, new Date(), tag.value, priorityValue);
                container.innerHTML = null;
                container.append(header);
                loadTasks(tasks.getTodaysTasks(), container);
                document.body.removeChild(form);
                localStorage.setItem("taskStorage", JSON.stringify(tasks));
                document.body.innerHTML = null;
                setupDom();
            } else {
                loadTasks(tasks.getTodaysTasks(), container);
                return;
            }
        } else if (heading.textContent === "Week") {
            if (isValid(taskTitle.value, titleError, tag.value, tagError, priorityValue, priorityError, dateOfTask.valueAsDate, dateError)) {
                tasks.addToDo(taskTitle.value, dateOfTask.valueAsDate, tag.value, priorityValue);
                container.innerHTML = null;
                container.append(header);
                loadTasks(tasks.getWeeksTasks(), container);
                document.body.removeChild(form);
                localStorage.setItem("taskStorage", JSON.stringify(tasks));
                document.body.innerHTML = null;
                setupDom();
            } else {
                loadTasks(tasks.getWeeksTasks(), container);
                return;
            }
        } else if (pList.contains(heading.textContent)) {
            if (isValid(taskTitle.value, titleError, heading.textContent, tagError, priorityValue, priorityError, dateOfTask.valueAsDate, dateError)) {
                tasks.addToDo(taskTitle.value, dateOfTask.valueAsDate, heading.textContent, priorityValue);
                container.innerHTML = null;
                container.append(header);
                loadTasks(tasks.getTasksWithTag(heading.textContent), container);
                document.body.removeChild(form);
                localStorage.setItem("taskStorage", JSON.stringify(tasks));
                document.body.innerHTML = null;
                setupDom();
            } else {
                loadTasks(tasks.getTasksWithTag(heading.textContent), container);
                return;
            }
        }
    });

    if (heading.textContent === "Today") {
        form.append(titleDiv, tagDiv, priorityDiv, add);
    } else if (pList.contains(heading.textContent)) {
        form.append(titleDiv, dateDiv, priorityDiv, add);
    } else {
        form.append(titleDiv, dateDiv, tagDiv, priorityDiv, add);
    }
    return form;
}

function loadInbox() {
    const container = document.createElement("div");

    const inboxTasks = tasks.getInbox();

    const header = document.createElement("div");
    header.classList.add("header");
    const heading = document.createElement("h2");
    heading.textContent = "Inbox";

    setupCenter(inboxTasks, container, header, heading);
    return container;
}

function loadWeek() {
    const container = document.createElement("div");

    const weekTasks = tasks.getWeeksTasks();

    const header = document.createElement("div");
    header.classList.add("header");
    const heading = document.createElement("h2");
    heading.textContent = "Week";

    setupCenter(weekTasks, container, header, heading);
    return container;
}

function loadToday() {
    const container = document.createElement("div");

    const todayTasks = tasks.getTodaysTasks();

    const header = document.createElement("div");
    header.classList.add("header");
    const heading = document.createElement("h2");
    heading.textContent = "Today";

    setupCenter(todayTasks, container, header, heading);
    return container;
}

function loadTags(tag) {
    const container = document.createElement("div");

    const tagTasks = tasks.getTasksWithTag(tag);

    const header = document.createElement("div");
    header.classList.add("header");
    const heading = document.createElement("h2");
    heading.textContent = tag;

    setupCenter(tagTasks, container, header, heading);
    return container;
}

function loadTasks(array, container) {

    array.forEach(element => {
        if (!element.getCompleted()) {
            const task = document.createElement("div");
            task.classList.add("task-container");
            const title = document.createElement("p");
            title.textContent = element.getTitle();
            title.classList.add("task-item");

            const date = document.createElement("p");
            date.textContent = element.getDay();
            if (element.overdue) {
                date.style.color = "red";
            }
            date.classList.add("task-item");

            const priority = document.createElement("div");
            priority.classList.add("priority");
            priority.classList.add("task-item");

            switch (element.getPriority()) {
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
            checkbox.classList.add("task-item");
            const form = document.createElement("div");
            form.classList.add("form")
            form.addEventListener("click", ()=>{
                document.body.removeChild(form);
            })
            let comments = ["Good job!", "You're on a roll!", "You're getting shit done!", "Keep on keeping on!"]
            form.textContent = comments[Math.floor(Math.random() * (comments.length - 0) + 0)];

            checkbox.addEventListener("click", () => {
                document.body.append(form);
                element.complete();
                tasks.removeToDo(element.getTitle());
                container.removeChild(task);
                localStorage.setItem("taskStorage", JSON.stringify(tasks));
                document.body.innerHTML = null;
                setupDom()
                document.body.append(form);
            });


            task.append(title, date, priority, checkbox);
            container.append(task);
        }

    });
}

function isValid(title, titleError, tag, tagError, priorityValue, rbError, date, dateError) {
    let valid = true;

    if (isEmpty(title, titleError)) {
        valid = false;
        titleError.textContent = "Cannot be empty";
    }
    if (isEmpty(tag, tagError)) {
        valid = false;
        tagError.textContent = "Cannot be empty";
    }
    if (!isSelected(priorityValue, rbError)) {
        valid = false;
        rbError.textContent = "Select an option";
    }
    if (dateIsEmpty(date, dateError)) {
        valid = false;
        dateError.textContent = "Select date";
    }
    return valid;
}

function isEmpty(title, error) {
    error.textContent = "";
    if (title === "") {
        error.textContent = "Cannot be empty";
        return true;
    }
    return false;
}

function isSelected(priorityValue, error) {
    error.textContent = "";
    if (priorityValue === 0) {
        error.textContent = "Must select option";
        return false;
    }
    return true;
}

function dateIsEmpty(date, error) {
    error.textContent = "";
    if (date === null) {
        error.textContent = "Must select date";
        return true;
    }
    return false;
}

export function setupTodoDom() {

    const line = document.createElement("hr");

    const container = document.createElement("div");

    container.append(setupButtons(), line, setupProjects());

    return container;
}

function setupButtons() {

    const container = document.createElement("div");

    const today = document.createElement("div");
    today.classList.add("todo-options");
    const todayIcon = new Image()
    todayIcon.classList.add("icons");
    todayIcon.src = Today;
    const title1 = document.createElement("button");
    title1.textContent = "Today";
    title1.classList.add("todo-btns");
    today.append(todayIcon, title1);

    const week = document.createElement("div");
    week.classList.add("todo-options");
    const weekIcon = new Image();
    weekIcon.classList.add("icons");
    weekIcon.src = Week;
    const title2 = document.createElement("button");
    title2.textContent = "Week";
    title2.classList.add("todo-btns");
    week.append(weekIcon, title2);

    const inbox = document.createElement("div");
    inbox.classList.add("todo-options");
    const inboxIcon = new Image();
    inboxIcon.classList.add("icons");
    inboxIcon.src = Inbox;
    const title3 = document.createElement("button");
    title3.textContent = "Inbox";
    title3.classList.add("todo-btns");
    inbox.append(inboxIcon, title3);

    container.append(today, week, inbox);

    return container;
}

function setupProjects() {

    let count = 1;

    const projects = document.createElement("div");
    projects.classList.add("projects");

    const projectsHeading = document.createElement("div");
    projectsHeading.setAttribute("id", "projects-heading");

    const title4 = document.createElement("p");
    title4.textContent = "Projects";

    const expand = new Image();
    expand.src = ExpandMore;

    const form = document.createElement("div");
    form.classList.add("form");

    const title = document.createElement("input");
    title.type = "text";
    title.classList.add("input-task");
    title.placeholder = "Enter name of project";

    const btnAdd = document.createElement("button");
    btnAdd.textContent = "Add";
    btnAdd.addEventListener("click", () => {
        if(title.value === ""){
            alert("Cannot be empty");
            return;
        }
        pList.addProject(title.value);
        document.body.removeChild(form);
        projectContainer.innerHTML = null;
        loadProjects(pList, projectContainer, projects);
        localStorage.setItem("projectStorage", JSON.stringify(pList));
    });
    form.append(title, btnAdd);

    const addIcon = new Image();
    addIcon.src = Add;
    addIcon.addEventListener("click", () => {
        document.body.appendChild(form);
        form.style.visibility = "visible";
    });

    projectsHeading.append(addIcon, title4, expand);
    projects.append(projectsHeading);

    const projectContainer = document.createElement("div");
    projectContainer.classList.add("projects-container");
    expand.onclick = () => {
        count++;
        if (count % 2 == 0) {
            expand.src = ExpandLess;
            projectContainer.style.visibility = "hidden";
        } else {
            expand.src = ExpandMore;
            projectContainer.style.visibility = "visible";
        }
    }

    loadProjects(pList, projectContainer, projects);

    return projects;
}

function loadProjects(array, projectContainer, projects) {
    let i = 0;

    array.getProjects().forEach(element => {
        const div = document.createElement("div");
        div.classList.add("display-row");

        const deleteProject = document.createElement("p");
        deleteProject.innerHTML = "&#10006;";
        deleteProject.classList.add("delete-projects");
        deleteProject.id = i;
        deleteProject.addEventListener("click", (e) => {
            tasks.removeTasksWithTag(e.target.parentNode.children[1].textContent);
            pList.removeProject(e.target.parentNode.children[1].textContent);
            projectContainer.removeChild(e.target.parentNode);
            localStorage.setItem("taskStorage", JSON.stringify(tasks));
            localStorage.setItem("projectStorage", JSON.stringify(pList));
            document.body.innerHTML = null;
            setupDom();
        });
        const project = document.createElement("p");
        project.textContent = element;

        div.append(deleteProject, project);
        projectContainer.append(div);
        i++;
    });

    projects.append(projectContainer);
}

export function setupDom() {

    const taskData = JSON.parse(localStorage.getItem("taskStorage"));

    if (localStorage.length > 0) {
        let newList = new List();
        taskData.listOfTodos.forEach(element => {
            newList.addToDo(element.title, new Date(element.date), element.tag, element.priority);
        });

        let newProjectList = new ProjectsList(newList);
        
        tasks = newList;
        pList = newProjectList;
    }

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

    siderbar1.append(brand);

    const center = document.createElement("div");
    center.append(loadToday());
    center.setAttribute("id", "center");

    window.addEventListener("click", (e) => {
        if (e.target.textContent === "Today") {
            center.innerHTML = null;
            center.append(loadToday());
        } else if (e.target.textContent === "Week") {
            center.innerHTML = null;
            center.append(loadWeek());
        } else if (e.target.textContent === "Inbox") {
            center.innerHTML = null;
            center.append(loadInbox());
        } else if (pList.contains(e.target.innerText)) {
            center.innerHTML = null;
            center.append(loadTags(e.target.innerText));
        }
    });

    document.body.append(siderbar1, center, features);
}