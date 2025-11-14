// Snippets View Controller
window.viewControllers = window.viewControllers || {};

window.viewControllers['snippets'] = {
    init: function(params) {
        console.log('Initializing Snippets view');
        this.render();
        this.bindEvents();
    },
    
    destroy: function() {
        console.log('Destroying Snippets view');
        // Clean up any event listeners or resources
    },
    
    render: function() {
        const app = document.getElementById('app');
        app.innerHTML = `
            <div class="page snippets-page active">
                <div class="container">
                    <h2>Code Snippets Library</h2>
                    <div class="search-box">
                        <input type="text" id="snippetSearch" placeholder="Search snippets...">
                        <select id="snippetCategory">
                            <option value="all">All Categories</option>
                            <option value="basics">Basics</option>
                            <option value="functions">Functions</option>
                            <option value="arrays">Arrays & Strings</option>
                            <option value="pointers">Pointers</option>
                            <option value="memory">Memory Management</option>
                            <option value="files">File Handling</option>
                        </select>
                    </div>
                    <div class="snippet-grid" id="snippetGrid">
                        <!-- Snippets will be populated here -->
                    </div>
                </div>
            </div>
        `;
        
        // Populate snippets
        this.populateSnippets();
        
        // Add event listeners
        document.getElementById('snippetSearch').addEventListener('input', (e) => {
            this.filterSnippets(e.target.value);
        });
        
        document.getElementById('snippetCategory').addEventListener('change', (e) => {
            this.filterSnippetsByCategory(e.target.value);
        });
    },
    
    bindEvents: function() {
        // Events are bound in the render function
    },
    
    populateSnippets: function() {
        const snippets = [
            {
                id: 'hello',
                title: 'Hello World',
                description: 'A simple program that prints "Hello, World!" to the console.',
                code: `#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    return 0;
}`,
                category: 'basics',
                tags: ['beginner', 'output']
            },
            {
                id: 'fibonacci',
                title: 'Fibonacci Series',
                description: 'Program to generate Fibonacci series up to n terms.',
                code: `#include <stdio.h>

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
                category: 'arrays',
                tags: ['loop', 'math']
            },
            {
                id: 'prime',
                title: 'Prime Number Check',
                description: 'Program to check if a number is prime or not.',
                code: `#include <stdio.h>

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
                category: 'basics',
                tags: ['math', 'condition']
            },
            {
                id: 'pointer',
                title: 'Pointer Basics',
                description: 'Demonstrates basic pointer operations in C.',
                code: `#include <stdio.h>

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
                category: 'pointers',
                tags: ['memory', 'address']
            },
            {
                id: 'malloc',
                title: 'Dynamic Memory Allocation',
                description: 'Shows how to allocate and free memory dynamically.',
                code: `#include <stdio.h>
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
                category: 'memory',
                tags: ['heap', 'free']
            },
            {
                id: 'file',
                title: 'File Handling',
                description: 'Basic file reading and writing operations.',
                code: `#include <stdio.h>

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
}`,
                category: 'files',
                tags: ['io', 'filesystem']
            },
            {
                id: 'struct',
                title: 'Structure Example',
                description: 'Demonstrates how to use structures in C.',
                code: `#include <stdio.h>
#include <string.h>

struct Student {
    int id;
    char name[50];
    float marks;
};

int main() {
    struct Student s1;
    
    s1.id = 1;
    strcpy(s1.name, "John Doe");
    s1.marks = 85.5;
    
    printf("ID: %d\\n", s1.id);
    printf("Name: %s\\n", s1.name);
    printf("Marks: %.2f\\n", s1.marks);
    
    return 0;
}`,
                category: 'structures',
                tags: ['struct', 'data-types']
            },
            {
                id: 'function',
                title: 'Function Example',
                description: 'Shows how to define and use functions in C.',
                code: `#include <stdio.h>

// Function declaration
int add(int a, int b);

int main() {
    int result = add(5, 3);
    printf("Sum: %d\\n", result);
    return 0;
}

// Function definition
int add(int a, int b) {
    return a + b;
}`,
                category: 'functions',
                tags: ['function', 'modularity']
            }
        ];
        
        const grid = document.getElementById('snippetGrid');
        grid.innerHTML = snippets.map(snippet => `
            <div class="snippet-card" data-category="${snippet.category}" data-tags="${snippet.tags.join(' ')}">
                <h3>${snippet.title}</h3>
                <p>${snippet.description}</p>
                <div class="snippet-tags">
                    ${snippet.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                <pre class="snippet-code"><code class="language-c">${snippet.code}</code></pre>
                <div class="snippet-actions">
                    <button class="btn btn-outline btn-small copy-snippet" data-snippet-id="${snippet.id}" data-code="${snippet.code.replace(/"/g, '&quot;')}">Copy</button>
                    <button class="btn btn-outline btn-small download-snippet" data-snippet-id="${snippet.id}" data-code="${snippet.code.replace(/"/g, '&quot;')}" data-filename="${snippet.title.toLowerCase().replace(/\s+/g, '-')}.c">Download</button>
                    <button class="btn btn-outline btn-small bookmark-snippet" data-snippet-id="${snippet.id}">Bookmark</button>
                </div>
            </div>
        `).join('');
        
        // Initialize Prism for syntax highlighting
        if (typeof Prism !== 'undefined') {
            Prism.highlightAll();
        }
        
        // Add event listeners for snippet actions
        document.querySelectorAll('.copy-snippet').forEach(button => {
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
        
        document.querySelectorAll('.download-snippet').forEach(button => {
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
        
        document.querySelectorAll('.bookmark-snippet').forEach(button => {
            button.addEventListener('click', (e) => {
                const snippetId = e.target.getAttribute('data-snippet-id');
                this.toggleSnippetBookmark(snippetId, e.target);
            });
        });
    },
    
    toggleSnippetBookmark: function(snippetId, button) {
        const bookmarks = StorageHelper.loadBookmarks() || [];
        const bookmarkIndex = bookmarks.findIndex(item => item.type === 'snippet' && item.id === snippetId);
        
        if (bookmarkIndex >= 0) {
            // Remove bookmark
            bookmarks.splice(bookmarkIndex, 1);
            button.textContent = 'Bookmark';
        } else {
            // Add bookmark
            bookmarks.push({ type: 'snippet', id: snippetId });
            button.textContent = 'Unbookmark';
        }
        
        StorageHelper.saveBookmarks(bookmarks);
    },
    
    filterSnippets: function(term) {
        const cards = document.querySelectorAll('.snippet-card');
        term = term.toLowerCase();
        
        // Get selected category
        const categorySelect = document.getElementById('snippetCategory');
        const selectedCategory = categorySelect ? categorySelect.value : 'all';
        
        cards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();
            const category = card.getAttribute('data-category');
            
            // Check if matches search term
            const matchesSearch = term === '' || title.includes(term) || description.includes(term);
            
            // Check if matches category
            const matchesCategory = selectedCategory === 'all' || category === selectedCategory;
            
            if (matchesSearch && matchesCategory) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    },
    
    filterSnippetsByCategory: function(category) {
        const cards = document.querySelectorAll('.snippet-card');
        
        if (category === 'all') {
            cards.forEach(card => {
                card.style.display = 'block';
            });
            return;
        }
        
        cards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            if (cardCategory === category) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
};