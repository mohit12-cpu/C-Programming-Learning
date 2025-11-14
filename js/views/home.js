// Home View Controller
window.viewControllers = window.viewControllers || {};

window.viewControllers['home'] = {
    init: function(params) {
        console.log('Initializing Home view');
        this.render();
        this.bindEvents();
    },
    
    destroy: function() {
        console.log('Destroying Home view');
        // Clean up any event listeners or resources
    },
    
    render: function() {
        const app = document.getElementById('app');
        app.innerHTML = `
            <div class="page home-page active">
                <div class="container">
                    <!-- Hero Section -->
                    <section class="hero">
                        <h1>Learn C Programming - Zero to Hero</h1>
                        <p>Master C programming with interactive lessons, quizzes, and projects. No backend required - everything runs in your browser!</p>
                        <div class="hero-buttons">
                            <a href="#/lessons" class="btn btn-primary">Start Learning</a>
                            <a href="#/editor" class="btn btn-outline">Open Code Editor</a>
                        </div>
                    </section>
                    
                    <!-- Quick Stats -->
                    <div class="stats-grid">
                        <div class="stat-card">
                            <div class="stat-value" id="lessonsCount">0</div>
                            <div class="stat-label">Lessons</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-value" id="quizzesCount">0</div>
                            <div class="stat-label">Quizzes</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-value" id="projectsCount">0</div>
                            <div class="stat-label">Projects</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-value" id="xpValue">0</div>
                            <div class="stat-label">Your XP</div>
                        </div>
                    </div>
                    
                    <!-- Featured Sections -->
                    <div class="features-grid">
                        <div class="feature-card">
                            <h3>📚 Comprehensive Lessons</h3>
                            <p>From basics to advanced topics, our structured curriculum covers everything you need to master C programming.</p>
                            <a href="#/lessons" class="btn btn-primary">Explore Lessons</a>
                        </div>
                        <div class="feature-card">
                            <h3>💻 Hands-on Projects</h3>
                            <p>Build real-world applications with our guided projects to solidify your learning.</p>
                            <a href="#/projects" class="btn btn-primary">View Projects</a>
                        </div>
                        <div class="feature-card">
                            <h3>🧠 Interactive Quizzes</h3>
                            <p>Test your knowledge and earn XP with our interactive quizzes.</p>
                            <a href="#/quizzes" class="btn btn-primary">Take a Quiz</a>
                        </div>
                        <div class="feature-card">
                            <h3>🎮 Code Simulator</h3>
                            <p>Visualize memory allocation and pointer relationships with our interactive simulator.</p>
                            <a href="#/visualizer" class="btn btn-primary">Try Simulator</a>
                        </div>
                        <div class="feature-card">
                            <h3>📝 Practice Challenges</h3>
                            <p>Sharpen your skills with our coding challenges and exercises.</p>
                            <a href="#/challenges" class="btn btn-primary">Practice Coding</a>
                        </div>
                        <div class="feature-card">
                            <h3>📋 Interview Prep</h3>
                            <p>Prepare for technical interviews with our curated questions and mock interviews.</p>
                            <a href="#/interview" class="btn btn-primary">Prepare for Interviews</a>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Update stats
        this.updateStats();
    },
    
    bindEvents: function() {
        // Add any event listeners specific to the home page
    },
    
    updateStats: function() {
        // Get stats from localStorage
        const progress = StorageHelper.loadProgress() || {
            xp: 0,
            lessonsCompleted: [],
            quizzesTaken: [],
            projectsCompleted: []
        };
        
        // For now, we'll use hardcoded values since we don't have the full app object
        const lessons = { /* This would come from app.lessons in a full implementation */ };
        const quizzes = { /* This would come from app.quizzes in a full implementation */ };
        const projects = { /* This would come from app.projects in a full implementation */ };
        
        // Update lesson count
        document.getElementById('lessonsCount').textContent = Object.keys(lessons).length || 15;
        
        // Update quizzes count
        document.getElementById('quizzesCount').textContent = Object.keys(quizzes).length || 8;
        
        // Update projects count
        document.getElementById('projectsCount').textContent = Object.keys(projects).length || 5;
        
        // Update XP
        document.getElementById('xpValue').textContent = progress.xp || 0;
    }
};