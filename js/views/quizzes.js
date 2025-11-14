// Quizzes View Controller
window.viewControllers = window.viewControllers || {};

window.viewControllers['quizzes'] = {
    init: function(params) {
        console.log('Initializing Quizzes view');
        this.params = params || {};
        this.render();
        this.bindEvents();
    },
    
    destroy: function() {
        console.log('Destroying Quizzes view');
        // Clean up any event listeners or resources
    },
    
    render: function() {
        // If a specific quiz is requested, show it
        if (this.params && this.params.id && app.quizzes[this.params.id]) {
            this.showQuiz(this.params.id);
        } else {
            this.showQuizList();
        }
    },
    
    bindEvents: function() {
        // Events are bound in the render functions
    },
    
    showQuizList: function() {
        const appElement = document.getElementById('app');
        appElement.innerHTML = `
            <div class="page quizzes-page active">
                <div class="container">
                    <h2>C Programming Quizzes</h2>
                    <div class="search-box">
                        <input type="text" id="quizSearch" placeholder="Search quizzes...">
                    </div>
                    <div class="quiz-grid" id="quizGrid">
                        <!-- Quizzes will be populated here -->
                    </div>
                </div>
            </div>
        `;
        
        // Populate quizzes
        this.populateQuizzes();
        
        // Add search functionality
        document.getElementById('quizSearch').addEventListener('input', (e) => {
            this.filterQuizzes(e.target.value);
        });
    },
    
    populateQuizzes: function() {
        const quizGrid = document.getElementById('quizGrid');
        const quizzes = app.quizzes || {};
        const quizKeys = Object.keys(quizzes);
        
        if (quizKeys.length === 0) {
            quizGrid.innerHTML = '<p>No quizzes available</p>';
            return;
        }
        
        let quizHTML = '';
        quizKeys.forEach(key => {
            const quiz = quizzes[key];
            quizHTML += `
                <div class="quiz-card" data-quiz="${key}">
                    <h3>${quiz.title}</h3>
                    <p>${quiz.questions.length} questions</p>
                    <button class="btn btn-primary" onclick="window.viewControllers['quizzes'].startQuiz('${key}')">Start Quiz</button>
                </div>
            `;
        });
        
        quizGrid.innerHTML = quizHTML;
    },
    
    filterQuizzes: function(term) {
        const quizCards = document.querySelectorAll('.quiz-card');
        term = term.toLowerCase();
        
        quizCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            if (title.includes(term)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    },
    
    startQuiz: function(quizId) {
        window.location.hash = `#/quizzes/${quizId}`;
        this.showQuiz(quizId);
    },
    
    showQuiz: function(quizId) {
        const quiz = app.quizzes[quizId];
        if (!quiz) {
            document.getElementById('app').innerHTML = `
                <div class="page quizzes-page active">
                    <div class="container">
                        <h2>Quiz Not Found</h2>
                        <p>The requested quiz could not be found.</p>
                        <a href="#/quizzes" class="btn btn-primary">Back to Quizzes</a>
                    </div>
                </div>
            `;
            return;
        }
        
        // Store current quiz data
        this.currentQuiz = quiz;
        this.currentQuizId = quizId;
        this.currentQuestionIndex = 0;
        this.quizScore = 0;
        this.userAnswers = [];
        
        this.renderQuizQuestion();
    },
    
    renderQuizQuestion: function() {
        const quiz = this.currentQuiz;
        const question = quiz.questions[this.currentQuestionIndex];
        
        if (!question) {
            this.showQuizResults();
            return;
        }
        
        let optionsHTML = '';
        question.options.forEach((option, index) => {
            const letters = ['A', 'B', 'C', 'D'];
            optionsHTML += `
                <li data-option="${index}" class="quiz-option">
                    <strong>${letters[index]}.</strong> ${option}
                </li>
            `;
        });
        
        const appElement = document.getElementById('app');
        appElement.innerHTML = `
            <div class="page quizzes-page active">
                <div class="container">
                    <h2>${quiz.title}</h2>
                    <div class="quiz-container">
                        <div class="progress-bar">
                            <div class="progress-fill" id="quizProgress" style="width: ${(this.currentQuestionIndex / quiz.questions.length) * 100}%"></div>
                        </div>
                        <div class="progress-text">
                            Question ${this.currentQuestionIndex + 1} of ${quiz.questions.length}
                        </div>
                        <div class="quiz-content" id="quizContent">
                            <div class="quiz-question">
                                <h3>${question.question}</h3>
                                <ul class="options">
                                    ${optionsHTML}
                                </ul>
                            </div>
                            <div class="quiz-navigation">
                                ${this.currentQuestionIndex > 0 ? 
                                    '<button class="btn btn-outline" id="prevQuestion">Previous</button>' : ''}
                                <button class="btn btn-primary" id="nextQuestion" disabled>
                                    ${this.currentQuestionIndex < quiz.questions.length - 1 ? 'Next' : 'Submit'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Add quiz functionality
        this.initQuizQuestion();
    },
    
    initQuizQuestion: function() {
        // Add option selection
        const options = document.querySelectorAll('.quiz-option');
        options.forEach(option => {
            option.addEventListener('click', () => {
                // Remove selected class from all options
                options.forEach(opt => opt.classList.remove('selected'));
                // Add selected class to clicked option
                option.classList.add('selected');
                
                // Enable next button
                document.getElementById('nextQuestion').disabled = false;
                
                // Store user answer
                const optionIndex = parseInt(option.getAttribute('data-option'));
                this.userAnswers[this.currentQuestionIndex] = optionIndex;
            });
        });
        
        // Previous button
        const prevButton = document.getElementById('prevQuestion');
        if (prevButton) {
            prevButton.addEventListener('click', () => {
                this.currentQuestionIndex--;
                this.renderQuizQuestion();
            });
        }
        
        // Next/Submit button
        const nextButton = document.getElementById('nextQuestion');
        nextButton.addEventListener('click', () => {
            // If last question, submit quiz
            if (this.currentQuestionIndex === this.currentQuiz.questions.length - 1) {
                this.submitQuiz();
            } else {
                this.currentQuestionIndex++;
                this.renderQuizQuestion();
            }
        });
    },
    
    submitQuiz: function() {
        // Calculate score
        this.quizScore = 0;
        this.currentQuiz.questions.forEach((question, index) => {
            if (this.userAnswers[index] === question.correct) {
                this.quizScore++;
            }
        });
        
        // Save quiz result
        const scorePercentage = Math.round((this.quizScore / this.currentQuiz.questions.length) * 100);
        StorageHelper.saveQuizResult(this.currentQuizId, scorePercentage);
        
        // Update progress
        let progress = StorageHelper.loadProgress() || {
            xp: 0,
            lessonsCompleted: [],
            quizzesTaken: [],
            projectsCompleted: []
        };
        
        // Check if quiz is already taken
        if (!progress.quizzesTaken.includes(this.currentQuizId)) {
            progress.quizzesTaken.push(this.currentQuizId);
            progress.xp += 50; // 50 XP for completing a quiz
            
            // Save progress
            StorageHelper.saveProgress(progress);
        }
        
        // Show results
        this.showQuizResults();
    },
    
    showQuizResults: function() {
        const scorePercentage = Math.round((this.quizScore / this.currentQuiz.questions.length) * 100);
        const appElement = document.getElementById('app');
        appElement.innerHTML = `
            <div class="page quizzes-page active">
                <div class="container">
                    <h2>Quiz Results: ${this.currentQuiz.title}</h2>
                    <div class="quiz-container">
                        <div class="results-summary">
                            <div class="score-circle">
                                <div class="score-value">${scorePercentage}%</div>
                                <div class="score-label">Score</div>
                            </div>
                            <div class="score-details">
                                <p>You answered ${this.quizScore} out of ${this.currentQuiz.questions.length} questions correctly.</p>
                                <p>You earned 50 XP for completing this quiz.</p>
                            </div>
                        </div>
                        <div class="quiz-actions">
                            <button class="btn btn-primary" onclick="window.location.hash='#/quizzes'">Back to Quizzes</button>
                            <button class="btn btn-outline" onclick="window.viewControllers['quizzes'].startQuiz('${this.currentQuizId}')">Retake Quiz</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
};