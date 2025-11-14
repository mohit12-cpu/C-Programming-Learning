// Flashcards View Controller
window.viewControllers = window.viewControllers || {};

window.viewControllers['flashcards'] = {
    init: function(params) {
        console.log('Initializing Flashcards view');
        this.render();
        this.bindEvents();
    },
    
    destroy: function() {
        console.log('Destroying Flashcards view');
        // Clean up any event listeners or resources
    },
    
    render: function() {
        const app = document.getElementById('app');
        app.innerHTML = `
            <div class="page flashcards-page active">
                <div class="container">
                    <h2>Flashcards & Spaced Repetition</h2>
                    <div class="flashcards-container">
                        <div class="controls">
                            <button class="btn btn-primary" id="createDeck">Create New Deck</button>
                            <button class="btn btn-outline" id="reviewCards">Review Cards</button>
                            <select id="deckSelector">
                                <option value="">Select a Deck</option>
                                <!-- Decks will be populated here -->
                            </select>
                        </div>
                        <div class="deck-builder" id="deckBuilder" style="display: none;">
                            <h3>Create New Deck</h3>
                            <div class="form-group">
                                <label for="deckName">Deck Name:</label>
                                <input type="text" id="deckName" placeholder="Enter deck name">
                            </div>
                            <div class="form-group">
                                <label for="cardFront">Front of Card:</label>
                                <textarea id="cardFront" placeholder="Enter front of card"></textarea>
                            </div>
                            <div class="form-group">
                                <label for="cardBack">Back of Card:</label>
                                <textarea id="cardBack" placeholder="Enter back of card"></textarea>
                            </div>
                            <button class="btn btn-primary" id="addCard">Add Card</button>
                            <button class="btn btn-outline" id="saveDeck">Save Deck</button>
                        </div>
                        <div class="review-area" id="reviewArea" style="display: none;">
                            <h3>Review Flashcards</h3>
                            <div class="flashcard" id="flashcard">
                                <div class="flashcard-content" id="flashcardContent">
                                    Select a deck to start reviewing
                                </div>
                                <div class="flashcard-actions">
                                    <button class="btn btn-outline" id="prevCard">Previous</button>
                                    <button class="btn btn-outline" id="flipCard">Flip</button>
                                    <button class="btn btn-outline" id="nextCard">Next</button>
                                </div>
                                <div class="review-buttons">
                                    <button class="btn btn-danger" id="hardButton">Hard</button>
                                    <button class="btn btn-warning" id="mediumButton">Medium</button>
                                    <button class="btn btn-success" id="easyButton">Easy</button>
                                </div>
                            </div>
                        </div>
                        <div class="deck-list" id="deckList">
                            <h3>Your Decks</h3>
                            <div class="decks-grid" id="decksGrid">
                                <!-- Decks will be populated here -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        this.loadDecks();
        this.populateDeckSelector();
    },
    
    bindEvents: function() {
        // Add event listeners
        document.getElementById('createDeck').addEventListener('click', () => this.showDeckBuilder());
        document.getElementById('reviewCards').addEventListener('click', () => this.showReviewArea());
        document.getElementById('addCard').addEventListener('click', () => this.addCard());
        document.getElementById('saveDeck').addEventListener('click', () => this.saveDeck());
        document.getElementById('flipCard').addEventListener('click', () => this.flipCard());
        document.getElementById('prevCard').addEventListener('click', () => this.prevCard());
        document.getElementById('nextCard').addEventListener('click', () => this.nextCard());
        document.getElementById('hardButton').addEventListener('click', () => this.rateCard('hard'));
        document.getElementById('mediumButton').addEventListener('click', () => this.rateCard('medium'));
        document.getElementById('easyButton').addEventListener('click', () => this.rateCard('easy'));
        document.getElementById('deckSelector').addEventListener('change', (e) => {
            this.selectDeck(e.target.value);
        });
    },
    
    // Load decks from localStorage
    loadDecks: function() {
        try {
            const decks = JSON.parse(localStorage.getItem('csite_flashcards')) || {};
            this.decks = decks;
            this.populateDeckList();
            return decks;
        } catch (error) {
            console.error('Error loading decks:', error);
            this.decks = {};
            return {};
        }
    },
    
    // Save decks to localStorage
    saveDecks: function() {
        try {
            localStorage.setItem('csite_flashcards', JSON.stringify(this.decks));
            this.populateDeckSelector();
            this.populateDeckList();
            return true;
        } catch (error) {
            console.error('Error saving decks:', error);
            return false;
        }
    },
    
    // Populate deck selector dropdown
    populateDeckSelector: function() {
        const selector = document.getElementById('deckSelector');
        selector.innerHTML = '<option value="">Select a Deck</option>';
        
        for (const deckId in this.decks) {
            const option = document.createElement('option');
            option.value = deckId;
            option.textContent = this.decks[deckId].name;
            selector.appendChild(option);
        }
    },
    
    // Populate deck list
    populateDeckList: function() {
        const grid = document.getElementById('decksGrid');
        grid.innerHTML = '';
        
        for (const deckId in this.decks) {
            const deck = this.decks[deckId];
            const deckElement = document.createElement('div');
            deckElement.className = 'deck-card';
            deckElement.innerHTML = `
                <h4>${deck.name}</h4>
                <p>${deck.cards.length} cards</p>
                <button class="btn btn-primary" onclick="window.viewControllers['flashcards'].selectDeck('${deckId}')">Review</button>
                <button class="btn btn-outline" onclick="window.viewControllers['flashcards'].editDeck('${deckId}')">Edit</button>
                <button class="btn btn-danger" onclick="window.viewControllers['flashcards'].deleteDeck('${deckId}')">Delete</button>
            `;
            grid.appendChild(deckElement);
        }
    },
    
    // Show deck builder
    showDeckBuilder: function() {
        document.getElementById('deckBuilder').style.display = 'block';
        document.getElementById('reviewArea').style.display = 'none';
        document.getElementById('deckName').value = '';
        document.getElementById('cardFront').value = '';
        document.getElementById('cardBack').value = '';
        this.currentDeck = {
            name: '',
            cards: []
        };
    },
    
    // Show review area
    showReviewArea: function() {
        document.getElementById('deckBuilder').style.display = 'none';
        document.getElementById('reviewArea').style.display = 'block';
    },
    
    // Add card to current deck
    addCard: function() {
        const front = document.getElementById('cardFront').value.trim();
        const back = document.getElementById('cardBack').value.trim();
        
        if (!front || !back) {
            alert('Please enter both front and back of the card');
            return;
        }
        
        this.currentDeck.cards.push({
            front: front,
            back: back,
            createdAt: new Date().toISOString(),
            nextReview: new Date().toISOString(),
            interval: 1, // days until next review
            ease: 2.5, // ease factor
            reviewCount: 0
        });
        
        // Clear inputs
        document.getElementById('cardFront').value = '';
        document.getElementById('cardBack').value = '';
        
        alert('Card added successfully!');
    },
    
    // Save current deck
    saveDeck: function() {
        const name = document.getElementById('deckName').value.trim();
        
        if (!name) {
            alert('Please enter a deck name');
            return;
        }
        
        if (this.currentDeck.cards.length === 0) {
            alert('Please add at least one card to the deck');
            return;
        }
        
        this.currentDeck.name = name;
        
        // Generate deck ID if not exists
        if (!this.currentDeck.id) {
            this.currentDeck.id = 'deck_' + Date.now();
        }
        
        this.decks[this.currentDeck.id] = this.currentDeck;
        this.saveDecks();
        
        document.getElementById('deckBuilder').style.display = 'none';
        alert('Deck saved successfully!');
    },
    
    // Select a deck for review
    selectDeck: function(deckId) {
        if (!deckId || !this.decks[deckId]) {
            alert('Please select a valid deck');
            return;
        }
        
        this.currentDeck = this.decks[deckId];
        this.currentCardIndex = 0;
        this.isFlipped = false;
        
        this.showReviewArea();
        this.showCurrentCard();
        
        // Update deck selector
        document.getElementById('deckSelector').value = deckId;
    },
    
    // Show current card
    showCurrentCard: function() {
        if (!this.currentDeck || this.currentDeck.cards.length === 0) {
            document.getElementById('flashcardContent').textContent = 'No cards in this deck';
            return;
        }
        
        const card = this.currentDeck.cards[this.currentCardIndex];
        const content = document.getElementById('flashcardContent');
        
        if (this.isFlipped) {
            content.innerHTML = `<div class="card-back">${card.back}</div>`;
        } else {
            content.innerHTML = `<div class="card-front">${card.front}</div>`;
        }
    },
    
    // Flip current card
    flipCard: function() {
        this.isFlipped = !this.isFlipped;
        this.showCurrentCard();
    },
    
    // Show previous card
    prevCard: function() {
        if (!this.currentDeck || this.currentCardIndex <= 0) return;
        
        this.currentCardIndex--;
        this.isFlipped = false;
        this.showCurrentCard();
    },
    
    // Show next card
    nextCard: function() {
        if (!this.currentDeck || this.currentCardIndex >= this.currentDeck.cards.length - 1) return;
        
        this.currentCardIndex++;
        this.isFlipped = false;
        this.showCurrentCard();
    },
    
    // Rate current card (spaced repetition algorithm)
    rateCard: function(rating) {
        if (!this.currentDeck) return;
        
        const card = this.currentDeck.cards[this.currentCardIndex];
        const now = new Date();
        
        // Simple spaced repetition algorithm
        switch(rating) {
            case 'hard':
                card.interval = 1; // Review again tomorrow
                card.ease = Math.max(1.3, card.ease - 0.2);
                break;
            case 'medium':
                card.interval = Math.max(1, Math.round(card.interval * card.ease));
                break;
            case 'easy':
                card.interval = Math.max(1, Math.round(card.interval * card.ease * 1.3));
                card.ease = Math.min(3.0, card.ease + 0.1);
                break;
        }
        
        // Set next review date
        const nextReview = new Date(now);
        nextReview.setDate(now.getDate() + card.interval);
        card.nextReview = nextReview.toISOString();
        card.reviewCount++;
        
        // Save updated deck
        this.decks[this.currentDeck.id] = this.currentDeck;
        this.saveDecks();
        
        // Move to next card or finish review
        if (this.currentCardIndex < this.currentDeck.cards.length - 1) {
            this.nextCard();
        } else {
            alert('Review complete! Great job!');
            this.showDeckList();
        }
    },
    
    // Edit a deck
    editDeck: function(deckId) {
        if (!deckId || !this.decks[deckId]) return;
        
        this.currentDeck = JSON.parse(JSON.stringify(this.decks[deckId])); // Deep copy
        document.getElementById('deckName').value = this.currentDeck.name;
        document.getElementById('deckBuilder').style.display = 'block';
        document.getElementById('reviewArea').style.display = 'none';
    },
    
    // Delete a deck
    deleteDeck: function(deckId) {
        if (!deckId || !this.decks[deckId]) return;
        
        if (confirm('Are you sure you want to delete this deck?')) {
            delete this.decks[deckId];
            this.saveDecks();
        }
    },
    
    // Show deck list
    showDeckList: function() {
        document.getElementById('deckBuilder').style.display = 'none';
        document.getElementById('reviewArea').style.display = 'none';
    }
};