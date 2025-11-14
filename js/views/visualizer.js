// Visualizer View Controller for pointer and memory visualization
window.viewControllers = window.viewControllers || {};

window.viewControllers['visualizer'] = {
    init: function(params) {
        console.log('Initializing Visualizer view');
        this.render();
        this.bindEvents();
    },
    
    destroy: function() {
        console.log('Destroying Visualizer view');
        // Clean up any event listeners or resources
    },
    
    render: function() {
        const app = document.getElementById('app');
        app.innerHTML = `
            <div class="page visualizer-page active">
                <div class="container">
                    <h2>Pointer & Memory Visualizer</h2>
                    <div class="visualizer-container">
                        <div class="controls">
                            <select id="demoSelector">
                                <option value="">Select a Demo</option>
                                <option value="pointerBasics">Pointer Basics</option>
                                <option value="mallocFree">Malloc & Free</option>
                                <option value="arrayLayout">Array Layout</option>
                                <option value="stringInternals">String Internals</option>
                            </select>
                            <button class="btn btn-primary" id="runDemo">Run Demo</button>
                            <button class="btn btn-outline" id="stepDemo">Step</button>
                            <button class="btn btn-outline" id="resetDemo">Reset</button>
                            <div class="speed-control">
                                <label for="speedSlider">Speed:</label>
                                <input type="range" id="speedSlider" min="1" max="10" value="5">
                            </div>
                        </div>
                        <div class="canvas-container">
                            <canvas id="memoryCanvas" width="800" height="500"></canvas>
                        </div>
                        <div class="explanation">
                            <h3>Demo Explanation</h3>
                            <p id="demoExplanation">Select a demo to begin visualization.</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Initialize canvas
        this.initVisualizer();
    },
    
    bindEvents: function() {
        // Add event listeners
        document.getElementById('runDemo').addEventListener('click', () => this.runDemo());
        document.getElementById('stepDemo').addEventListener('click', () => this.stepDemo());
        document.getElementById('resetDemo').addEventListener('click', () => this.resetDemo());
        document.getElementById('demoSelector').addEventListener('change', (e) => {
            this.selectDemo(e.target.value);
        });
    },
    
    initVisualizer: function() {
        this.canvas = document.getElementById('memoryCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.currentDemo = null;
        this.demoStep = 0;
        this.demoRunning = false;
        this.speed = 5;
        
        // Draw initial state
        this.drawInitialState();
    },
    
    drawInitialState: function() {
        const ctx = this.ctx;
        const width = this.canvas.width;
        const height = this.canvas.height;
        
        // Clear canvas
        ctx.clearRect(0, 0, width, height);
        
        // Draw memory layout
        ctx.fillStyle = '#f0f0f0';
        ctx.fillRect(0, 0, width, height);
        
        // Draw stack area
        ctx.fillStyle = '#3498db';
        ctx.fillRect(50, 50, 300, 400);
        ctx.fillStyle = 'white';
        ctx.font = '16px Arial';
        ctx.fillText('Stack', 180, 40);
        
        // Draw heap area
        ctx.fillStyle = '#e74c3c';
        ctx.fillRect(450, 50, 300, 400);
        ctx.fillStyle = 'white';
        ctx.fillText('Heap', 580, 40);
        
        // Draw legend
        ctx.fillStyle = 'black';
        ctx.font = '14px Arial';
        ctx.fillText('Stack Memory (Automatic Variables)', 50, 470);
        ctx.fillText('Heap Memory (Dynamic Allocation)', 450, 470);
    },
    
    selectDemo: function(demoName) {
        this.currentDemo = demoName;
        this.demoStep = 0;
        this.demoRunning = false;
        
        const explanation = document.getElementById('demoExplanation');
        switch(demoName) {
            case 'pointerBasics':
                explanation.innerHTML = '<p>This demo shows how pointers work in C. We\'ll declare an integer variable and a pointer to it, then visualize how they relate in memory.</p>';
                break;
            case 'mallocFree':
                explanation.innerHTML = '<p>This demo visualizes dynamic memory allocation using malloc() and deallocation using free(). You\'ll see how memory is allocated on the heap and then freed.</p>';
                break;
            case 'arrayLayout':
                explanation.innerHTML = '<p>This demo shows how arrays are laid out in memory. We\'ll visualize both stack-allocated and heap-allocated arrays.</p>';
                break;
            case 'stringInternals':
                explanation.innerHTML = '<p>This demo visualizes how strings work in C. You\'ll see how character arrays are stored and how string functions operate.</p>';
                break;
            default:
                explanation.innerHTML = '<p>Select a demo to begin visualization.</p>';
        }
        
        this.drawInitialState();
    },
    
    runDemo: function() {
        if (!this.currentDemo) {
            alert('Please select a demo first');
            return;
        }
        
        this.demoRunning = true;
        this.executeDemoStep();
    },
    
    stepDemo: function() {
        if (!this.currentDemo) {
            alert('Please select a demo first');
            return;
        }
        
        this.executeDemoStep();
    },
    
    resetDemo: function() {
        this.demoStep = 0;
        this.demoRunning = false;
        this.drawInitialState();
        document.getElementById('demoExplanation').innerHTML = '<p>Demo reset. Select "Run Demo" or "Step" to continue.</p>';
    },
    
    executeDemoStep: function() {
        switch(this.currentDemo) {
            case 'pointerBasics':
                this.runPointerBasicsDemo();
                break;
            case 'mallocFree':
                this.runMallocFreeDemo();
                break;
            case 'arrayLayout':
                this.runArrayLayoutDemo();
                break;
            case 'stringInternals':
                this.runStringInternalsDemo();
                break;
        }
    },
    
    runPointerBasicsDemo: function() {
        const ctx = this.ctx;
        const width = this.canvas.width;
        const height = this.canvas.height;
        
        // Clear canvas and redraw initial state
        this.drawInitialState();
        
        if (this.demoStep === 0) {
            // Draw stack variable
            ctx.fillStyle = '#2ecc71';
            ctx.fillRect(80, 100, 100, 40);
            ctx.strokeStyle = 'black';
            ctx.strokeRect(80, 100, 100, 40);
            ctx.fillStyle = 'white';
            ctx.font = '14px Arial';
            ctx.fillText('int num = 42', 90, 125);
            
            document.getElementById('demoExplanation').innerHTML = '<p>Step 1: We declare an integer variable "num" with value 42. It is stored in the stack memory.</p>';
        } else if (this.demoStep === 1) {
            // Draw pointer variable
            ctx.fillStyle = '#f39c12';
            ctx.fillRect(80, 160, 120, 40);
            ctx.strokeStyle = 'black';
            ctx.strokeRect(80, 160, 120, 40);
            ctx.fillStyle = 'white';
            ctx.font = '14px Arial';
            ctx.fillText('int *ptr', 90, 185);
            
            document.getElementById('demoExplanation').innerHTML = '<p>Step 2: We declare a pointer variable "ptr" that can hold the address of an integer.</p>';
        } else if (this.demoStep === 2) {
            // Draw assignment
            ctx.fillStyle = '#f39c12';
            ctx.fillRect(80, 160, 120, 40);
            ctx.strokeStyle = 'black';
            ctx.strokeRect(80, 160, 120, 40);
            ctx.fillStyle = 'white';
            ctx.font = '14px Arial';
            ctx.fillText('ptr = &num', 90, 185);
            
            // Draw arrow from pointer to variable
            ctx.beginPath();
            ctx.moveTo(200, 180);
            ctx.lineTo(350, 120);
            ctx.strokeStyle = '#f39c12';
            ctx.lineWidth = 2;
            ctx.stroke();
            
            // Draw arrowhead
            ctx.beginPath();
            ctx.moveTo(350, 120);
            ctx.lineTo(340, 115);
            ctx.lineTo(340, 125);
            ctx.closePath();
            ctx.fillStyle = '#f39c12';
            ctx.fill();
            
            document.getElementById('demoExplanation').innerHTML = '<p>Step 3: We assign the address of "num" to "ptr" using the address-of operator (&). The pointer now points to the memory location of "num".</p>';
        } else if (this.demoStep === 3) {
            // Show dereferencing
            ctx.fillStyle = '#9b59b6';
            ctx.fillRect(80, 220, 150, 40);
            ctx.strokeStyle = 'black';
            ctx.strokeRect(80, 220, 150, 40);
            ctx.fillStyle = 'white';
            ctx.font = '14px Arial';
            ctx.fillText('int value = *ptr', 90, 245);
            
            // Draw arrow from dereference to variable
            ctx.beginPath();
            ctx.moveTo(230, 240);
            ctx.lineTo(350, 120);
            ctx.strokeStyle = '#9b59b6';
            ctx.lineWidth = 2;
            ctx.stroke();
            
            // Draw arrowhead
            ctx.beginPath();
            ctx.moveTo(350, 120);
            ctx.lineTo(340, 115);
            ctx.lineTo(340, 125);
            ctx.closePath();
            ctx.fillStyle = '#9b59b6';
            ctx.fill();
            
            document.getElementById('demoExplanation').innerHTML = '<p>Step 4: We dereference the pointer using the * operator to get the value stored at the address it points to. "value" now contains 42.</p>';
        } else {
            document.getElementById('demoExplanation').innerHTML = '<p>Demo complete! We\'ve shown how pointers work in C, including declaration, assignment, and dereferencing.</p>';
            this.demoRunning = false;
            return;
        }
        
        this.demoStep++;
    },
    
    runMallocFreeDemo: function() {
        const ctx = this.ctx;
        const width = this.canvas.width;
        const height = this.canvas.height;
        
        // Clear canvas and redraw initial state
        this.drawInitialState();
        
        if (this.demoStep === 0) {
            // Draw code
            ctx.fillStyle = '#2c3e50';
            ctx.fillRect(80, 80, 200, 40);
            ctx.fillStyle = 'white';
            ctx.font = '14px Arial';
            ctx.fillText('int *ptr = malloc(5*sizeof(int))', 90, 105);
            
            document.getElementById('demoExplanation').innerHTML = '<p>Step 1: We call malloc() to allocate memory for 5 integers on the heap. The function returns a pointer to the allocated memory.</p>';
        } else if (this.demoStep === 1) {
            // Draw allocated memory block
            ctx.fillStyle = '#e74c3c';
            ctx.fillRect(500, 150, 200, 60);
            ctx.strokeStyle = 'black';
            ctx.strokeRect(500, 150, 200, 60);
            ctx.fillStyle = 'white';
            ctx.font = '14px Arial';
            ctx.fillText('Allocated Memory', 530, 180);
            
            // Draw arrow from code to memory
            ctx.beginPath();
            ctx.moveTo(280, 100);
            ctx.lineTo(500, 180);
            ctx.strokeStyle = '#3498db';
            ctx.lineWidth = 2;
            ctx.stroke();
            
            // Draw arrowhead
            ctx.beginPath();
            ctx.moveTo(500, 180);
            ctx.lineTo(490, 175);
            ctx.lineTo(490, 185);
            ctx.closePath();
            ctx.fillStyle = '#3498db';
            ctx.fill();
            
            document.getElementById('demoExplanation').innerHTML = '<p>Step 2: malloc() allocates a contiguous block of memory on the heap for 5 integers. The pointer "ptr" now holds the address of this memory block.</p>';
        } else if (this.demoStep === 2) {
            // Draw array elements
            for (let i = 0; i < 5; i++) {
                ctx.fillStyle = '#f39c12';
                ctx.fillRect(510 + (i * 35), 160, 30, 40);
                ctx.strokeStyle = 'black';
                ctx.strokeRect(510 + (i * 35), 160, 30, 40);
                ctx.fillStyle = 'white';
                ctx.font = '12px Arial';
                ctx.fillText(i.toString(), 525 + (i * 35), 185);
            }
            
            document.getElementById('demoExplanation').innerHTML = '<p>Step 3: We can now use the allocated memory as an array. Each element can be accessed using array notation or pointer arithmetic.</p>';
        } else if (this.demoStep === 3) {
            // Draw free call
            ctx.fillStyle = '#2c3e50';
            ctx.fillRect(80, 140, 100, 40);
            ctx.fillStyle = 'white';
            ctx.font = '14px Arial';
            ctx.fillText('free(ptr)', 90, 165);
            
            // Draw X over memory
            ctx.beginPath();
            ctx.moveTo(500, 150);
            ctx.lineTo(700, 210);
            ctx.moveTo(700, 150);
            ctx.lineTo(500, 210);
            ctx.strokeStyle = '#e74c3c';
            ctx.lineWidth = 3;
            ctx.stroke();
            
            document.getElementById('demoExplanation').innerHTML = '<p>Step 4: We call free() to deallocate the memory. This makes the memory block available for future allocations. It\'s important to free dynamically allocated memory to avoid memory leaks.</p>';
        } else {
            document.getElementById('demoExplanation').innerHTML = '<p>Demo complete! We\'ve shown dynamic memory allocation with malloc() and deallocation with free().</p>';
            this.demoRunning = false;
            return;
        }
        
        this.demoStep++;
    },
    
    runArrayLayoutDemo: function() {
        const ctx = this.ctx;
        const width = this.canvas.width;
        const height = this.canvas.height;
        
        // Clear canvas and redraw initial state
        this.drawInitialState();
        
        if (this.demoStep === 0) {
            // Draw stack array
            ctx.fillStyle = '#3498db';
            ctx.fillRect(80, 100, 200, 60);
            ctx.strokeStyle = 'black';
            ctx.strokeRect(80, 100, 200, 60);
            ctx.fillStyle = 'white';
            ctx.font = '14px Arial';
            ctx.fillText('int arr[5] = {1,2,3,4,5}', 90, 130);
            
            // Draw array elements
            for (let i = 0; i < 5; i++) {
                ctx.fillStyle = '#2ecc71';
                ctx.fillRect(90 + (i * 35), 110, 30, 40);
                ctx.strokeStyle = 'black';
                ctx.strokeRect(90 + (i * 35), 110, 30, 40);
                ctx.fillStyle = 'white';
                ctx.font = '12px Arial';
                ctx.fillText((i+1).toString(), 105 + (i * 35), 135);
            }
            
            document.getElementById('demoExplanation').innerHTML = '<p>Step 1: We declare a stack-allocated array with 5 integers. The array elements are stored in contiguous memory locations in the stack.</p>';
        } else if (this.demoStep === 1) {
            // Draw heap array code
            ctx.fillStyle = '#2c3e50';
            ctx.fillRect(80, 180, 250, 40);
            ctx.fillStyle = 'white';
            ctx.font = '14px Arial';
            ctx.fillText('int *heapArr = malloc(5*sizeof(int))', 90, 205);
            
            document.getElementById('demoExplanation').innerHTML = '<p>Step 2: We allocate memory for an array on the heap using malloc(). The pointer "heapArr" points to the first element.</p>';
        } else if (this.demoStep === 2) {
            // Draw heap array
            ctx.fillStyle = '#e74c3c';
            ctx.fillRect(500, 150, 200, 60);
            ctx.strokeStyle = 'black';
            ctx.strokeRect(500, 150, 200, 60);
            ctx.fillStyle = 'white';
            ctx.font = '14px Arial';
            ctx.fillText('Heap Array', 560, 180);
            
            // Draw array elements
            for (let i = 0; i < 5; i++) {
                ctx.fillStyle = '#f39c12';
                ctx.fillRect(510 + (i * 35), 160, 30, 40);
                ctx.strokeStyle = 'black';
                ctx.strokeRect(510 + (i * 35), 160, 30, 40);
                ctx.fillStyle = 'white';
                ctx.font = '12px Arial';
                ctx.fillText('?', 525 + (i * 35), 185);
            }
            
            // Draw arrow from code to heap array
            ctx.beginPath();
            ctx.moveTo(330, 200);
            ctx.lineTo(500, 180);
            ctx.strokeStyle = '#3498db';
            ctx.lineWidth = 2;
            ctx.stroke();
            
            // Draw arrowhead
            ctx.beginPath();
            ctx.moveTo(500, 180);
            ctx.lineTo(490, 175);
            ctx.lineTo(490, 185);
            ctx.closePath();
            ctx.fillStyle = '#3498db';
            ctx.fill();
            
            document.getElementById('demoExplanation').innerHTML = '<p>Step 3: The heap-allocated array is stored in contiguous memory locations on the heap. Initially, the values are undefined.</p>';
        } else if (this.demoStep === 3) {
            // Fill heap array with values
            for (let i = 0; i < 5; i++) {
                ctx.fillStyle = '#f39c12';
                ctx.fillRect(510 + (i * 35), 160, 30, 40);
                ctx.strokeStyle = 'black';
                ctx.strokeRect(510 + (i * 35), 160, 30, 40);
                ctx.fillStyle = 'white';
                ctx.font = '12px Arial';
                ctx.fillText((i*10).toString(), 515 + (i * 35), 185);
            }
            
            document.getElementById('demoExplanation').innerHTML = '<p>Step 4: We can assign values to the heap-allocated array elements just like a regular array. The memory layout is identical to the stack array, but the location is different.</p>';
        } else {
            document.getElementById('demoExplanation').innerHTML = '<p>Demo complete! We\'ve shown how arrays are laid out in memory, both on the stack and on the heap.</p>';
            this.demoRunning = false;
            return;
        }
        
        this.demoStep++;
    },
    
    runStringInternalsDemo: function() {
        const ctx = this.ctx;
        const width = this.canvas.width;
        const height = this.canvas.height;
        
        // Clear canvas and redraw initial state
        this.drawInitialState();
        
        if (this.demoStep === 0) {
            // Draw string declaration
            ctx.fillStyle = '#2c3e50';
            ctx.fillRect(80, 80, 200, 40);
            ctx.fillStyle = 'white';
            ctx.font = '14px Arial';
            ctx.fillText('char str[] = "Hello"', 90, 105);
            
            document.getElementById('demoExplanation').innerHTML = '<p>Step 1: We declare a character array and initialize it with the string "Hello". In C, strings are arrays of characters terminated by a null character \'\\0\'.</p>';
        } else if (this.demoStep === 1) {
            // Draw stack string
            ctx.fillStyle = '#3498db';
            ctx.fillRect(80, 140, 250, 60);
            ctx.strokeStyle = 'black';
            ctx.strokeRect(80, 140, 250, 60);
            ctx.fillStyle = 'white';
            ctx.font = '14px Arial';
            ctx.fillText('Stack String', 160, 170);
            
            // Draw character elements
            const str = "Hello";
            for (let i = 0; i <= str.length; i++) {
                ctx.fillStyle = '#2ecc71';
                ctx.fillRect(90 + (i * 40), 150, 35, 40);
                ctx.strokeStyle = 'black';
                ctx.strokeRect(90 + (i * 40), 150, 35, 40);
                ctx.fillStyle = 'white';
                ctx.font = '12px Arial';
                if (i < str.length) {
                    ctx.fillText(str[i], 105 + (i * 40), 175);
                } else {
                    ctx.fillText('\\0', 105 + (i * 40), 175);
                }
            }
            
            document.getElementById('demoExplanation').innerHTML = '<p>Step 2: The string is stored as a character array in the stack. Each character occupies one byte, and the string is terminated by a null character \'\\0\'.</p>';
        } else if (this.demoStep === 2) {
            // Draw pointer to string
            ctx.fillStyle = '#f39c12';
            ctx.fillRect(80, 220, 120, 40);
            ctx.strokeStyle = 'black';
            ctx.strokeRect(80, 220, 120, 40);
            ctx.fillStyle = 'white';
            ctx.font = '14px Arial';
            ctx.fillText('char *ptr = str', 90, 245);
            
            // Draw arrow from pointer to first character
            ctx.beginPath();
            ctx.moveTo(200, 240);
            ctx.lineTo(350, 170);
            ctx.strokeStyle = '#f39c12';
            ctx.lineWidth = 2;
            ctx.stroke();
            
            // Draw arrowhead
            ctx.beginPath();
            ctx.moveTo(350, 170);
            ctx.lineTo(340, 165);
            ctx.lineTo(340, 175);
            ctx.closePath();
            ctx.fillStyle = '#f39c12';
            ctx.fill();
            
            document.getElementById('demoExplanation').innerHTML = '<p>Step 3: We can create a pointer that points to the first character of the string. This is how string functions work internally - they receive a pointer to the first character.</p>';
        } else if (this.demoStep === 3) {
            // Draw string function
            ctx.fillStyle = '#9b59b6';
            ctx.fillRect(80, 280, 200, 40);
            ctx.fillStyle = 'white';
            ctx.font = '14px Arial';
            ctx.fillText('strlen(ptr) returns 5', 90, 305);
            
            document.getElementById('demoExplanation').innerHTML = '<p>Step 4: String functions like strlen() work by following the pointer and counting characters until they encounter the null terminator. In this case, strlen() returns 5 because there are 5 characters before the \'\\0\'.</p>';
        } else {
            document.getElementById('demoExplanation').innerHTML = '<p>Demo complete! We\'ve shown how strings are stored in memory and how string functions work with pointers.</p>';
            this.demoRunning = false;
            return;
        }
        
        this.demoStep++;
    }
};