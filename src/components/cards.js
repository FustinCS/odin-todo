import { TodoItem } from "../objects/todo";

function itemCardComponent(todoItem) {
    const card = document.createElement('div');
    const title = document.createElement('h2');
    const description = document.createElement('p');
    const dueDate = document.createElement('p');
    const priority = document.createElement('p');

    title.textContent = todoItem.title;
    description.textContent = todoItem.description;
    dueDate.textContent = todoItem.dueDate;
    priority.textContent = todoItem.priority;

    card.appendChild(title);
    card.appendChild(description);
    card.appendChild(dueDate);
    card.appendChild(priority);

    card.classList.add('card');

    return card;
}

export { itemCardComponent };