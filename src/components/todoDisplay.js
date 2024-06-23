import { itemCardComponent } from "./cards";

function displayTodoItems(project) {
    const element = document.createElement('div');
    
    const title = document.createElement('h1');
    title.textContent = project.title;
    title.classList.add('project-title');

    const todoContainer = document.createElement('div');
    todoContainer.classList.add('todo-container');

    for (let item of project.items) {
        const card = itemCardComponent(item);
        todoContainer.appendChild(card);
    }

    element.appendChild(title);
    element.appendChild(todoContainer);

    return element;
}

function displayProjectItems(projects) {
    const element = document.createElement('div');
    element.classList.add('projects-container');
    element.setAttribute('id', 'projects-container');

    for (let project of projects) {
        const projectButton = document.createElement('button');
        projectButton.textContent = project.title;
        projectButton.classList.add('sidebar-button');
        projectButton.addEventListener('click', () => {
            const contentBody = document.getElementById('content-body');
            contentBody.replaceChildren();
            contentBody.appendChild(displayTodoItems(project));
        })

        element.appendChild(projectButton);
    }

    return element;

}

export { displayTodoItems, displayProjectItems };