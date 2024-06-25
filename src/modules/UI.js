class UI {
    constructor() {
        this.projects = [];
    }
    
    // build homepage
    renderHomePage() {
        // sidebar
        const sidebar = document.createElement('div');
        sidebar.classList.add('sidebar')
        
        // main content screen
        const mainContent = document.createElement('div');
        mainContent.classList.add('main-content');

        document.body.appendChild(sidebar);
        document.body.appendChild(mainContent);
    }

    renderProjectsList() {

    }

    renderAddProjectsModal() {

    }

    #renderCurrentSelectedProject() {
        
    }

    // event listeners
}

export { UI };