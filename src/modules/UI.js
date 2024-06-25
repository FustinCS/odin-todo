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
        this.renderAddProjectsButton();
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
        const sidebar = document.getElementById('sidebar');
        // create button
        const addButton = document.createElement('button');
        addButton.textContent = 'Add Project';
        
        // create modal for button
        const dialog = document.createElement('dialog');
        dialog.setAttribute('id', 'projects-dialog');
        dialog.classList.add('projects-dialog');
        
        const form = document.createElement('form');
        form.setAttribute('id', 'projects-form');

        const label = document.createElement('label');
        label.setAttribute('for', 'projectTitle');
        label.textContent = 'Title:';

        const inputField = document.createElement('input');
        inputField.setAttribute('type', 'text');
        inputField.setAttribute('id', 'projectTitle');
        inputField.setAttribute('name', 'projectTitle');

        const submit = document.createElement('button');
        submit.setAttribute('type', 'submit');
        submit.setAttribute('value', 'submit');
        submit.textContent = 'Submit';

        submit.addEventListener('click', (event) => {
            event.preventDefault();
            dialog.close();
            const title = inputField.value;
            const newProject = new Project(title);
            this.projects.push(newProject);
            
            inputField.value = '';
            this.renderProjectsList();
            
        });

        form.appendChild(label);
        form.appendChild(inputField);
        form.appendChild(submit);

        dialog.appendChild(form);

        sidebar.appendChild(dialog);
        

        // add event listener to button
        addButton.addEventListener('click', () => {
            dialog.showModal();
        });

        // add to sidebar after project listing
        sidebar.appendChild(addButton);
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
        
        //Add Project Button

        // render all tasks
        for (let i = 0; i < selectedProject.tasks.length; i++) {
            const task = selectedProject.tasks[i];

            const taskContainer = document.createElement('div');
            const title = document.createElement('h1');
            const description = document.createElement('p');
            const dueDate = document.createElement('p');
            const priority = document.createElement('p');

            title.textContent = task.title;
            description.textContent = task.description;
            dueDate.textContent = task.dueDate;
            priority.textContent = task.priority;

            // remove current task button
            const removeBtn = document.createElement('button');
            removeBtn.textContent = 'Remove';
            removeBtn.addEventListener('click', (event) => {
                const taskContainer = event.target.parentElement
                selectedProject.removeTask(i);
                mainContent.removeChild(taskContainer);
            })

            taskContainer.appendChild(title);
            taskContainer.appendChild(description);
            taskContainer.appendChild(dueDate);
            taskContainer.appendChild(priority);
            taskContainer.appendChild(removeBtn);

            // Add new content
            mainContent.appendChild(taskContainer);
        }

    }

}

export { UI };