import { Project } from "./Project";
import { Task } from "./Task";

class UI {
    constructor() {
        let localStorageProjects = JSON.parse(localStorage.getItem('projects'));
        
        if (localStorageProjects) {
            this.projects = localStorageProjects.map(projectData => {
                let project = new Project(projectData.name);
                project.tasks = projectData.tasks.map(taskData => new Task(taskData.title, taskData.dueDate));
                return project;

            });
        }
        else {
            this.projects = [new Project('Default')];
            this.projects[0].addTask(new Task('Valorant', '07/30'));
        }
        
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
            if (title) {
                const newProject = new Project(title);
                this.projects.push(newProject);
                localStorage.setItem('projects', JSON.stringify(this.projects));
                
                inputField.value = '';
                this.renderProjectsList();
            }
            else {
                alert("No Project Title Given!");
            }
            
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

    #renderAddTaskButton(selectedProject) {
        // create button
        const buttonContainer = document.createElement('div');
        const addBtn = document.createElement('button');
        addBtn.textContent = 'Add Task';

        // create modal
        const dialog = document.createElement('dialog');
        dialog.setAttribute('id', 'tasks-dialog');
        dialog.classList.add('tasks-dialog');
        
        const form = document.createElement('form');
        form.setAttribute('id', 'tasks-form');

        const titleLabel = document.createElement('label');
        titleLabel.setAttribute('for', 'taskTitle');
        titleLabel.textContent = 'Title:';

        const titleInput = document.createElement('input');
        titleInput.setAttribute('type', 'text');
        titleInput.setAttribute('id', 'taskTitle');
        titleInput.setAttribute('name', 'taskTitle');

        const dateLabel = document.createElement('label');
        dateLabel.setAttribute('for', 'taskDate');
        dateLabel.textContent = 'Title:';

        const dateInput = document.createElement('input');
        dateInput.setAttribute('type', 'date');
        dateInput.setAttribute('id', 'taskDate');
        dateInput.setAttribute('name', 'taskDate');

        const submit = document.createElement('button');
        submit.setAttribute('type', 'submit');
        submit.setAttribute('value', 'submit');
        submit.textContent = 'Submit';

        form.appendChild(titleLabel);
        form.appendChild(titleInput);
        form.appendChild(dateLabel);
        form.appendChild(dateInput);
        form.appendChild(submit);

        dialog.appendChild(form);

        submit.addEventListener('click', (event) => {
            event.preventDefault();
            dialog.close();
            const title = titleInput.value;
            const date = dateInput.value;

            if (title && date) {
                const mainContent = document.getElementById('main-content');
                const newTask = new Task(title, date);
                selectedProject.addTask(newTask);
                localStorage.setItem('projects', JSON.stringify(this.projects));
                
                titleInput.value = '';
                dateInput.value = '';
                
                // remove all tasks
                const allTasks = document.getElementById('all-task-container');
                allTasks.replaceChildren();
                // readd tasks
                mainContent.appendChild(this.#renderTasks(selectedProject));
                
            }
            else {
                alert("No Task Title Given!");
            }
            
        });

        addBtn.addEventListener('click', () => {
            dialog.showModal();
        });
        
        buttonContainer.appendChild(addBtn);
        buttonContainer.appendChild(dialog);

        return buttonContainer;
    }

    #renderCurrentSelectedProject(event) {
        // Get index of project
        const clickedButton = event.target;
        const projectButtons = Array.from(document.querySelectorAll('.project-button'));
        const selectedIndex = projectButtons.indexOf(clickedButton);

        const selectedProject = this.projects[selectedIndex];    

        // Clear previous content
        const mainContent = document.getElementById('main-content');
        mainContent.replaceChildren();
        
        // Add Project Button
        mainContent.appendChild(this.#renderAddTaskButton(selectedProject));

        // render all tasks
        mainContent.appendChild(this.#renderTasks(selectedProject));

    }

    #renderTasks(selectedProject) {
        const allTasks = document.createElement('div');
        allTasks.setAttribute('id', 'all-task-container');

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

            // Remove current task button
            const removeBtn = document.createElement('button');
            removeBtn.textContent = 'Remove';
            removeBtn.addEventListener('click', (event) => {
                const taskContainer = event.target.parentElement
                selectedProject.removeTask(i);
                localStorage.setItem('projects', JSON.stringify(this.projects));
                allTasks.removeChild(taskContainer);
            })

            taskContainer.appendChild(title);
            taskContainer.appendChild(description);
            taskContainer.appendChild(dueDate);
            taskContainer.appendChild(priority);
            taskContainer.appendChild(removeBtn);

            // Add new content
            allTasks.appendChild(taskContainer);
        }

        return allTasks;
    }
}

export { UI };