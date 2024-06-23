import { createNewProjectModal } from "./modal";

function sidebarComponent() {
    const element = document.createElement('div');
    const name = document.createElement('h1');
    name.textContent = 'Your Todo List';
    const newBtn = document.createElement('button');
    newBtn.textContent = 'Add New Project';
    newBtn.classList.add('sidebar-button');
    newBtn.setAttribute('id', 'add-project');
    const projectsTitle = document.createElement('h1');
    projectsTitle.textContent = 'Projects';
    

    element.appendChild(name);
    element.appendChild(newBtn);
    element.appendChild(projectsTitle);
    element.appendChild(createNewProjectModal());
    element.classList.add('sidebar');
    element.setAttribute('id', 'sidebar');
    return element;
}

function bodyComponent() {
    const element = document.createElement('div');
    element.classList.add('content-body');
    element.setAttribute('id', 'content-body');

    return element;
}


function homeScreenComponent() {
    const element = document.createElement('div');
    element.appendChild(sidebarComponent());
    element.appendChild(bodyComponent());

    element.classList.add('content');

    return element;
}

export { homeScreenComponent };