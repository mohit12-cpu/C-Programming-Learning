// Storage helper module for consistent localStorage management

const STORAGE_KEYS = {
    USER_DATA: 'cProgrammingUserData',
    PROGRESS: 'csite_progress',
    QUIZ_SCORES: 'csite_quiz_scores',
    BOOKMARKS: 'csite_bookmarks',
    SNIPPETS: 'csite_snippets',
    FLASHCARDS: 'csite_flashcards'
};

class StorageHelper {
    // Save user data
    static saveUserData(data) {
        try {
            localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(data));
            return true;
        } catch (error) {
            console.error('Failed to save user data:', error);
            return false;
        }
    }
    
    // Load user data
    static loadUserData() {
        try {
            const data = localStorage.getItem(STORAGE_KEYS.USER_DATA);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error('Failed to load user data:', error);
            return null;
        }
    }
    
    // Save progress data
    static saveProgress(data) {
        try {
            localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(data));
            return true;
        } catch (error) {
            console.error('Failed to save progress data:', error);
            return false;
        }
    }
    
    // Load progress data
    static loadProgress() {
        try {
            const data = localStorage.getItem(STORAGE_KEYS.PROGRESS);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error('Failed to load progress data:', error);
            return null;
        }
    }
    
    // Save quiz results
    static saveQuizResult(quizId, score) {
        try {
            const quizData = this.loadQuizResults() || {};
            quizData[quizId] = score;
            localStorage.setItem(STORAGE_KEYS.QUIZ_SCORES, JSON.stringify(quizData));
            return true;
        } catch (error) {
            console.error('Failed to save quiz result:', error);
            return false;
        }
    }
    
    // Load quiz results
    static loadQuizResults() {
        try {
            const data = localStorage.getItem(STORAGE_KEYS.QUIZ_SCORES);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error('Failed to load quiz results:', error);
            return null;
        }
    }
    
    // Save bookmarks
    static saveBookmarks(bookmarks) {
        try {
            localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(bookmarks));
            return true;
        } catch (error) {
            console.error('Failed to save bookmarks:', error);
            return false;
        }
    }
    
    // Load bookmarks
    static loadBookmarks() {
        try {
            const data = localStorage.getItem(STORAGE_KEYS.BOOKMARKS);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error('Failed to load bookmarks:', error);
            return null;
        }
    }
    
    // Save snippets
    static saveSnippets(snippets) {
        try {
            localStorage.setItem(STORAGE_KEYS.SNIPPETS, JSON.stringify(snippets));
            return true;
        } catch (error) {
            console.error('Failed to save snippets:', error);
            return false;
        }
    }
    
    // Load snippets
    static loadSnippets() {
        try {
            const data = localStorage.getItem(STORAGE_KEYS.SNIPPETS);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error('Failed to load snippets:', error);
            return null;
        }
    }
    
    // Save flashcards
    static saveFlashcards(flashcards) {
        try {
            localStorage.setItem(STORAGE_KEYS.FLASHCARDS, JSON.stringify(flashcards));
            return true;
        } catch (error) {
            console.error('Failed to save flashcards:', error);
            return false;
        }
    }
    
    // Load flashcards
    static loadFlashcards() {
        try {
            const data = localStorage.getItem(STORAGE_KEYS.FLASHCARDS);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error('Failed to load flashcards:', error);
            return null;
        }
    }
    
    // Clear all data
    static clearAll() {
        try {
            Object.values(STORAGE_KEYS).forEach(key => {
                localStorage.removeItem(key);
            });
            return true;
        } catch (error) {
            console.error('Failed to clear storage:', error);
            return false;
        }
    }
}

// Export the storage helper
window.StorageHelper = StorageHelper;