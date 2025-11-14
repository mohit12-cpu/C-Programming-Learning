// Projects View Controller
window.viewControllers = window.viewControllers || {};

window.viewControllers['projects'] = {
    init: function(params) {
        console.log('Initializing Projects view');
        this.params = params || {};
        this.render();
        this.bindEvents();
    },
    
    destroy: function() {
        console.log('Destroying Projects view');
        // Clean up any event listeners or resources
    },
    
    render: function() {
        // If a specific project is requested, show it
        if (this.params && this.params.id && app.projects[this.params.id]) {
            this.showProjectDetail(this.params.id);
        } else {
            this.showProjectList();
        }
    },
    
    bindEvents: function() {
        // Events are bound in the render functions
    },
    
    showProjectList: function() {
        const appElement = document.getElementById('app');
        appElement.innerHTML = `
            <div class="page projects-page active">
                <div class="container">
                    <h2>C Programming Projects</h2>
                    <div class="search-box">
                        <input type="text" id="projectSearch" placeholder="Search projects...">
                    </div>
                    <div class="project-grid" id="projectGrid">
                        <!-- Projects will be populated here -->
                    </div>
                </div>
            </div>
        `;
        
        // Populate projects
        this.populateProjects();
        
        // Add search functionality
        document.getElementById('projectSearch').addEventListener('input', (e) => {
            this.filterProjects(e.target.value);
        });
    },
    
    populateProjects: function() {
        const projectGrid = document.getElementById('projectGrid');
        const projects = app.projects || {};
        const projectKeys = Object.keys(projects);
        
        if (projectKeys.length === 0) {
            projectGrid.innerHTML = '<p>No projects available</p>';
            return;
        }
        
        let projectHTML = '';
        projectKeys.forEach(key => {
            const project = projects[key];
            projectHTML += `
                <div class="project-card" data-project="${key}">
                    <div class="project-image">${project.title}</div>
                    <div class="project-content">
                        <h3>${project.title}</h3>
                        <p>${project.description}</p>
                        <button class="btn btn-primary" onclick="window.location.hash='#/projects/${key}'">View Project</button>
                    </div>
                </div>
            `;
        });
        
        projectGrid.innerHTML = projectHTML;
    },
    
    filterProjects: function(term) {
        const projectCards = document.querySelectorAll('.project-card');
        term = term.toLowerCase();
        
        projectCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();
            if (title.includes(term) || description.includes(term)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    },
    
    showProjectDetail: function(projectId) {
        const project = app.projects[projectId];
        if (!project) {
            document.getElementById('app').innerHTML = `
                <div class="page project-detail-page active">
                    <div class="container">
                        <button class="btn btn-outline" onclick="window.location.hash='#/projects'">← Back to Projects</button>
                        <h2>Project Not Found</h2>
                        <p>The requested project could not be found.</p>
                    </div>
                </div>
            `;
            return;
        }
        
        const appElement = document.getElementById('app');
        appElement.innerHTML = `
            <div class="page project-detail-page active">
                <div class="container">
                    <button class="btn btn-outline" onclick="window.location.hash='#/projects'">← Back to Projects</button>
                    <h2>${project.title}</h2>
                    <p>${project.description}</p>
                    
                    <div class="editor-container">
                        <div class="editor-header">
                            <h3>${projectId}.c</h3>
                            <div>
                                <button class="btn btn-outline" id="copyProjectCode" data-code="${project.code.replace(/"/g, '&quot;')}">Copy Code</button>
                                <button class="btn btn-outline" id="downloadProject">Download</button>
                                <button class="btn btn-primary" id="markAsCompleted">Mark as Completed</button>
                            </div>
                        </div>
                        <div class="editor-body">
                            <pre class="snippet-code"><code class="language-c">${project.code}</code></pre>
                        </div>
                    </div>
                    
                    <div class="project-output">
                        <h3>Sample Output</h3>
                        <div class="console">
                            ${project.output || '// Sample output would be shown here'}
                        </div>
                    </div>
                    
                    <div class="project-steps">
                        <h3>Steps to Run Locally</h3>
                        <ol>
                            <li>Copy the code above</li>
                            <li>Save it as <strong>${projectId}.c</strong> in your local directory</li>
                            <li>Open terminal/command prompt</li>
                            <li>Compile with: <code>gcc ${projectId}.c -o ${projectId}</code></li>
                            <li>Run with: <code>./${projectId}</code> (Linux/Mac) or <code>${projectId}.exe</code> (Windows)</li>
                        </ol>
                    </div>
                </div>
            </div>
        `;
        
        // Initialize Prism for syntax highlighting
        if (typeof Prism !== 'undefined') {
            Prism.highlightAll();
        }
        
        // Add event listeners
        document.getElementById('copyProjectCode').addEventListener('click', (e) => {
            const code = e.target.getAttribute('data-code');
            navigator.clipboard.writeText(code).then(() => {
                const originalText = e.target.textContent;
                e.target.textContent = 'Copied!';
                setTimeout(() => {
                    e.target.textContent = originalText;
                }, 2000);
            });
        });
        
        document.getElementById('downloadProject').addEventListener('click', () => {
            const blob = new Blob([project.code.replace(/&lt;/g, '<').replace(/&gt;/g, '>')], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            
            const a = document.createElement('a');
            a.href = url;
            a.download = projectId + '.c';
            document.body.appendChild(a);
            a.click();
            
            // Clean up
            setTimeout(() => {
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            }, 100);
        });
        
        // Add mark as completed functionality
        document.getElementById('markAsCompleted').addEventListener('click', () => {
            this.markProjectAsCompleted(projectId);
        });
    },
    
    markProjectAsCompleted: function(projectId) {
        // Load progress
        let progress = StorageHelper.loadProgress() || {
            xp: 0,
            lessonsCompleted: [],
            quizzesTaken: [],
            projectsCompleted: []
        };
        
        // Initialize projectsCompleted array if it doesn't exist
        if (!progress.projectsCompleted) {
            progress.projectsCompleted = [];
        }
        
        // Add project to completed list if not already there
        if (!progress.projectsCompleted.includes(projectId)) {
            progress.projectsCompleted.push(projectId);
            progress.xp += 200; // Award 200 XP for completing a project
            
            // Save progress
            StorageHelper.saveProgress(progress);
            
            // Show notification
            this.showNotification(`🎉 Project completed! You earned 200 XP.`);
        } else {
            this.showNotification('Project already marked as completed!');
        }
    },
    
    showNotification: function(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: #27ae60;
            color: white;
            padding: 15px 20px;
            border-radius: 5px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            z-index: 1000;
            animation: slideIn 0.3s, fadeOut 0.5s 2.5s;
        `;
        
        document.body.appendChild(notification);
        
        // Remove after animation
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
};