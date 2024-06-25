class Project {
    constructor(name) {
        this.name = name;
        this.tasks = [];
    }

    addTask(task) {
        this.tasks.push(task);
    }

    removeTask(task_index) {
        this.tasks.splice(task_index, 1);
    }
}

export { Project };