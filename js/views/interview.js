// Interview Prep View Controller
window.viewControllers = window.viewControllers || {};

window.viewControllers['interview'] = {
    init: function(params) {
        console.log('Initializing Interview view');
        this.render();
        this.bindEvents();
    },
    
    destroy: function() {
        console.log('Destroying Interview view');
        // Clean up any event listeners or resources
    },
    
    render: function() {
        const app = document.getElementById('app');
        app.innerHTML = `
            <div class="page interview-page active">
                <div class="container">
                    <h2>Interview Prep Kit</h2>
                    <div class="interview-container">
                        <div class="interview-tabs">
                            <button class="tab-btn active" data-tab="theory">Theory Questions</button>
                            <button class="tab-btn" data-tab="coding">Coding Challenges</button>
                            <button class="tab-btn" data-tab="mock">Mock Interview</button>
                        </div>
                        
                        <div class="tab-content active" id="theory-tab">
                            <h3>Theory Questions</h3>
                            <div class="questions-grid" id="theoryQuestions">
                                <!-- Theory questions will be populated here -->
                            </div>
                        </div>
                        
                        <div class="tab-content" id="coding-tab">
                            <h3>Coding Challenges</h3>
                            <div class="questions-grid" id="codingQuestions">
                                <!-- Coding questions will be populated here -->
                            </div>
                        </div>
                        
                        <div class="tab-content" id="mock-tab">
                            <h3>Mock Interview</h3>
                            <div class="mock-interview">
                                <div class="timer">
                                    <span>Time Remaining: </span>
                                    <span id="timer">30:00</span>
                                </div>
                                <div class="interview-question" id="interviewQuestion">
                                    <p>Select "Start Mock Interview" to begin</p>
                                </div>
                                <div class="interview-actions">
                                    <button class="btn btn-primary" id="startMock">Start Mock Interview</button>
                                    <button class="btn btn-outline" id="nextQuestion" disabled>Next Question</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        this.loadQuestions();
        this.populateTheoryQuestions();
        this.populateCodingQuestions();
    },
    
    bindEvents: function() {
        // Tab switching
        document.querySelectorAll('.tab-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                this.switchTab(e.target.dataset.tab);
            });
        });
        
        // Mock interview
        document.getElementById('startMock').addEventListener('click', () => this.startMockInterview());
        document.getElementById('nextQuestion').addEventListener('click', () => this.nextMockQuestion());
    },
    
    // Load interview questions
    loadQuestions: function() {
        // Theory questions
        this.theoryQuestions = [
            {
                id: 1,
                question: "What is the difference between malloc() and calloc()?",
                answer: "malloc() allocates a block of memory but does not initialize it, while calloc() allocates memory and initializes all bits to zero. malloc() takes one argument (size), while calloc() takes two arguments (number of elements and size of each element).",
                category: "Memory Management"
            },
            {
                id: 2,
                question: "Explain the difference between ++var and var++.",
                answer: "++var is pre-increment which increments the value first and then returns the incremented value. var++ is post-increment which returns the current value first and then increments it.",
                category: "Operators"
            },
            {
                id: 3,
                question: "What is a dangling pointer?",
                answer: "A dangling pointer is a pointer that points to memory that has been freed or deleted. Accessing a dangling pointer leads to undefined behavior.",
                category: "Pointers"
            },
            {
                id: 4,
                question: "What is the difference between pass by value and pass by reference?",
                answer: "In pass by value, a copy of the actual parameter is passed to the function, so changes inside the function don't affect the original value. In pass by reference, the address of the actual parameter is passed, so changes inside the function affect the original value.",
                category: "Functions"
            },
            {
                id: 5,
                question: "What is a segmentation fault?",
                answer: "A segmentation fault occurs when a program tries to access a memory location that it's not allowed to access, or tries to access a memory location in a way that's not allowed (e.g., writing to read-only memory).",
                category: "Memory"
            }
        ];
        
        // Coding questions
        this.codingQuestions = [
            {
                id: 1,
                title: "Reverse a String",
                description: "Write a function to reverse a string in-place.",
                difficulty: "easy",
                solution: "void reverseString(char* str) {\n    int len = strlen(str);\n    for (int i = 0; i < len/2; i++) {\n        char temp = str[i];\n        str[i] = str[len-1-i];\n        str[len-1-i] = temp;\n    }\n}"
            },
            {
                id: 2,
                title: "Detect Loop in Linked List",
                description: "Write a function to detect if a linked list has a cycle.",
                difficulty: "medium",
                solution: "int hasCycle(struct Node* head) {\n    if (head == NULL) return 0;\n    \n    struct Node* slow = head;\n    struct Node* fast = head;\n    \n    while (fast != NULL && fast->next != NULL) {\n        slow = slow->next;\n        fast = fast->next->next;\n        \n        if (slow == fast) {\n            return 1; // Cycle detected\n        }\n    }\n    \n    return 0; // No cycle\n}"
            },
            {
                id: 3,
                title: "Implement Stack using Arrays",
                description: "Implement a stack data structure using arrays with push, pop, and peek operations.",
                difficulty: "easy",
                solution: "struct Stack {\n    int items[MAX];\n    int top;\n};\n\nvoid push(struct Stack* stack, int item) {\n    if (stack->top >= MAX-1) {\n        printf(\"Stack Overflow\\n\");\n        return;\n    }\n    stack->items[++stack->top] = item;\n}\n\nint pop(struct Stack* stack) {\n    if (stack->top < 0) {\n        printf(\"Stack Underflow\\n\");\n        return -1;\n    }\n    return stack->items[stack->top--];\n}\n\nint peek(struct Stack* stack) {\n    if (stack->top < 0) {\n        printf(\"Stack is empty\\n\");\n        return -1;\n    }\n    return stack->items[stack->top];\n}"
            }
        ];
        
        // Mock interview questions
        this.mockQuestions = [
            {
                id: 1,
                question: "Explain the difference between stack and heap memory.",
                type: "theory"
            },
            {
                id: 2,
                question: "Write a function to check if a string is a palindrome.",
                type: "coding"
            },
            {
                id: 3,
                question: "What is a memory leak and how can it be prevented?",
                type: "theory"
            },
            {
                id: 4,
                question: "Implement a function to find the nth Fibonacci number.",
                type: "coding"
            },
            {
                id: 5,
                question: "Explain the concept of function pointers in C.",
                type: "theory"
            }
        ];
    },
    
    // Switch between tabs
    switchTab: function(tabName) {
        // Update active tab buttons
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
        
        // Update active tab content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(`${tabName}-tab`).classList.add('active');
    },
    
    // Populate theory questions
    populateTheoryQuestions: function() {
        const container = document.getElementById('theoryQuestions');
        container.innerHTML = '';
        
        this.theoryQuestions.forEach(q => {
            const questionElement = document.createElement('div');
            questionElement.className = 'question-card';
            questionElement.innerHTML = `
                <h4>${q.question}</h4>
                <div class="question-category">${q.category}</div>
                <button class="btn btn-outline show-answer" data-id="${q.id}">Show Answer</button>
                <div class="answer" id="answer-${q.id}" style="display: none;">
                    <p>${q.answer}</p>
                </div>
            `;
            container.appendChild(questionElement);
        });
        
        // Add event listeners to show answer buttons
        document.querySelectorAll('.show-answer').forEach(button => {
            button.addEventListener('click', (e) => {
                const id = e.target.dataset.id;
                const answer = document.getElementById(`answer-${id}`);
                if (answer.style.display === 'none') {
                    answer.style.display = 'block';
                    e.target.textContent = 'Hide Answer';
                } else {
                    answer.style.display = 'none';
                    e.target.textContent = 'Show Answer';
                }
            });
        });
    },
    
    // Populate coding questions
    populateCodingQuestions: function() {
        const container = document.getElementById('codingQuestions');
        container.innerHTML = '';
        
        this.codingQuestions.forEach(q => {
            const questionElement = document.createElement('div');
            questionElement.className = 'question-card';
            questionElement.innerHTML = `
                <h4>${q.title}</h4>
                <p>${q.description}</p>
                <div class="difficulty ${q.difficulty}">${q.difficulty}</div>
                <button class="btn btn-outline show-solution" data-id="${q.id}">Show Solution</button>
                <div class="solution" id="solution-${q.id}" style="display: none;">
                    <pre><code class="language-c">${q.solution}</code></pre>
                </div>
            `;
            container.appendChild(questionElement);
        });
        
        // Add event listeners to show solution buttons
        document.querySelectorAll('.show-solution').forEach(button => {
            button.addEventListener('click', (e) => {
                const id = e.target.dataset.id;
                const solution = document.getElementById(`solution-${id}`);
                if (solution.style.display === 'none') {
                    solution.style.display = 'block';
                    e.target.textContent = 'Hide Solution';
                } else {
                    solution.style.display = 'none';
                    e.target.textContent = 'Show Solution';
                }
                
                // Initialize Prism for syntax highlighting if available
                if (typeof Prism !== 'undefined') {
                    Prism.highlightAll();
                }
            });
        });
    },
    
    // Start mock interview
    startMockInterview: function() {
        this.currentQuestionIndex = 0;
        this.mockStartTime = new Date();
        this.mockEndTime = new Date(this.mockStartTime.getTime() + 30 * 60 * 1000); // 30 minutes
        
        document.getElementById('startMock').disabled = true;
        document.getElementById('nextQuestion').disabled = false;
        
        this.showMockQuestion();
        this.startTimer();
    },
    
    // Show mock interview question
    showMockQuestion: function() {
        if (this.currentQuestionIndex >= this.mockQuestions.length) {
            this.endMockInterview();
            return;
        }
        
        const question = this.mockQuestions[this.currentQuestionIndex];
        const questionElement = document.getElementById('interviewQuestion');
        questionElement.innerHTML = `
            <h4>Question ${this.currentQuestionIndex + 1} of ${this.mockQuestions.length}</h4>
            <p>${question.question}</p>
            <div class="question-type">${question.type}</div>
        `;
    },
    
    // Next mock interview question
    nextMockQuestion: function() {
        this.currentQuestionIndex++;
        this.showMockQuestion();
    },
    
    // Start timer for mock interview
    startTimer: function() {
        this.timerInterval = setInterval(() => {
            const now = new Date();
            const timeLeft = this.mockEndTime - now;
            
            if (timeLeft <= 0) {
                clearInterval(this.timerInterval);
                document.getElementById('timer').textContent = '00:00';
                this.endMockInterview();
            } else {
                const minutes = Math.floor(timeLeft / (1000 * 60));
                const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
                document.getElementById('timer').textContent = 
                    `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            }
        }, 1000);
    },
    
    // End mock interview
    endMockInterview: function() {
        clearInterval(this.timerInterval);
        document.getElementById('interviewQuestion').innerHTML = `
            <h4>Mock Interview Complete!</h4>
            <p>Great job! You've completed the mock interview.</p>
            <p>Review the questions and practice your answers to improve.</p>
        `;
        document.getElementById('nextQuestion').disabled = true;
    }
};