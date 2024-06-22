class Project {
    constructor(title) {
        this.title = title;
        this.items = [];
    }

    addTodoItem(item) {
        this.items.push(item);
    }
}

class TodoItem {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }
}

export { Project, TodoItem };