import { Project } from "./Project";
import { Task } from "./Task";

class UI {
    constructor() {
        this.projects = [new Project('Default')];
        this.projects[0].addTask(new Task('Valorant', 'desc', '07/30', 'High'));
    }
    
    // build homepage
    renderHomePage() {
        // sidebar
        const sidebar = document.createElement('div');
        sidebar.classList.add('sidebar')
        sidebar.setAttribute('id', 'sidebar');

        const projectList = document.createElement('div');
        projectList.classList.add('project-list');
        projectList.setAttribute('id', 'project-list');
        
        sidebar.appendChild(projectList);
        
        // main content screen
        const mainContent = document.createElement('div');
        mainContent.classList.add('main-content');
        mainContent.setAttribute('id', 'main-content');

        document.body.appendChild(sidebar);
        document.body.appendChild(mainContent);
        this.renderProjectsList();
    }

    renderProjectsList() {
        const currentProjectList = document.getElementById('project-list');
        currentProjectList.replaceChildren();

        for (let project of this.projects) {
            const projectBtn = document.createElement('button');
            projectBtn.textContent = project.name;
            projectBtn.classList.add('project-button');
            projectBtn.addEventListener('click', (event) => {this.#renderCurrentSelectedProject(event)});
            
            currentProjectList.appendChild(projectBtn);
        }
        
    }

    renderAddProjectsButton() {

    }

    #renderCurrentSelectedProject(event) {
        // get index of project
        const clickedButton = event.target;
        const projectButtons = Array.from(document.querySelectorAll('.project-button'));
        const selectedIndex = projectButtons.indexOf(clickedButton);

        const selectedProject = this.projects[selectedIndex];    

        // clear previous content
        const mainContent = document.getElementById('main-content');
        mainContent.replaceChildren();

        for (let task of selectedProject.tasks) {
            const taskContainer = document.createElement('div');
            const title = document.createElement('h1');
            const description = document.createElement('p');
            const dueDate = document.createElement('p');
            const priority = document.createElement('p');

            title.textContent = task.title;
            description.textContent = task.description;
            dueDate.textContent = task.dueDate;
            priority.textContent = task.priority;

            taskContainer.appendChild(title);
            taskContainer.appendChild(description);
            taskContainer.appendChild(dueDate);
            taskContainer.appendChild(priority);

            // Add new content
            mainContent.appendChild(taskContainer);
        }

    }

    // event listeners
}

export { UI };