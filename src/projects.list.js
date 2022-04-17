

export class ProjectsList{  
    
    constructor(list){
        this.projects = list.getProjects();
    }

    addProject(project){
        this.projects.push(project);
    }

    removeProject(project){
        let newArr = [];
        
        for(let i = 0; i < this.projects.length; i++){
            
            if(this.projects[i] !== project){
                newArr.push(this.projects[i]);
            }
        }

        this.projects = newArr;
    }

    getProjects(){
        return this.projects;
    }

    contains(project){
        return this.projects.indexOf(project) >= 0;
    }
}
