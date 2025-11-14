// Challenges View Controller for practice problems
window.viewControllers = window.viewControllers || {};

window.viewControllers['challenges'] = {
    init: function(params) {
        console.log('Initializing Challenges view');
        this.render();
        this.bindEvents();
    },
    
    destroy: function() {
        console.log('Destroying Challenges view');
        // Clean up any event listeners or resources
    },
    
    render: function() {
        const app = document.getElementById('app');
        app.innerHTML = `
            <div class="page challenges-page active">
                <div class="container">
                    <h2>Practice Challenges</h2>
                    <div class="challenges-container">
                        <div class="challenge-filters">
                            <select id="difficultyFilter">
                                <option value="">All Difficulties</option>
                                <option value="easy">Easy</option>
                                <option value="medium">Medium</option>
                                <option value="hard">Hard</option>
                            </select>
                            <input type="text" id="challengeSearch" placeholder="Search challenges...">
                        </div>
                        <div class="challenge-grid" id="challengeGrid">
                            <!-- Challenges will be populated here -->
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        this.loadChallenges();
        this.populateChallengeGrid();
    },
    
    bindEvents: function() {
        // Add event listeners
        document.getElementById('difficultyFilter').addEventListener('change', () => this.filterChallenges());
        document.getElementById('challengeSearch').addEventListener('input', () => this.filterChallenges());
    },
    
    // Load challenges data
    loadChallenges: function() {
        // Sample challenges data - in a real app, this would come from a JSON file or API
        this.challenges = [
            {
                id: 'challenge1',
                title: 'Hello World',
                description: 'Write a program that prints "Hello, World!" to the console.',
                difficulty: 'easy',
                tags: ['basics', 'output'],
                sampleInput: '',
                sampleOutput: 'Hello, World!',
                solution: '#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}',
                hints: [
                    'Use the printf() function to output text',
                    'Remember to include the stdio.h header file',
                    'Don\'t forget the return 0; statement'
                ]
            },
            {
                id: 'challenge2',
                title: 'Sum of Two Numbers',
                description: 'Write a program that takes two integers as input and prints their sum.',
                difficulty: 'easy',
                tags: ['input', 'arithmetic'],
                sampleInput: '5 3',
                sampleOutput: '8',
                solution: '#include <stdio.h>\n\nint main() {\n    int a, b;\n    scanf("%d %d", &a, &b);\n    printf("%d\\n", a + b);\n    return 0;\n}',
                hints: [
                    'Use scanf() to read input values',
                    'Declare two integer variables to store the numbers',
                    'Add the numbers and print the result'
                ]
            },
            {
                id: 'challenge3',
                title: 'Find Maximum',
                description: 'Write a program that finds the maximum of three numbers.',
                difficulty: 'easy',
                tags: ['conditionals', 'comparison'],
                sampleInput: '10 25 15',
                sampleOutput: '25',
                solution: '#include <stdio.h>\n\nint main() {\n    int a, b, c;\n    scanf("%d %d %d", &a, &b, &c);\n    \n    int max = a;\n    if (b > max) max = b;\n    if (c > max) max = c;\n    \n    printf("%d\\n", max);\n    return 0;\n}',
                hints: [
                    'Read three integers using scanf()',
                    'Use if statements to compare the numbers',
                    'Keep track of the maximum value found so far'
                ]
            },
            {
                id: 'challenge4',
                title: 'Factorial Calculator',
                description: 'Write a program that calculates the factorial of a given number.',
                difficulty: 'medium',
                tags: ['loops', 'functions'],
                sampleInput: '5',
                sampleOutput: '120',
                solution: '#include <stdio.h>\n\nint factorial(int n) {\n    if (n <= 1) return 1;\n    return n * factorial(n - 1);\n}\n\nint main() {\n    int n;\n    scanf("%d", &n);\n    printf("%d\\n", factorial(n));\n    return 0;\n}',
                hints: [
                    'You can use either iteration or recursion',
                    'Remember that 0! = 1 and 1! = 1',
                    'Be careful with large numbers that might cause overflow'
                ]
            },
            {
                id: 'challenge5',
                title: 'Array Reversal',
                description: 'Write a program that reverses the elements of an array.',
                difficulty: 'medium',
                tags: ['arrays', 'pointers'],
                sampleInput: '5\n1 2 3 4 5',
                sampleOutput: '5 4 3 2 1',
                solution: '#include <stdio.h>\n\nvoid reverseArray(int arr[], int n) {\n    for (int i = 0; i < n/2; i++) {\n        int temp = arr[i];\n        arr[i] = arr[n-1-i];\n        arr[n-1-i] = temp;\n    }\n}\n\nint main() {\n    int n;\n    scanf("%d", &n);\n    int arr[n];\n    \n    for (int i = 0; i < n; i++) {\n        scanf("%d", &arr[i]);\n    }\n    \n    reverseArray(arr, n);\n    \n    for (int i = 0; i < n; i++) {\n        printf("%d ", arr[i]);\n    }\n    printf("\\n");\n    \n    return 0;\n}',
                hints: [
                    'Swap elements from both ends moving toward the center',
                    'You only need to swap n/2 elements',
                    'Use a temporary variable for swapping'
                ]
            }
        ];
    },
    
    // Populate challenge grid
    populateChallengeGrid: function() {
        const grid = document.getElementById('challengeGrid');
        grid.innerHTML = '';
        
        this.challenges.forEach(challenge => {
            const challengeElement = document.createElement('div');
            challengeElement.className = `challenge-card ${challenge.difficulty}`;
            challengeElement.innerHTML = `
                <h3>${challenge.title}</h3>
                <p>${challenge.description}</p>
                <div class="challenge-meta">
                    <span class="difficulty ${challenge.difficulty}">${challenge.difficulty}</span>
                    <div class="tags">
                        ${challenge.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                </div>
                <button class="btn btn-primary" onclick="window.viewControllers['challenges'].showChallenge('${challenge.id}')">Solve Challenge</button>
            `;
            grid.appendChild(challengeElement);
        });
    },
    
    // Filter challenges based on difficulty and search term
    filterChallenges: function() {
        const difficulty = document.getElementById('difficultyFilter').value;
        const searchTerm = document.getElementById('challengeSearch').value.toLowerCase();
        
        const filteredChallenges = this.challenges.filter(challenge => {
            const matchesDifficulty = !difficulty || challenge.difficulty === difficulty;
            const matchesSearch = !searchTerm || 
                challenge.title.toLowerCase().includes(searchTerm) || 
                challenge.description.toLowerCase().includes(searchTerm) ||
                challenge.tags.some(tag => tag.toLowerCase().includes(searchTerm));
            
            return matchesDifficulty && matchesSearch;
        });
        
        this.renderFilteredChallenges(filteredChallenges);
    },
    
    // Render filtered challenges
    renderFilteredChallenges: function(challenges) {
        const grid = document.getElementById('challengeGrid');
        grid.innerHTML = '';
        
        if (challenges.length === 0) {
            grid.innerHTML = '<p>No challenges found matching your criteria.</p>';
            return;
        }
        
        challenges.forEach(challenge => {
            const challengeElement = document.createElement('div');
            challengeElement.className = `challenge-card ${challenge.difficulty}`;
            challengeElement.innerHTML = `
                <h3>${challenge.title}</h3>
                <p>${challenge.description}</p>
                <div class="challenge-meta">
                    <span class="difficulty ${challenge.difficulty}">${challenge.difficulty}</span>
                    <div class="tags">
                        ${challenge.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                </div>
                <button class="btn btn-primary" onclick="window.viewControllers['challenges'].showChallenge('${challenge.id}')">Solve Challenge</button>
            `;
            grid.appendChild(challengeElement);
        });
    },
    
    // Show challenge details
    showChallenge: function(challengeId) {
        const challenge = this.challenges.find(c => c.id === challengeId);
        if (!challenge) return;
        
        const app = document.getElementById('app');
        app.innerHTML = `
            <div class="page challenge-detail-page active">
                <div class="container">
                    <div class="challenge-header">
                        <h2>${challenge.title}</h2>
                        <button class="btn btn-outline" onclick="window.viewControllers['challenges'].render()">← Back to Challenges</button>
                    </div>
                    <div class="challenge-detail-container">
                        <div class="challenge-description">
                            <h3>Description</h3>
                            <p>${challenge.description}</p>
                            
                            <h3>Input Format</h3>
                            <p>${challenge.sampleInput ? `Sample input: ${challenge.sampleInput}` : 'No specific input format'}</p>
                            
                            <h3>Output Format</h3>
                            <p>${challenge.sampleOutput ? `Sample output: ${challenge.sampleOutput}` : 'No specific output format'}</p>
                            
                            <h3>Hints</h3>
                            <ul>
                                ${challenge.hints.map(hint => `<li>${hint}</li>`).join('')}
                            </ul>
                        </div>
                        
                        <div class="challenge-editor">
                            <h3>Code Editor</h3>
                            <textarea id="challengeCode" spellcheck="false">#include <stdio.h>

int main() {
    // Write your solution here
    
    return 0;
}</textarea>
                            
                            <div class="editor-controls">
                                <button class="btn btn-primary" id="runChallenge">Run Code</button>
                                <button class="btn btn-outline" id="showSolution">Show Solution</button>
                                <button class="btn btn-outline" id="resetCode">Reset Code</button>
                            </div>
                            
                            <div class="challenge-output">
                                <h3>Output</h3>
                                <div class="console" id="challengeOutput">// Output will appear here</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Bind events for the challenge detail view
        document.getElementById('runChallenge').addEventListener('click', () => this.runChallenge(challenge));
        document.getElementById('showSolution').addEventListener('click', () => this.showSolution(challenge));
        document.getElementById('resetCode').addEventListener('click', () => this.resetCode());
    },
    
    // Run challenge code (simulated)
    runChallenge: function(challenge) {
        const code = document.getElementById('challengeCode').value;
        const output = document.getElementById('challengeOutput');
        
        // Simulate code execution
        output.innerHTML = "// Running code simulation...<br>";
        
        // In a real implementation, this would be a more sophisticated code simulator
        // For now, we'll just show a simple simulation
        setTimeout(() => {
            // Check for common syntax errors
            const errors = this.checkCodeErrors(code);
            
            if (errors.length > 0) {
                output.innerHTML += "Compilation errors:<br>";
                errors.forEach(error => {
                    output.innerHTML += `Error: ${error}<br>`;
                });
                output.innerHTML += "// Program exited with code 1<br>";
            } else {
                // Simple output simulation based on the challenge
                let result = "";
                switch(challenge.id) {
                    case 'challenge1':
                        result = "Hello, World!<br>";
                        break;
                    case 'challenge2':
                        result = "Enter two numbers: 8<br>";
                        break;
                    case 'challenge3':
                        result = "Enter three numbers: Maximum is 25<br>";
                        break;
                    case 'challenge4':
                        result = "Enter a number: Factorial is 120<br>";
                        break;
                    case 'challenge5':
                        result = "Enter array size and elements: Reversed array: 5 4 3 2 1<br>";
                        break;
                    default:
                        result = "Program executed successfully.<br>";
                }
                
                output.innerHTML = result;
                output.innerHTML += "// Program exited with code 0<br>";
            }
        }, 1000);
    },
    
    // Check for common code errors
    checkCodeErrors: function(code) {
        const errors = [];
        
        // Check for missing semicolons
        const lines = code.split('\n');
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            
            // Skip empty lines and lines that don't need semicolons
            if (line === '' || line.startsWith('#') || line.startsWith('//') || 
                line.endsWith('{') || line.endsWith('}') || line.endsWith(':') ||
                line.startsWith('/*') || line.endsWith('*/')) {
                continue;
            }
            
            // Check for missing semicolon in lines that should have one
            if ((line.includes('int ') || line.includes('char ') || line.includes('float ') || 
                 line.includes('double ') || line.includes('return ') || line.includes('printf') ||
                 line.includes('scanf')) && !line.endsWith(';') && !line.endsWith('{') && !line.endsWith('}')) {
                errors.push(`Missing semicolon at line ${i + 1}`);
            }
        }
        
        // Check for unmatched parentheses
        const openParens = (code.match(/\(/g) || []).length;
        const closeParens = (code.match(/\)/g) || []).length;
        if (openParens !== closeParens) {
            errors.push(`Unmatched parentheses: found ${openParens} opening and ${closeParens} closing`);
        }
        
        // Check for unmatched braces
        const openBraces = (code.match(/\{/g) || []).length;
        const closeBraces = (code.match(/\}/g) || []).length;
        if (openBraces !== closeBraces) {
            errors.push(`Unmatched braces: found ${openBraces} opening and ${closeBraces} closing`);
        }
        
        // Check for missing main function
        if (!code.includes('main')) {
            errors.push('Missing main function');
        }
        
        return errors;
    },
    
    // Show solution for challenge
    showSolution: function(challenge) {
        if (confirm('Are you sure you want to see the solution? Try to solve it yourself first!')) {
            document.getElementById('challengeCode').value = challenge.solution;
        }
    },
    
    // Reset code editor
    resetCode: function() {
        document.getElementById('challengeCode').value = `#include <stdio.h>

int main() {
    // Write your solution here
    
    return 0;
}`;
        document.getElementById('challengeOutput').innerHTML = "// Output will appear here";
    }
};