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
    },
    
    populateLessonList: function() {
        const lessonList = document.getElementById('lessonList');
        if (!lessonList) return;
        
        // Sample lessons data - in a real implementation, this would come from a JSON file
        const lessons = {
            "setup": {
                "title": "Environment Setup & Hello World",
                "description": "Learn how to set up your C development environment and write your first program"
            },
            "variables": {
                "title": "Variables and Data Types",
                "description": "Understanding how to declare and use variables in C"
            },
            "operators": {
                "title": "Operators in C",
                "description": "Learn about arithmetic, relational, logical, and other operators"
            },
            "pointers": {
                "title": "Pointer Fundamentals",
                "description": "Understanding what pointers are and how to use them effectively"
            },
            "memory": {
                "title": "Dynamic Memory Allocation",
                "description": "Learn how to allocate and deallocate memory at runtime"
            }
        };
        
        const lessonKeys = Object.keys(lessons);
        
        if (lessonKeys.length === 0) {
            lessonList.innerHTML = '<li><p>No lessons available</p></li>';
            return;
        }
        
        // Create lesson list items
        let lessonHTML = '';
        lessonKeys.forEach((key, index) => {
            const lesson = lessons[key];
            lessonHTML += `
                <li>
                    <a href="#/lessons/${key}" data-lesson="${key}">
                        ${index + 1}. ${lesson.title}
                    </a>
                </li>
            `;
        });
        
        lessonList.innerHTML = lessonHTML;
        
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
        // Sample lesson content - in a real implementation, this would come from a JSON file
        const lessons = {
            "setup": {
                "title": "Environment Setup & Hello World",
                "content": [
                    {
                        "section": "Introduction to C",
                        "text": "C is a general-purpose programming language developed by Dennis Ritchie at Bell Labs in the early 1970s. It is known for its efficiency, flexibility, and close-to-hardware programming capabilities. C is widely used for system programming, embedded systems, and application development.",
                        "code": "#include <stdio.h>\\n\\nint main() {\\n    printf(\\\"Hello, World!\\\\n\\\");\\n    return 0;\\n}"
                    },
                    {
                        "section": "Setting Up Your Environment",
                        "text": "To write and run C programs, you need a text editor and a compiler. Popular options include GCC (GNU Compiler Collection), Clang, and IDEs like Code::Blocks, Dev-C++, or Visual Studio Code with C extensions.",
                        "code": "// To compile and run a C program from command line:\\n// gcc -o hello hello.c\\n// ./hello"
                    }
                ]
            },
            "variables": {
                "title": "Variables and Data Types",
                "content": [
                    {
                        "section": "Basic Data Types",
                        "text": "C provides several basic data types to store different kinds of values:\\n- int: for integers (whole numbers)\\n- float: for single-precision floating-point numbers\\n- double: for double-precision floating-point numbers\\n- char: for single characters",
                        "code": "#include <stdio.h>\\n\\nint main() {\\n    // Integer types\\n    int age = 25;\\n    short smallNum = 100;\\n    long bigNum = 123456789L;\\n    \\n    // Floating-point types\\n    float price = 19.99f;\\n    double precisePrice = 19.99;\\n    \\n    // Character type\\n    char grade = 'A';\\n    char letter = 65;  // ASCII value of 'A'\\n    \\n    // Printing values\\n    printf(\\\"Age: %d\\\\n\\\", age);\\n    printf(\\\"Price: %.2f\\\\n\\\", price);\\n    printf(\\\"Grade: %c\\\\n\\\", grade);\\n    printf(\\\"Letter: %c\\\\n\\\", letter);\\n    \\n    return 0;\\n}"
                    }
                ]
            },
            "operators": {
                "title": "Operators in C",
                "content": [
                    {
                        "section": "Arithmetic Operators",
                        "text": "C provides basic arithmetic operators for mathematical operations: +, -, *, /, % (modulus).",
                        "code": "#include <stdio.h>\\n\\nint main() {\\n    int a = 10, b = 3;\\n    \\n    printf(\\\"a + b = %d\\\\n\\\", a + b);  // Addition\\n    printf(\\\"a - b = %d\\\\n\\\", a - b);  // Subtraction\\n    printf(\\\"a * b = %d\\\\n\\\", a * b);  // Multiplication\\n    printf(\\\"a / b = %d\\\\n\\\", a / b);  // Division\\n    printf(\\\"a %% b = %d\\\\n\\\", a % b);  // Modulus (remainder)\\n    \\n    return 0;\\n}"
                    }
                ]
            },
            "pointers": {
                "title": "Pointer Fundamentals",
                "content": [
                    {
                        "section": "What are Pointers?",
                        "text": "A pointer is a variable that stores the memory address of another variable. Pointers are powerful but can be tricky to understand. They allow direct memory manipulation and are essential for advanced C programming.",
                        "code": "#include <stdio.h>\\n\\nint main() {\\n    int num = 42;\\n    int *ptr;  // Declare a pointer to int\\n    \\n    ptr = &num;  // Store address of num in ptr\\n    \\n    printf(\\\"Value of num: %d\\\\n\\\", num);\\n    printf(\\\"Address of num: %p\\\\n\\\", &num);\\n    printf(\\\"Value of ptr: %p\\\\n\\\", ptr);\\n    printf(\\\"Value pointed by ptr: %d\\\\n\\\", *ptr);\\n    \\n    // Modify value through pointer\\n    *ptr = 100;\\n    printf(\\\"New value of num: %d\\\\n\\\", num);\\n    \\n    return 0;\\n}"
                    }
                ]
            },
            "memory": {
                "title": "Dynamic Memory Allocation",
                "content": [
                    {
                        "section": "malloc() and free()",
                        "text": "malloc() allocates a block of memory of specified size and returns a pointer to the beginning of the block. free() deallocates the memory previously allocated by malloc().",
                        "code": "#include <stdio.h>\\n#include <stdlib.h>\\n\\nint main() {\\n    int n = 5;\\n    int *ptr;\\n    \\n    // Allocate memory for n integers\\n    ptr = (int*) malloc(n * sizeof(int));\\n    \\n    if (ptr == NULL) {\\n        printf(\\\"Memory allocation failed!\\\\n\\\");\\n        return -1;\\n    }\\n    \\n    // Use the allocated memory\\n    for (int i = 0; i < n; i++) {\\n        ptr[i] = (i + 1) * 10;\\n    }\\n    \\n    // Print values\\n    printf(\\\"Values in allocated memory:\\\\n\\\");\\n    for (int i = 0; i < n; i++) {\\n        printf(\\\"%d \\\", ptr[i]);\\n    }\\n    printf(\\\"\\\\n\\\");\\n    \\n    // Free the allocated memory\\n    free(ptr);\\n    ptr = NULL;  // Good practice to avoid dangling pointer\\n    \\n    return 0;\\n}"
                    }
                ]
            }
        };
        
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
        
        // Mark lesson as completed
        this.markLessonAsCompleted(lessonId);
    },
    
    updateNavigation: function(currentLessonId) {
        // Sample lessons data - in a real implementation, this would come from a JSON file
        const lessons = {
            "setup": {
                "title": "Environment Setup & Hello World"
            },
            "variables": {
                "title": "Variables and Data Types"
            },
            "operators": {
                "title": "Operators in C"
            },
            "pointers": {
                "title": "Pointer Fundamentals"
            },
            "memory": {
                "title": "Dynamic Memory Allocation"
            }
        };
        
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
        // In a real implementation, we would check if there's a quiz for this lesson
        const hasQuiz = lessonId === "setup" || lessonId === "variables"; // Sample logic
        
        if (hasQuiz) {
            quizButton.style.display = 'inline-block';
            quizButton.onclick = () => {
                window.location.hash = `#/quizzes/${lessonId}`;
            };
        } else {
            quizButton.style.display = 'none';
        }
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
        const lessons = document.querySelectorAll('[data-lesson]');
        term = term.toLowerCase();
        
        lessons.forEach(lesson => {
            const text = lesson.textContent.toLowerCase();
            if (text.includes(term)) {
                lesson.parentElement.style.display = 'block';
            } else {
                lesson.parentElement.style.display = 'none';
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
    }
};