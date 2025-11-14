// Editor View Controller
window.viewControllers = window.viewControllers || {};

window.viewControllers['editor'] = {
    init: function(params) {
        console.log('Initializing Editor view');
        this.render();
        this.bindEvents();
    },
    
    destroy: function() {
        console.log('Destroying Editor view');
        // Clean up any event listeners or resources
    },
    
    render: function() {
        const app = document.getElementById('app');
        app.innerHTML = `
            <div class="page editor-page active">
                <div class="container">
                    <h2>C Code Editor</h2>
                    <div class="editor-container">
                        <div class="editor-header">
                            <h3>main.c</h3>
                            <div>
                                <select id="snippetSelector">
                                    <option value="">Load Example Snippet</option>
                                    <option value="hello">Hello World</option>
                                    <option value="fibonacci">Fibonacci Series</option>
                                    <option value="prime">Prime Number Check</option>
                                    <option value="pointer">Pointer Basics</option>
                                    <option value="malloc">Dynamic Memory Allocation</option>
                                    <option value="file">File Handling</option>
                                </select>
                                <button class="btn btn-outline" id="downloadCode">Download</button>
                                <button class="btn btn-outline" id="analyzeCode">Analyze Code</button>
                            </div>
                        </div>
                        <div class="editor-body">
                            <textarea id="codeEditor" spellcheck="false">#include &lt;stdio.h&gt;

int main() {
    printf("Hello, World!\\n");
    return 0;
}</textarea>
                            <div class="editor-input">
                                <label for="stdinInput">Program Input (stdin):</label>
                                <input type="text" id="stdinInput" placeholder="Enter input for your program...">
                            </div>
                            <div class="editor-buttons">
                                <button class="btn btn-primary" id="runCode">Run Code</button>
                                <button class="btn btn-outline" id="clearConsole">Clear Console</button>
                                <button class="btn btn-outline" id="clearEditor">Clear Editor</button>
                            </div>
                            <div class="console" id="consoleOutput">
                                // Output will appear here
                            </div>
                            <div class="analysis-results" id="analysisResults" style="margin-top: 20px; display: none;">
                                <h3>Code Analysis Results</h3>
                                <div id="analysisContent"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },
    
    bindEvents: function() {
        // Add event listeners
        document.getElementById('runCode').addEventListener('click', () => this.runCode());
        document.getElementById('clearConsole').addEventListener('click', () => this.clearConsole());
        document.getElementById('clearEditor').addEventListener('click', () => this.clearEditor());
        document.getElementById('downloadCode').addEventListener('click', () => this.downloadCode());
        document.getElementById('analyzeCode').addEventListener('click', () => this.analyzeCode());
        
        // Add snippet selector
        document.getElementById('snippetSelector').addEventListener('change', (e) => {
            this.loadSnippet(e.target.value);
        });
        
        // Add auto-indent functionality
        const codeEditor = document.getElementById('codeEditor');
        codeEditor.addEventListener('keydown', (e) => this.handleEditorKeyDown(e));
        codeEditor.addEventListener('input', (e) => this.handleEditorInput(e));
    },
    
    loadSnippet: function(snippetId) {
        const snippets = {
            hello: `#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    return 0;
}`,
            fibonacci: `#include <stdio.h>

int main() {
    int n, t1 = 0, t2 = 1, nextTerm = 0;
    
    printf("Enter the number of terms: ");
    scanf("%d", &n);
    
    printf("Fibonacci Series: ");
    
    for (int i = 1; i <= n; ++i) {
        if(i == 1) {
            printf("%d, ", t1);
            continue;
        }
        if(i == 2) {
            printf("%d, ", t2);
            continue;
        }
        nextTerm = t1 + t2;
        t1 = t2;
        t2 = nextTerm;
        printf("%d, ", nextTerm);
    }
    return 0;
}`,
            prime: `#include <stdio.h>

int main() {
    int n, i, flag = 0;
    
    printf("Enter a positive integer: ");
    scanf("%d", &n);
    
    // 0 and 1 are not prime numbers
    if (n == 0 || n == 1)
        flag = 1;
    
    for (i = 2; i <= n / 2; ++i) {
        if (n % i == 0) {
            flag = 1;
            break;
        }
    }
    
    if (flag == 0)
        printf("%d is a prime number.", n);
    else
        printf("%d is not a prime number.", n);
    
    return 0;
}`,
            pointer: `#include <stdio.h>

int main() {
    int num = 42;
    int *ptr;
    
    ptr = &num;
    
    printf("Value of num: %d\\n", num);
    printf("Address of num: %p\\n", &num);
    printf("Value of ptr: %p\\n", ptr);
    printf("Value pointed by ptr: %d\\n", *ptr);
    
    return 0;
}`,
            malloc: `#include <stdio.h>
#include <stdlib.h>

int main() {
    int *ptr;
    int n = 5;
    
    // Allocate memory
    ptr = (int*) malloc(n * sizeof(int));
    
    if (ptr == NULL) {
        printf("Memory allocation failed!\\n");
        return -1;
    }
    
    // Use the allocated memory
    for (int i = 0; i < n; i++) {
        ptr[i] = i + 1;
    }
    
    // Print values
    for (int i = 0; i < n; i++) {
        printf("%d ", ptr[i]);
    }
    printf("\\n");
    
    // Free memory
    free(ptr);
    
    return 0;
}`,
            file: `#include <stdio.h>

int main() {
    FILE *fp;
    char data[100];
    
    // Writing to a file
    fp = fopen("example.txt", "w");
    
    if (fp == NULL) {
        printf("Error opening file for writing!\\n");
        return -1;
    }
    
    fprintf(fp, "This is a sample file.\\n");
    fprintf(fp, "It contains multiple lines.\\n");
    
    fclose(fp);
    
    // Reading from a file
    fp = fopen("example.txt", "r");
    
    if (fp == NULL) {
        printf("Error opening file for reading!\\n");
        return -1;
    }
    
    while (fgets(data, 100, fp) != NULL) {
        printf("%s", data);
    }
    
    fclose(fp);
    
    return 0;
}`
        };
        
        if (snippets[snippetId]) {
            document.getElementById('codeEditor').value = snippets[snippetId];
        }
    },
    
    clearEditor: function() {
        document.getElementById('codeEditor').value = '';
        document.getElementById('stdinInput').value = '';
    },
    
    runCode: function() {
        const code = document.getElementById('codeEditor').value;
        const stdin = document.getElementById('stdinInput').value;
        const consoleOutput = document.getElementById('consoleOutput');
        
        // Clear previous output
        consoleOutput.innerHTML = "// Simulation — Not real compilation<br>";
        
        // Simulate code compilation and execution
        setTimeout(() => {
            // Check for common syntax errors
            const errors = this.checkCodeErrors(code);
            
            if (errors.length > 0) {
                consoleOutput.innerHTML += "Compilation errors:<br>";
                errors.forEach(error => {
                    consoleOutput.innerHTML += `Error: ${error}<br>`;
                });
                consoleOutput.innerHTML += "// Program exited with code 1<br>";
            } else {
                // Simple output simulation
                let output = "";
                
                // Handle printf statements
                const printfMatches = code.match(/printf\(.*?"(.*?)".*?\)/g);
                if (printfMatches) {
                    printfMatches.forEach(match => {
                        const textMatch = match.match(/printf\(.*?"(.*?)".*?\)/);
                        if (textMatch && textMatch[1]) {
                            output += textMatch[1].replace(/\\n/g, '<br>') + '<br>';
                        }
                    });
                }
                
                // Handle scanf statements if stdin is provided
                if (stdin && code.includes('scanf')) {
                    output += `// Input provided: ${stdin}<br>`;
                }
                
                // If no printf found but code looks valid
                if (!output && !errors.length) {
                    output = "Program executed (simulation).<br>";
                }
                
                consoleOutput.innerHTML = output;
                consoleOutput.innerHTML += "// Program exited with code 0<br>";
            }
        }, 500);
    },
    
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
    
    clearConsole: function() {
        document.getElementById('consoleOutput').innerHTML = "// Output will appear here";
    },
    
    downloadCode: function() {
        const code = document.getElementById('codeEditor').value;
        const blob = new Blob([code], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = 'program.c';
        document.body.appendChild(a);
        a.click();
        
        // Clean up
        setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }, 100);
    },
    
    analyzeCode: function() {
        const code = document.getElementById('codeEditor').value;
        const analysisResults = document.getElementById('analysisResults');
        const analysisContent = document.getElementById('analysisContent');
        
        // Show analysis panel
        analysisResults.style.display = 'block';
        
        // Perform static analysis
        var issues = this.performStaticAnalysis(code);
        
        // Display results
        if (issues.length === 0) {
            analysisContent.innerHTML = `
                <div style="color: #27ae60; padding: 15px; border-radius: 5px; background-color: rgba(39, 174, 96, 0.1);">
                    <h4>✅ No issues found</h4>
                    <p>Your code looks good! No issues detected by the static analyzer.</p>
                </div>
            `;
        } else {
            var issuesHTML = '<ul style="list-style-type: none; padding: 0;">';
            issues.forEach(function(issue) {
                var severityColor = issue.severity === 'error' ? '#e74c3c' : 
                                  issue.severity === 'warning' ? '#f39c12' : '#3498db';
                issuesHTML += `
                    <li style="margin-bottom: 15px; padding: 10px; border-left: 4px solid ${severityColor}; background-color: rgba(0,0,0,0.05);">
                        <strong style="color: ${severityColor};">${issue.severity.toUpperCase()}:</strong> ${issue.message}
                        ${issue.line ? `<br><small>Line ${issue.line}</small>` : ''}
                    </li>
                `;
            });
            issuesHTML += '</ul>';
            analysisContent.innerHTML = issuesHTML;
        }
    },
    
    performStaticAnalysis: function(code) {
        const issues = [];
        const lines = code.split('\n');
        
        // Check for common issues
        
        // 1. Missing semicolons
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
                issues.push({
                    severity: 'error',
                    message: 'Missing semicolon at the end of statement',
                    line: i + 1
                });
            }
        }
        
        // 2. Unmatched parentheses
        const openParens = (code.match(/\(/g) || []).length;
        const closeParens = (code.match(/\)/g) || []).length;
        if (openParens !== closeParens) {
            issues.push({
                severity: 'error',
                message: `Unmatched parentheses: found ${openParens} opening and ${closeParens} closing`,
            });
        }
        
        // 3. Unmatched braces
        const openBraces = (code.match(/\{/g) || []).length;
        const closeBraces = (code.match(/\}/g) || []).length;
        if (openBraces !== closeBraces) {
            issues.push({
                severity: 'error',
                message: `Unmatched braces: found ${openBraces} opening and ${closeBraces} closing`,
            });
        }
        
        // 4. Missing main function
        if (!code.includes('main')) {
            issues.push({
                severity: 'error',
                message: 'Missing main function',
            });
        }
        
        // 5. Unused variables (simple check)
        const varDeclarations = code.match(/(int|char|float|double)\s+\w+/g);
        if (varDeclarations) {
            varDeclarations.forEach(declaration => {
                const varName = declaration.split(' ')[1];
                // Simple check - count occurrences
                const occurrences = (code.match(new RegExp(`\\b${varName}\\b`, 'g')) || []).length;
                if (occurrences <= 1) {
                    issues.push({
                        severity: 'warning',
                        message: `Variable '${varName}' declared but not used`,
                    });
                }
            });
        }
        
        // 6. Missing include guards for common headers
        if (code.includes('printf') && !code.includes('#include <stdio.h>')) {
            issues.push({
                severity: 'warning',
                message: 'Missing #include <stdio.h> for printf function',
            });
        }
        
        if ((code.includes('malloc') || code.includes('calloc') || code.includes('free')) && 
            !code.includes('#include <stdlib.h>')) {
            issues.push({
                severity: 'warning',
                message: 'Missing #include <stdlib.h> for memory functions',
            });
        }
        
        if (code.includes('strcpy') && !code.includes('#include <string.h>')) {
            issues.push({
                severity: 'warning',
                message: 'Missing #include <string.h> for string functions',
            });
        }
        
        return issues;
    },
    
    handleEditorKeyDown: function(e) {
        // Handle tab key for indentation
        if (e.key === 'Tab') {
            e.preventDefault();
            const start = e.target.selectionStart;
            const end = e.target.selectionEnd;
            
            // Insert 4 spaces at cursor position
            e.target.value = e.target.value.substring(0, start) + '    ' + e.target.value.substring(end);
            
            // Move cursor to after the inserted spaces
            e.target.selectionStart = e.target.selectionEnd = start + 4;
        }
    },
    
    handleEditorInput: function(e) {
        // Auto-indent functionality could be added here
    }
};