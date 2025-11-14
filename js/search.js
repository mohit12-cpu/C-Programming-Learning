// Search functionality
class SearchSystem {
    constructor() {
        this.contentIndex = [];
        this.init();
    }

    init() {
        // Index content when page loads
        document.addEventListener('DOMContentLoaded', () => {
            this.indexContent();
        });
        
        // Add event listener to search input
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.handleSearch(e.target.value);
            });
        }
        
        // Listen for content updates
        document.addEventListener('contentUpdated', () => {
            this.indexContent();
        });
    }

    // Index all content for searching
    indexContent() {
        this.contentIndex = [];
        
        // Index lessons
        if (app && app.lessons) {
            Object.keys(app.lessons).forEach(key => {
                const lesson = app.lessons[key];
                let content = lesson.description || '';
                if (lesson.content) {
                    lesson.content.forEach(section => {
                        content += ' ' + section.text;
                    });
                }
                this.contentIndex.push({
                    type: 'lesson',
                    id: key,
                    title: lesson.title,
                    content: content
                });
            });
        }
        
        // Index projects
        if (app && app.projects) {
            Object.keys(app.projects).forEach(key => {
                const project = app.projects[key];
                this.contentIndex.push({
                    type: 'project',
                    id: key,
                    title: project.title,
                    content: project.description || ''
                });
            });
        }
        
        // Index quizzes
        if (app && app.quizzes) {
            Object.keys(app.quizzes).forEach(key => {
                const quiz = app.quizzes[key];
                let content = '';
                if (quiz.questions) {
                    quiz.questions.forEach(question => {
                        content += ' ' + question.question;
                        question.options.forEach(option => {
                            content += ' ' + option;
                        });
                    });
                }
                this.contentIndex.push({
                    type: 'quiz',
                    id: key,
                    title: quiz.title,
                    content: content
                });
            });
        }
        
        // Add some static content for demonstration
        this.contentIndex.push(
            { type: 'page', title: 'Code Editor', content: 'Write, compile, and run C code with syntax highlighting' },
            { type: 'page', title: 'Memory Simulator', content: 'Visualize memory allocation and pointer relationships' },
            { type: 'page', title: 'Progress Tracker', content: 'Track your learning progress, XP, and badges' }
        );
    }

    // Handle search input
    handleSearch(query) {
        if (query.length < 2) {
            this.hideSearchResults();
            return;
        }

        const results = this.search(query);
        this.displayResults(results, query);
    }

    // Perform search
    search(query) {
        const lowerQuery = query.toLowerCase();
        return this.contentIndex.filter(item => 
            item.title.toLowerCase().includes(lowerQuery) || 
            item.content.toLowerCase().includes(lowerQuery)
        );
    }

    // Display search results
    displayResults(results, query) {
        // Remove any existing search results container
        this.hideSearchResults();
        
        if (results.length === 0) {
            return;
        }
        
        // Create search results container
        const resultsContainer = document.createElement('div');
        resultsContainer.id = 'searchResults';
        resultsContainer.className = 'search-results';
        resultsContainer.style.cssText = `
            position: absolute;
            top: 100%;
            right: 0;
            background: var(--card-bg);
            border: 1px solid var(--border-color);
            border-radius: 4px;
            width: 300px;
            max-height: 400px;
            overflow-y: auto;
            z-index: 1000;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        `;
        
        // Add results
        results.forEach(result => {
            const resultItem = document.createElement('div');
            resultItem.className = 'search-result-item';
            resultItem.style.cssText = `
                padding: 10px;
                border-bottom: 1px solid var(--border-color);
                cursor: pointer;
                transition: background-color 0.2s;
            `;
            
            resultItem.innerHTML = `
                <div style="font-weight: bold;">${result.title}</div>
                <div style="font-size: 0.9em; opacity: 0.8;">${result.type}</div>
            `;
            
            resultItem.addEventListener('click', () => {
                // Navigate to appropriate page based on result type
                this.navigateToResult(result);
                this.hideSearchResults();
            });
            
            resultItem.addEventListener('mouseenter', () => {
                resultItem.style.backgroundColor = 'var(--sidebar-bg)';
            });
            
            resultItem.addEventListener('mouseleave', () => {
                resultItem.style.backgroundColor = '';
            });
            
            resultsContainer.appendChild(resultItem);
        });
        
        // Add to header
        const headerControls = document.querySelector('.header-controls');
        if (headerControls) {
            headerControls.style.position = 'relative';
            headerControls.appendChild(resultsContainer);
        }
    }

    // Hide search results
    hideSearchResults() {
        const existingResults = document.getElementById('searchResults');
        if (existingResults) {
            existingResults.remove();
        }
    }

    // Navigate to search result
    navigateToResult(result) {
        // Navigate to appropriate page based on result type
        switch(result.type) {
            case 'lesson':
                router.navigate('lessons');
                // In a full implementation, we would also open the specific lesson
                setTimeout(() => {
                    const lessonLink = document.querySelector(`[data-lesson="${result.id}"]`);
                    if (lessonLink) {
                        lessonLink.click();
                    }
                }, 100);
                break;
            case 'project':
                router.navigate('projects');
                // In a full implementation, we would also open the specific project
                setTimeout(() => {
                    const projectButton = document.querySelector(`button[onclick="app.showProjectDetail('${result.id}')"]`);
                    if (projectButton) {
                        projectButton.click();
                    }
                }, 100);
                break;
            case 'quiz':
                router.navigate('quizzes');
                break;
            case 'page':
                // For static pages, we map titles to routes
                const pageMap = {
                    'Code Editor': 'editor',
                    'Memory Simulator': 'simulator',
                    'Progress Tracker': 'progress'
                };
                const route = pageMap[result.title];
                if (route) {
                    router.navigate(route);
                }
                break;
            default:
                router.navigate('home');
        }
    }
}

// Initialize search system
const searchSystem = new SearchSystem();