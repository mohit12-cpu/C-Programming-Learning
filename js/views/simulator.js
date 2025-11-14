// Simulator View Controller
window.viewControllers = window.viewControllers || {};

window.viewControllers['simulator'] = {
    init: function(params) {
        console.log('Initializing Simulator view');
        this.render();
        this.bindEvents();
    },
    
    destroy: function() {
        console.log('Destroying Simulator view');
        // Clean up any event listeners or resources
    },
    
    render: function() {
        const app = document.getElementById('app');
        app.innerHTML = `
            <div class="page simulator-page active">
                <div class="container">
                    <h2>Memory & Pointer Simulator</h2>
                    <div class="simulator-container">
                        <div class="controls">
                            <button class="btn btn-primary" id="initMemory">Initialize Memory</button>
                            <button class="btn btn-outline" id="allocateMemory">Allocate Memory</button>
                            <button class="btn btn-outline" id="allocateArray">Allocate Array</button>
                            <button class="btn btn-outline" id="showPointers">Show Pointers</button>
                            <button class="btn btn-outline" id="freeMemory">Free Memory</button>
                            <button class="btn btn-outline" id="resetSimulator">Reset</button>
                        </div>
                        <div class="canvas-container">
                            <canvas id="memoryCanvas" width="800" height="400"></canvas>
                        </div>
                        <div class="explanation">
                            <h3>How it works</h3>
                            <p>This simulator demonstrates how memory allocation works in C using malloc() and free(). 
                            Click "Initialize Memory" to start, then "Allocate Memory" to simulate malloc() and 
                            "Free Memory" to simulate free(). "Allocate Array" shows array allocation, and 
                            "Show Pointers" demonstrates pointer relationships.</p>
                            <div class="code-example">
                                <h4>Example Code:</h4>
                                <pre><code class="language-c">int *ptr = (int*) malloc(5 * sizeof(int));
// Use the allocated memory
free(ptr);</code></pre>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Initialize canvas
        this.initMemorySimulator();
        
        // Initialize Prism for syntax highlighting
        if (typeof Prism !== 'undefined') {
            Prism.highlightAll();
        }
    },
    
    bindEvents: function() {
        // Events are bound in the initMemorySimulator function
    },
    
    initMemorySimulator: function() {
        const canvas = document.getElementById('memoryCanvas');
        const ctx = canvas.getContext('2d');
        
        // Add event listeners
        document.getElementById('initMemory').addEventListener('click', () => {
            this.drawMemoryLayout(ctx, canvas.width, canvas.height);
        });
        
        document.getElementById('allocateMemory').addEventListener('click', () => {
            this.simulateMalloc(ctx, canvas.width, canvas.height);
        });
        
        document.getElementById('allocateArray').addEventListener('click', () => {
            this.simulateArrayAllocation(ctx, canvas.width, canvas.height);
        });
        
        document.getElementById('showPointers').addEventListener('click', () => {
            this.showPointers(ctx, canvas.width, canvas.height);
        });
        
        document.getElementById('freeMemory').addEventListener('click', () => {
            this.simulateFree(ctx, canvas.width, canvas.height);
        });
        
        document.getElementById('resetSimulator').addEventListener('click', () => {
            this.resetSimulator(ctx, canvas.width, canvas.height);
        });
        
        // Draw initial state
        this.drawMemoryLayout(ctx, canvas.width, canvas.height);
    },
    
    drawMemoryLayout: function(ctx, width, height) {
        // Clear canvas
        ctx.clearRect(0, 0, width, height);
        
        // Draw stack
        ctx.fillStyle = '#3498db';
        ctx.fillRect(50, 50, 200, 300);
        ctx.fillStyle = 'white';
        ctx.font = '16px Arial';
        ctx.fillText('Stack', 130, 40);
        
        // Draw heap
        ctx.fillStyle = '#e74c3c';
        ctx.fillRect(300, 50, 450, 300);
        ctx.fillStyle = 'white';
        ctx.fillText('Heap', 500, 40);
        
        // Draw labels
        ctx.fillStyle = 'black';
        ctx.font = '14px Arial';
        ctx.fillText('Automatic variables, function calls', 50, 370);
        ctx.fillText('Dynamic memory allocation (malloc)', 300, 370);
        
        // Draw legend
        ctx.fillStyle = '#3498db';
        ctx.fillRect(50, 390, 20, 20);
        ctx.fillStyle = 'black';
        ctx.fillText('Stack Memory', 80, 405);
        
        ctx.fillStyle = '#e74c3c';
        ctx.fillRect(200, 390, 20, 20);
        ctx.fillStyle = 'black';
        ctx.fillText('Heap Memory', 230, 405);
    },
    
    simulateMalloc: function(ctx, width, height) {
        // Draw allocated block in heap
        const x = 320 + Math.random() * 300;
        const y = 70 + Math.random() * 200;
        const blockSize = 50 + Math.random() * 100;
        
        ctx.fillStyle = '#f39c12';
        ctx.fillRect(x, y, blockSize, 30);
        ctx.strokeStyle = 'black';
        ctx.strokeRect(x, y, blockSize, 30);
        ctx.fillStyle = 'white';
        ctx.font = '12px Arial';
        ctx.fillText('malloc()', x + 5, y + 20);
    },
    
    simulateFree: function(ctx, width, height) {
        // Just a visual indication that memory was freed
        ctx.fillStyle = 'rgba(46, 204, 113, 0.5)';
        ctx.fillRect(300, 320, 100, 30);
        ctx.fillStyle = 'white';
        ctx.font = '14px Arial';
        ctx.fillText('Memory Freed', 310, 340);
    },
    
    simulateArrayAllocation: function(ctx, width, height) {
        // Draw allocated array in heap
        const x = 350 + Math.random() * 200;
        const y = 100 + Math.random() * 150;
        const blockSize = 30;
        const arraySize = 5;
        
        // Draw array elements
        for (let i = 0; i < arraySize; i++) {
            ctx.fillStyle = '#9b59b6';
            ctx.fillRect(x + (i * blockSize), y, blockSize - 2, blockSize);
            ctx.strokeStyle = 'black';
            ctx.strokeRect(x + (i * blockSize), y, blockSize - 2, blockSize);
            ctx.fillStyle = 'white';
            ctx.font = '12px Arial';
            ctx.fillText(i.toString(), x + (i * blockSize) + 10, y + 20);
        }
        
        // Draw array label
        ctx.fillStyle = 'black';
        ctx.font = '14px Arial';
        ctx.fillText('int arr[5]', x, y - 10);
    },
    
    showPointers: function(ctx, width, height) {
        // Draw stack variable
        ctx.fillStyle = '#3498db';
        ctx.fillRect(80, 100, 100, 30);
        ctx.strokeStyle = 'black';
        ctx.strokeRect(80, 100, 100, 30);
        ctx.fillStyle = 'white';
        ctx.font = '12px Arial';
        ctx.fillText('int *ptr', 90, 120);
        
        // Draw heap memory
        ctx.fillStyle = '#e74c3c';
        ctx.fillRect(400, 100, 100, 30);
        ctx.strokeStyle = 'black';
        ctx.strokeRect(400, 100, 100, 30);
        ctx.fillStyle = 'white';
        ctx.font = '12px Arial';
        ctx.fillText('malloc()', 410, 120);
        
        // Draw pointer arrow
        ctx.beginPath();
        ctx.moveTo(180, 115);
        ctx.lineTo(400, 115);
        ctx.strokeStyle = '#f39c12';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Draw arrowhead
        ctx.beginPath();
        ctx.moveTo(400, 115);
        ctx.lineTo(390, 110);
        ctx.lineTo(390, 120);
        ctx.closePath();
        ctx.fillStyle = '#f39c12';
        ctx.fill();
        
        // Draw address labels
        ctx.fillStyle = 'black';
        ctx.font = '12px Arial';
        ctx.fillText('Address: 0x1000', 80, 90);
        ctx.fillText('Address: 0x5000', 400, 90);
    },
    
    resetSimulator: function(ctx, width, height) {
        this.drawMemoryLayout(ctx, width, height);
    }
};