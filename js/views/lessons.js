// Lessons View Controller
window.viewControllers = window.viewControllers || {};

window.viewControllers['lessons'] = {
    init: function(params) {
        console.log('Initializing Lessons view');
        this.params = params || {};
        this.render();
        this.bindEvents();
    },
    
    destroy: function() {
        console.log('Destroying Lessons view');
        // Clean up any event listeners or resources
    },
    
    render: function() {
        const app = document.getElementById('app');
        app.innerHTML = `
            <div class="page lessons-page active">
                <div class="container">
                    <h2>C Programming Lessons</h2>
                    <div class="lessons-container">
                        <div class="sidebar">
                            <div class="search-box">
                                <input type="text" id="lessonSearch" placeholder="Search lessons...">
                            </div>
                            <h3>Syllabus</h3>
                            <ul class="lesson-list" id="lessonList">
                                <!-- Lessons will be populated here -->
                            </ul>
                        </div>
                        <div class="lesson-content">
                            <div id="lessonViewer">
                                <h2 id="lessonTitle">Select a Lesson</h2>
                                <div id="lessonText">
                                    <p>Please select a lesson from the sidebar to begin learning.</p>
                                </div>
                                <div class="lesson-actions">
                                    <button class="btn btn-primary" id="prevLesson" disabled>Previous</button>
                                    <button class="btn btn-primary" id="nextLesson" disabled>Next</button>
                                    <button class="btn btn-outline" id="bookmarkLesson">Bookmark</button>
                                    <button class="btn btn-outline" id="takeQuiz" style="display: none;">Take Quiz</button>
                                    <button class="btn btn-success" id="markCompleted" style="display: none;">Mark as Completed</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Populate lesson list
        this.populateLessonList();
        
        // If a specific lesson is requested, show it
        if (this.params && this.params.id) {
            this.showLesson(this.params.id);
        }
    },
    
    bindEvents: function() {
        // Add search functionality
        const searchInput = document.getElementById('lessonSearch');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.filterLessons(e.target.value);
            });
        }
        
        // Add event listeners for lesson navigation
        const prevButton = document.getElementById('prevLesson');
        const nextButton = document.getElementById('nextLesson');
        const bookmarkButton = document.getElementById('bookmarkLesson');
        const quizButton = document.getElementById('takeQuiz');
        const markCompletedButton = document.getElementById('markCompleted');
        
        if (prevButton) {
            prevButton.addEventListener('click', () => {
                this.navigateLesson(-1);
            });
        }
        
        if (nextButton) {
            nextButton.addEventListener('click', () => {
                this.navigateLesson(1);
            });
        }
        
        if (bookmarkButton) {
            bookmarkButton.addEventListener('click', () => {
                this.toggleBookmark();
            });
        }
        
        if (quizButton) {
            quizButton.addEventListener('click', () => {
                this.takeQuiz();
            });
        }
        
        if (markCompletedButton) {
            markCompletedButton.addEventListener('click', () => {
                this.toggleCompleted();
            });
        }
    },
    
    populateLessonList: function() {
        const lessonList = document.getElementById('lessonList');
        if (!lessonList) return;
        
        // Get lessons from the global app object
        const lessons = window.app ? window.app.lessons : {};
        
        const lessonKeys = Object.keys(lessons);
        
        if (lessonKeys.length === 0) {
            lessonList.innerHTML = '<li><p>No lessons available</p></li>';
            return;
        }
        
        // Create lesson list items
        let lessonHTML = '';
        lessonKeys.forEach((key, index) => {
            const lesson = lessons[key];
            // Check if this is one of our new sections (section13 through section20)
            if (key.startsWith('section')) {
                lessonHTML += `
                    <li class="syllabus-section">
                        <div class="section-header" data-section="${key}">
                            <span class="section-title">${lesson.title}</span>
                            <span class="section-toggle">+</span>
                        </div>
                        <div class="section-content" id="content-${key}" style="display: none;">
                            <p>${lesson.description}</p>
                            <ul class="topics-list">
                                ${lesson.topics.map(topic => `<li>${topic}</li>`).join('')}
                            </ul>
                            ${lesson.externalLinks ? `
                                <div class="external-links">
                                    ${lesson.externalLinks.map(link => 
                                        `<a href="${link.url}" target="_blank" class="btn btn-outline btn-small">${link.title}</a>`
                                    ).join('')}
                                </div>
                            ` : ''}
                            <div class="section-actions">
                                ${lesson.quiz ? `<button class="btn btn-outline take-quiz-btn" data-quiz="${lesson.quiz}">Take Quiz</button>` : ''}
                                <button class="btn btn-success mark-completed-btn" data-section="${key}">Mark as Completed</button>
                            </div>
                        </div>
                    </li>
                `;
            } else {
                // For existing lessons, keep the original format
                lessonHTML += `
                    <li>
                        <a href="#/lessons/${key}" data-lesson="${key}">
                            ${index + 1}. ${lesson.title}
                        </a>
                    </li>
                `;
            }
        });
        
        lessonList.innerHTML = lessonHTML;
        
        // Add click event listeners to section headers for expand/collapse
        document.querySelectorAll('.section-header').forEach(header => {
            header.addEventListener('click', (e) => {
                const sectionId = header.getAttribute('data-section');
                const content = document.getElementById(`content-${sectionId}`);
                const toggle = header.querySelector('.section-toggle');
                
                if (content.style.display === 'none') {
                    content.style.display = 'block';
                    toggle.textContent = '-';
                } else {
                    content.style.display = 'none';
                    toggle.textContent = '+';
                }
            });
        });
        
        // Add click event listeners to quiz buttons
        document.querySelectorAll('.take-quiz-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const quizId = e.target.getAttribute('data-quiz');
                window.location.hash = `#/quizzes/${quizId}`;
            });
        });
        
        // Add click event listeners to mark completed buttons
        document.querySelectorAll('.mark-completed-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const sectionId = e.target.getAttribute('data-section');
                this.toggleSectionCompleted(sectionId);
            });
        });
        
        // Add click event listeners to lesson links
        document.querySelectorAll('[data-lesson]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const lessonId = e.target.getAttribute('data-lesson');
                this.showLesson(lessonId);
            });
        });
    },
    
    showLesson: function(lessonId) {
        // Get lessons from the global app object
        const lessons = window.app ? window.app.lessons : {};
        
        const lesson = lessons[lessonId];
        if (!lesson) {
            document.getElementById('lessonTitle').textContent = 'Lesson Not Found';
            document.getElementById('lessonText').innerHTML = '<p>The requested lesson could not be found.</p>';
            return;
        }
        
        // Update lesson title
        document.getElementById('lessonTitle').textContent = lesson.title;
        
        // Build lesson content
        let contentHTML = '';
        
        if (lesson.content) {
            lesson.content.forEach(section => {
                contentHTML += `
                    <h3>${section.section}</h3>
                    <p>${section.text.replace(/\n/g, '<br>')}</p>
                    <pre><code class="language-c">${section.code}</code></pre>
                    <div class="code-actions">
                        <button class="btn btn-outline btn-small copy-code" data-code="${section.code.replace(/"/g, '&quot;')}">Copy</button>
                        <button class="btn btn-outline btn-small download-code" data-code="${section.code.replace(/"/g, '&quot;')}" data-filename="${lessonId}-${section.section.replace(/\s+/g, '-')}.c">Download .c</button>
                    </div>
                `;
            });
        }
        
        document.getElementById('lessonText').innerHTML = contentHTML;
        
        // Initialize Prism for syntax highlighting
        if (typeof Prism !== 'undefined') {
            Prism.highlightAll();
        }
        
        // Add event listeners for code actions
        document.querySelectorAll('.copy-code').forEach(button => {
            button.addEventListener('click', (e) => {
                const code = e.target.getAttribute('data-code');
                navigator.clipboard.writeText(code).then(() => {
                    const originalText = e.target.textContent;
                    e.target.textContent = 'Copied!';
                    setTimeout(() => {
                        e.target.textContent = originalText;
                    }, 2000);
                });
            });
        });
        
        document.querySelectorAll('.download-code').forEach(button => {
            button.addEventListener('click', (e) => {
                const code = e.target.getAttribute('data-code');
                const filename = e.target.getAttribute('data-filename');
                
                const blob = new Blob([code], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);
                
                const a = document.createElement('a');
                a.href = url;
                a.download = filename;
                document.body.appendChild(a);
                a.click();
                
                // Clean up
                setTimeout(() => {
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);
                }, 100);
            });
        });
        
        // Update navigation buttons
        this.updateNavigation(lessonId);
        
        // Update bookmark button
        this.updateBookmarkButton(lessonId);
        
        // Show quiz button if lesson has quiz
        this.updateQuizButton(lessonId);
        
        // Show mark completed button
        this.updateMarkCompletedButton(lessonId);
        
        // Mark lesson as completed
        this.markLessonAsCompleted(lessonId);
    },
    
    updateNavigation: function(currentLessonId) {
        // Get lessons from the global app object
        const lessons = window.app ? window.app.lessons : {};
        
        const lessonKeys = Object.keys(lessons);
        const currentIndex = lessonKeys.indexOf(currentLessonId);
        
        const prevButton = document.getElementById('prevLesson');
        const nextButton = document.getElementById('nextLesson');
        
        if (currentIndex > 0) {
            prevButton.disabled = false;
            prevButton.onclick = () => {
                this.showLesson(lessonKeys[currentIndex - 1]);
            };
        } else {
            prevButton.disabled = true;
        }
        
        if (currentIndex < lessonKeys.length - 1) {
            nextButton.disabled = false;
            nextButton.onclick = () => {
                this.showLesson(lessonKeys[currentIndex + 1]);
            };
        } else {
            nextButton.disabled = true;
        }
    },
    
    updateBookmarkButton: function(lessonId) {
        const bookmarkButton = document.getElementById('bookmarkLesson');
        const bookmarks = StorageHelper.loadBookmarks() || [];
        const isBookmarked = bookmarks.some(item => item.type === 'lesson' && item.id === lessonId);
        
        bookmarkButton.textContent = isBookmarked ? 'Unbookmark' : 'Bookmark';
        bookmarkButton.onclick = () => {
            this.toggleLessonBookmark(lessonId);
        };
    },
    
    toggleLessonBookmark: function(lessonId) {
        const bookmarks = StorageHelper.loadBookmarks() || [];
        const bookmarkIndex = bookmarks.findIndex(item => item.type === 'lesson' && item.id === lessonId);
        
        if (bookmarkIndex >= 0) {
            // Remove bookmark
            bookmarks.splice(bookmarkIndex, 1);
            document.querySelector(`[data-lesson="${lessonId}"]`).classList.remove('bookmarked');
        } else {
            // Add bookmark
            bookmarks.push({ type: 'lesson', id: lessonId });
            document.querySelector(`[data-lesson="${lessonId}"]`).classList.add('bookmarked');
        }
        
        StorageHelper.saveBookmarks(bookmarks);
        this.updateBookmarkButton(lessonId);
    },
    
    updateQuizButton: function(lessonId) {
        const quizButton = document.getElementById('takeQuiz');
        // Get lessons from the global app object
        const lessons = window.app ? window.app.lessons : {};
        const lesson = lessons[lessonId];
        
        // Check if lesson has a quiz
        const hasQuiz = lesson && lesson.quiz;
        
        if (hasQuiz) {
            quizButton.style.display = 'inline-block';
            quizButton.onclick = () => {
                window.location.hash = `#/quizzes/${lesson.quiz}`;
            };
        } else {
            quizButton.style.display = 'none';
        }
    },
    
    updateMarkCompletedButton: function(lessonId) {
        const markCompletedButton = document.getElementById('markCompleted');
        // Load progress
        let progress = StorageHelper.loadProgress() || {
            xp: 0,
            lessonsCompleted: [],
            quizzesTaken: [],
            projectsCompleted: []
        };
        
        // Check if lesson is already completed
        const isCompleted = progress.lessonsCompleted.includes(lessonId);
        
        markCompletedButton.textContent = isCompleted ? 'Completed' : 'Mark as Completed';
        markCompletedButton.onclick = () => {
            this.toggleLessonCompleted(lessonId);
        };
        
        markCompletedButton.style.display = 'inline-block';
    },
    
    toggleLessonCompleted: function(lessonId) {
        // Load progress
        let progress = StorageHelper.loadProgress() || {
            xp: 0,
            lessonsCompleted: [],
            quizzesTaken: [],
            projectsCompleted: []
        };
        
        const markCompletedButton = document.getElementById('markCompleted');
        const isCurrentlyCompleted = progress.lessonsCompleted.includes(lessonId);
        
        if (isCurrentlyCompleted) {
            // Remove from completed
            const index = progress.lessonsCompleted.indexOf(lessonId);
            if (index > -1) {
                progress.lessonsCompleted.splice(index, 1);
            }
            markCompletedButton.textContent = 'Mark as Completed';
        } else {
            // Add to completed
            progress.lessonsCompleted.push(lessonId);
            progress.xp += 10; // 10 XP for completing a lesson
            
            markCompletedButton.textContent = 'Completed';
            
            // Show notification
            this.showNotification(`🎉 Lesson completed! You earned 10 XP.`);
        }
        
        // Save progress
        StorageHelper.saveProgress(progress);
    },
    
    toggleSectionCompleted: function(sectionId) {
        // Load progress
        let progress = StorageHelper.loadProgress() || {
            xp: 0,
            lessonsCompleted: [],
            quizzesTaken: [],
            projectsCompleted: []
        };
        
        const isCurrentlyCompleted = progress.lessonsCompleted.includes(sectionId);
        
        if (isCurrentlyCompleted) {
            // Remove from completed
            const index = progress.lessonsCompleted.indexOf(sectionId);
            if (index > -1) {
                progress.lessonsCompleted.splice(index, 1);
            }
            // Update button text
            document.querySelector(`.mark-completed-btn[data-section="${sectionId}"]`).textContent = 'Mark as Completed';
        } else {
            // Add to completed
            progress.lessonsCompleted.push(sectionId);
            progress.xp += 10; // 10 XP for completing a section
            
            // Update button text
            document.querySelector(`.mark-completed-btn[data-section="${sectionId}"]`).textContent = 'Completed';
            
            // Show notification
            this.showNotification(`🎉 Section completed! You earned 10 XP.`);
        }
        
        // Save progress
        StorageHelper.saveProgress(progress);
    },
    
    markLessonAsCompleted: function(lessonId) {
        // Load progress
        let progress = StorageHelper.loadProgress() || {
            xp: 0,
            lessonsCompleted: [],
            quizzesTaken: [],
            projectsCompleted: []
        };
        
        // Check if lesson is already completed
        if (!progress.lessonsCompleted.includes(lessonId)) {
            progress.lessonsCompleted.push(lessonId);
            progress.xp += 10; // 10 XP for completing a lesson
            
            // Save progress
            StorageHelper.saveProgress(progress);
            
            // Show notification
            this.showNotification(`🎉 Lesson completed! You earned 10 XP.`);
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
    },
    
    filterLessons: function(term) {
        const lessons = document.querySelectorAll('[data-lesson], .syllabus-section');
        term = term.toLowerCase();
        
        lessons.forEach(lesson => {
            const text = lesson.textContent.toLowerCase();
            if (text.includes(term)) {
                lesson.style.display = 'block';
            } else {
                lesson.style.display = 'none';
            }
        });
    },
    
    navigateLesson: function(direction) {
        // This will be handled by the updateNavigation function
    },
    
    takeQuiz: function() {
        // This will be handled by the updateQuizButton function
    },
    
    toggleBookmark: function() {
        // This will be handled by the updateBookmarkButton function
    },
    
    toggleCompleted: function() {
        // This will be handled by the updateMarkCompletedButton function
    }
};