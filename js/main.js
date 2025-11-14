// Main Application Logic
class CProgrammingApp {
    constructor() {
        this.userData = this.loadUserData();
        this.currentPage = 'home';
        this.lessons = {};
        this.quizzes = {};
        this.projects = {};
        this.challenges = {};
        this.curriculum = {};
        this.eventListeners = [];
        this.init();
    }

    init() {
        // Load data
        this.loadLessons();
        this.loadQuizzes();
        this.loadProjects();
        this.loadChallenges();
        this.loadCurriculum();
        
        // Make app globally accessible
        window.app = this;
    }

    // Load user data from localStorage
    loadUserData() {
        const data = StorageHelper.loadUserData();
        return data || {
            xp: 0,
            level: 1,
            lessonsCompleted: [],
            quizzesTaken: [],
            badges: [],
            streak: 0,
            lastVisit: null,
            bookmarkedLessons: [],
            bookmarkedCode: []
        };
    }

    // Load lessons data
    loadLessons() {
        // Load lessons from JSON file
        fetch('data/lessons.json')
            .then(response => response.json())
            .then(data => {
                this.lessons = data;
                // Dispatch event to notify search system of content updates
                document.dispatchEvent(new CustomEvent('contentUpdated'));
            })
            .catch(error => {
                console.error('Error loading lessons:', error);
            });
    }

    // Load quizzes data
    loadQuizzes() {
        // Load quizzes from JSON file
        fetch('data/quizzes.json')
            .then(response => response.json())
            .then(data => {
                this.quizzes = data;
                // Dispatch event to notify search system of content updates
                document.dispatchEvent(new CustomEvent('contentUpdated'));
            })
            .catch(error => {
                console.error('Error loading quizzes:', error);
            });
    }

    // Load projects data
    loadProjects() {
        // Load projects from JSON file
        fetch('data/projects.json')
            .then(response => response.json())
            .then(data => {
                this.projects = data;
                // Dispatch event to notify search system of content updates
                document.dispatchEvent(new CustomEvent('contentUpdated'));
            })
            .catch(error => {
                console.error('Error loading projects:', error);
            });
    }

    // Load challenges data
    loadChallenges() {
        // Load challenges from JSON file
        fetch('data/challenges.json')
            .then(response => response.json())
            .then(data => {
                this.challenges = data.challenges || data;
                // Dispatch event to notify search system of content updates
                document.dispatchEvent(new CustomEvent('contentUpdated'));
            })
            .catch(error => {
                console.error('Error loading challenges:', error);
            });
    }

    // Load curriculum data
    loadCurriculum() {
        // Load curriculum from JSON file
        fetch('data/curriculum.json')
            .then(response => response.json())
            .then(data => {
                this.curriculum = data;
                // Dispatch event to notify search system of content updates
                document.dispatchEvent(new CustomEvent('contentUpdated'));
            })
            .catch(error => {
                console.error('Error loading curriculum:', error);
            });
    }

    // Helper function to add event listeners that can be removed later
    addEventListener(element, event, handler) {
        element.addEventListener(event, handler);
        this.eventListeners.push({element, event, handler});
    }
    
    // Helper function to remove all event listeners
    removeAllEventListeners() {
        this.eventListeners.forEach(({element, event, handler}) => {
            element.removeEventListener(event, handler);
        });
        this.eventListeners = [];
    }
    
    // Destroy method to clean up when navigating away from a view
    destroy() {
        this.removeAllEventListeners();
    }

    // Save user data to localStorage
    saveUserData() {
        StorageHelper.saveUserData(this.userData);
    }

    // Update user XP and level
    updateUserXP(xpGain) {
        this.userData.xp += xpGain;
        const newLevel = Math.floor(this.userData.xp / 100) + 1;
        
        if (newLevel > this.userData.level) {
            this.userData.level = newLevel;
            this.showNotification(`Congratulations! You've reached level ${newLevel}!`);
        }
        
        this.saveUserData();
    }

    // Show notification
    showNotification(message) {
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
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new CProgrammingApp();
});