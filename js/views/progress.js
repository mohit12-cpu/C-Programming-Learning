// Progress View Controller
window.viewControllers = window.viewControllers || {};

window.viewControllers['progress'] = {
    init: function(params) {
        console.log('Initializing Progress view');
        this.render();
        this.bindEvents();
    },
    
    destroy: function() {
        console.log('Destroying Progress view');
        // Clean up any event listeners or resources
    },
    
    render: function() {
        // Check for new badges
        this.checkForBadges();
        
        // Load progress data
        const progress = StorageHelper.loadProgress() || {
            xp: 0,
            lessonsCompleted: [],
            quizzesTaken: [],
            projectsCompleted: [],
            badges: []
        };
        
        const quizResults = StorageHelper.loadQuizResults() || {};
        const quizCount = Object.keys(quizResults).length;
        
        const app = document.getElementById('app');
        app.innerHTML = `
            <div class="page progress-page active">
                <div class="container">
                    <h2>Your Learning Progress</h2>
                    <div class="dashboard">
                        <div class="card">
                            <h3>Statistics</h3>
                            <div class="stats">
                                <div>
                                    <div class="stat-value" id="xpValue">${progress.xp}</div>
                                    <div>Total XP</div>
                                </div>
                                <div>
                                    <div class="stat-value" id="levelValue">${this.calculateLevel(progress.xp)}</div>
                                    <div>Level</div>
                                </div>
                                <div>
                                    <div class="stat-value" id="streakValue">0</div>
                                    <div>Day Streak</div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="card">
                            <h3>Completed Lessons</h3>
                            <div class="stat-value">${progress.lessonsCompleted.length}</div>
                            <div>Lessons Finished</div>
                        </div>
                        
                        <div class="card">
                            <h3>Quiz Performance</h3>
                            <div class="stat-value">${quizCount}</div>
                            <div>Quizzes Completed</div>
                        </div>
                        
                        <div class="card">
                            <h3>Projects Completed</h3>
                            <div class="stat-value">${progress.projectsCompleted ? progress.projectsCompleted.length : 0}</div>
                            <div>Projects Finished</div>
                        </div>
                        
                        <div class="card">
                            <h3>Badges Earned</h3>
                            <div class="badge-grid">
                                <div class="badge ${progress.badges.includes('beginner') ? 'earned' : ''}">
                                    <div>🏆</div>
                                    <div>Beginner</div>
                                </div>
                                <div class="badge ${progress.badges.includes('pointer') ? 'earned' : ''}">
                                    <div>🎯</div>
                                    <div>Pointer Master</div>
                                </div>
                                <div class="badge ${progress.badges.includes('memory') ? 'earned' : ''}">
                                    <div>🧠</div>
                                    <div>Memory Guru</div>
                                </div>
                                <div class="badge ${progress.badges.includes('file') ? 'earned' : ''}">
                                    <div>📁</div>
                                    <div>File Expert</div>
                                </div>
                                <div class="badge ${progress.badges.includes('functions') ? 'earned' : ''}">
                                    <div>⚙️</div>
                                    <div>Function Wizard</div>
                                </div>
                                <div class="badge ${progress.badges.includes('structures') ? 'earned' : ''}">
                                    <div>🏗️</div>
                                    <div>Structure Specialist</div>
                                </div>
                                <div class="badge ${progress.badges.includes('projects') ? 'earned' : ''}">
                                    <div>🚀</div>
                                    <div>Project Builder</div>
                                </div>
                                <div class="badge ${progress.badges.includes('expert') ? 'earned' : ''}">
                                    <div>👑</div>
                                    <div>C Expert</div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="card">
                            <h3>Data Management</h3>
                            <div class="data-actions">
                                <button class="btn btn-outline" id="exportProgress">Export Progress</button>
                                <button class="btn btn-outline" id="importProgress">Import Progress</button>
                                <button class="btn btn-outline" id="resetProgress">Reset Progress</button>
                            </div>
                        </div>
                        
                        <div class="card">
                            <h3>Progress Chart</h3>
                            <div class="chart-container">
                                <canvas id="progressChart" width="400" height="200"></canvas>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Initialize chart
        this.initChart();
    },
    
    bindEvents: function() {
        // Add event listeners for data management
        document.getElementById('exportProgress').addEventListener('click', () => {
            this.exportProgress();
        });
        
        document.getElementById('importProgress').addEventListener('click', () => {
            this.importProgress();
        });
        
        document.getElementById('resetProgress').addEventListener('click', () => {
            this.resetProgress();
        });
    },
    
    calculateLevel: function(xp) {
        return Math.floor(xp / 100) + 1;
    },
    
    initChart: function() {
        // Simple bar chart implementation
        const canvas = document.getElementById('progressChart');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        const progress = StorageHelper.loadProgress() || {
            lessonsCompleted: [],
            quizzesTaken: [],
            projectsCompleted: []
        };
        
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw chart background
        ctx.fillStyle = '#f5f5f5';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw bars
        const barWidth = 50;
        const barSpacing = 30;
        const maxValue = Math.max(
            progress.lessonsCompleted.length,
            progress.quizzesTaken.length,
            progress.projectsCompleted ? progress.projectsCompleted.length : 0,
            5 // Minimum height
        );
        
        const categories = [
            { name: 'Lessons', value: progress.lessonsCompleted.length, color: '#3498db' },
            { name: 'Quizzes', value: progress.quizzesTaken.length, color: '#2ecc71' },
            { name: 'Projects', value: progress.projectsCompleted ? progress.projectsCompleted.length : 0, color: '#e74c3c' }
        ];
        
        categories.forEach((category, index) => {
            const barHeight = maxValue > 0 ? (category.value / maxValue) * 150 : 0;
            const x = 50 + index * (barWidth + barSpacing);
            const y = 180 - barHeight;
            
            // Draw bar
            ctx.fillStyle = category.color;
            ctx.fillRect(x, y, barWidth, barHeight);
            
            // Draw bar label
            ctx.fillStyle = 'black';
            ctx.font = '12px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(category.name, x + barWidth/2, 195);
            
            // Draw value
            ctx.fillText(category.value.toString(), x + barWidth/2, y - 5);
        });
    },
    
    exportProgress: function() {
        const progress = StorageHelper.loadProgress() || {};
        const quizResults = StorageHelper.loadQuizResults() || {};
        const bookmarks = StorageHelper.loadBookmarks() || [];
        
        const data = {
            progress: progress,
            quizResults: quizResults,
            bookmarks: bookmarks,
            exportDate: new Date().toISOString()
        };
        
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = 'c-programming-progress.json';
        document.body.appendChild(a);
        a.click();
        
        // Clean up
        setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }, 100);
    },
    
    importProgress: function() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        
        input.onchange = e => {
            const file = e.target.files[0];
            const reader = new FileReader();
            
            reader.onload = event => {
                try {
                    const data = JSON.parse(event.target.result);
                    
                    // Import progress data
                    if (data.progress) {
                        StorageHelper.saveProgress(data.progress);
                    }
                    
                    // Import quiz results
                    if (data.quizResults) {
                        Object.keys(data.quizResults).forEach(quizId => {
                            StorageHelper.saveQuizResult(quizId, data.quizResults[quizId]);
                        });
                    }
                    
                    // Import bookmarks
                    if (data.bookmarks) {
                        StorageHelper.saveBookmarks(data.bookmarks);
                    }
                    
                    // Show notification
                    this.showNotification('Progress imported successfully!');
                    
                    // Refresh the page
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);
                } catch (error) {
                    console.error('Error importing progress:', error);
                    this.showNotification('Error importing progress file!');
                }
            };
            
            reader.readAsText(file);
        };
        
        input.click();
    },
    
    resetProgress: function() {
        if (confirm('Are you sure you want to reset all your progress? This cannot be undone.')) {
            // Clear all data
            StorageHelper.saveProgress({
                xp: 0,
                lessonsCompleted: [],
                quizzesTaken: [],
                projectsCompleted: [],
                badges: []
            });
            
            // Clear quiz results
            localStorage.removeItem('csite_quiz_scores');
            
            // Clear bookmarks
            localStorage.removeItem('csite_bookmarks');
            
            // Show notification
            this.showNotification('Progress has been reset successfully!');
            
            // Refresh the page
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        }
    },
    
    checkForBadges: function() {
        // Load progress
        let progress = StorageHelper.loadProgress() || {
            xp: 0,
            lessonsCompleted: [],
            quizzesTaken: [],
            projectsCompleted: [],
            badges: []
        };
        
        let badgesEarned = false;
        
        // Beginner badge - 100 XP
        if (progress.xp >= 100 && !progress.badges.includes('beginner')) {
            progress.badges.push('beginner');
            badgesEarned = true;
            this.showNotification('🎉 You earned the Beginner badge!');
        }
        
        // Pointer Master badge - completed pointer lessons
        if (progress.lessonsCompleted.includes('arrays') && !progress.badges.includes('pointer')) {
            progress.badges.push('pointer');
            badgesEarned = true;
            this.showNotification('🎯 You earned the Pointer Master badge!');
        }
        
        // Memory Guru badge - completed memory management lessons
        if (progress.lessonsCompleted.includes('memory') && !progress.badges.includes('memory')) {
            progress.badges.push('memory');
            badgesEarned = true;
            this.showNotification('🧠 You earned the Memory Guru badge!');
        }
        
        // File Expert badge - completed file handling lessons
        if (progress.lessonsCompleted.includes('files') && !progress.badges.includes('file')) {
            progress.badges.push('file');
            badgesEarned = true;
            this.showNotification('📁 You earned the File Expert badge!');
        }
        
        // Function Wizard badge - completed functions lessons
        if (progress.lessonsCompleted.includes('functions') && !progress.badges.includes('functions')) {
            progress.badges.push('functions');
            badgesEarned = true;
            this.showNotification('⚙️ You earned the Function Wizard badge!');
        }
        
        // Structure Specialist badge - completed structures lessons
        if (progress.lessonsCompleted.includes('structures') && !progress.badges.includes('structures')) {
            progress.badges.push('structures');
            badgesEarned = true;
            this.showNotification('🏗️ You earned the Structure Specialist badge!');
        }
        
        // Project Builder badge - completed 3 projects
        if (progress.projectsCompleted && progress.projectsCompleted.length >= 3 && !progress.badges.includes('projects')) {
            progress.badges.push('projects');
            badgesEarned = true;
            this.showNotification('🚀 You earned the Project Builder badge!');
        }
        
        // C Expert badge - level 10
        if (this.calculateLevel(progress.xp) >= 10 && !progress.badges.includes('expert')) {
            progress.badges.push('expert');
            badgesEarned = true;
            this.showNotification('👑 You earned the C Expert badge!');
        }
        
        // Save progress if badges were earned
        if (badgesEarned) {
            StorageHelper.saveProgress(progress);
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
    }
};