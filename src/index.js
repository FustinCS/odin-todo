import { Project, TodoItem } from "./objects/todo";
import { homeScreenComponent } from "./components/homescreen";
import { displayTodoItems, displayProjectItems } from "./components/todoDisplay";
import "./style.css";

const content = document.getElementById('content');
let projects = [new Project('Default'), new Project('Number 2')];
projects[0].addTodoItem(new TodoItem('Valorant', 'Yes', '07/30', 'High'));
projects[1].addTodoItem(new TodoItem('CSGO', 'desc', '04/20', 'Low'));

content.appendChild(homeScreenComponent());

const todoContent = document.getElementById('content-body');
const sidebar = document.getElementById('sidebar');
const addProjectBtn = document.getElementById('add-project');
const newProjectDialog = document.getElementById('new-project-dialog');
const form = document.getElementById('projects-form');

sidebar.appendChild(displayProjectItems(projects));


addProjectBtn.addEventListener('click', () => {
    newProjectDialog.showModal();
})

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const title = document.getElementById('projectTitle').value;
    const input = document.getElementById('projectTitle').textContent = '';
    projects.push(new Project(title));

    sidebar.removeChild(document.getElementById('projects-container'));
    sidebar.appendChild(displayProjectItems(projects));
})



