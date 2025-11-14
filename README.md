# C Programming Learning Website

A comprehensive frontend-only C programming learning platform with interactive lessons, coding challenges, and visualization tools.

## Features

- **Interactive Lessons**: Step-by-step tutorials on C programming concepts
- **Code Editor**: In-browser C code editor with syntax highlighting and simulation
- **Memory Visualizer**: Interactive visualization of pointers and memory allocation
- **Quizzes**: Test your knowledge with module-specific quizzes
- **Coding Challenges**: Practice problems with automated evaluation
- **Flashcards**: Spaced repetition system for memorizing key concepts
- **Interview Prep**: Theory questions and coding challenges for job interviews
- **Progress Tracking**: XP-based system with badges and certificates
- **Offline Support**: Works locally without any backend requirements

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Edge, Safari)
- No backend or server required - everything runs in the browser

### Running the Application

Simply open `index.html` in your web browser to start using the application immediately.

Alternatively, you can serve the directory with any local server:

#### Using Python (Recommended)
```bash
# Navigate to the project directory
cd "Front-End Coding Learning"

# Start a local server (Python 3)
python -m http.server 8000

# Or for Python 2
python -m SimpleHTTPServer 8000
```

Then open your browser to `http://localhost:8000`

#### Using Node.js
```bash
# Install http-server globally (if not already installed)
npm install -g http-server

# Navigate to the project directory
cd "Front-End Coding Learning"

# Start the server
http-server
```

### Project Structure

```
Front-End Coding Learning/
├── css/
│   └── style.css          # Main stylesheet
├── data/
│   ├── curriculum.json    # Full curriculum content
│   ├── challenges.json    # Practice challenges
│   ├── lessons.json       # Lesson content
│   ├── projects.json      # Project examples
│   └── quizzes.json       # Quiz questions
├── js/
│   ├── views/             # View controllers for each feature
│   │   ├── editor.js      # Code editor functionality
│   │   ├── flashcards.js  # Flashcard system
│   │   ├── home.js        # Home page
│   │   ├── interview.js   # Interview preparation
│   │   ├── lessons.js     # Lesson viewer
│   │   ├── progress.js    # Progress tracking
│   │   ├── projects.js    # Project hub
│   │   ├── quizzes.js     # Quiz engine
│   │   ├── simulator.js   # Memory simulator
│   │   ├── visualizer.js  # Pointer visualizer
│   │   └── challenges.js  # Coding challenges
│   ├── main.js            # Main application logic
│   ├── router.js          # SPA router
│   ├── storage.js         # LocalStorage management
│   └── theme.js           # Theme switching
├── index.html             # Main HTML file
└── README.md              # This file
```

## Features Overview

### 1. Interactive Lessons
- Structured curriculum from basics to advanced topics
- Code examples with copy/download functionality
- Progress tracking and bookmarks

### 2. Code Editor
- Syntax highlighting with Prism.js
- Code simulation (no actual compilation)
- Static code analysis for common mistakes
- Example snippet library

### 3. Memory Visualizer
- Interactive visualization of pointers and memory
- Step-by-step execution of pointer operations
- Demos for common memory concepts

### 4. Practice Challenges
- Problem bank with difficulty levels
- Automated evaluation (frontend simulation)
- Hints and solutions available

### 5. Flashcards
- Spaced repetition algorithm for effective learning
- Custom deck creation
- Review scheduling

### 6. Interview Prep
- Theory questions with answers
- Coding challenges
- Mock interview mode

### 7. Progress Tracking
- XP-based progression system
- Badges for achievements
- Progress charts and statistics

## Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Libraries**: 
  - Prism.js for syntax highlighting
  - No framework dependencies (Vanilla JS)
- **Storage**: localStorage for data persistence
- **No Backend**: Completely frontend-only application

## Curriculum Modules

1. **Getting Started** - Environment setup and basics
2. **Basics** - Variables, data types, operators, I/O
3. **Control Flow** - Conditionals, loops, branching
4. **Functions** - Modularity, scope, recursion
5. **Arrays & Strings** - Data structures
6. **Pointers & Memory** - Pointers, dynamic allocation
7. **Structures** - User-defined types
8. **File I/O** - Reading and writing files
9. **Advanced Topics** - Preprocessor, advanced features
10. **Systems Programming** - Introduction to systems concepts

## Contributing

This is an educational project. Feel free to:
- Report issues
- Suggest new features
- Add more lessons or challenges
- Improve existing content

## License

This project is for educational purposes. All content is freely available for learning.

## Support

For questions or issues, please open an issue in the repository.