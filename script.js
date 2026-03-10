/* --- Toggle Menu --- */
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

/* --- Scroll Active Links --- */
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        };
    });

    /* --- Sticky Header --- */
    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);

    /* --- Remove menu icon when scrolling --- */
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};

/* --- Typed JS Animation --- */
const typed = new Typed('.multiple-text', {
    strings: ['Frontend Developer', 'UI/UX Designer', 'Web Animator'],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});

/* --- ScrollReveal Interactions --- */
ScrollReveal({
    distance: '80px',
    duration: 2000,
    delay: 200
});

ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.home-img, .works-container, .journey-container, .contact form', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1, .about-img', { origin: 'left' });
ScrollReveal().reveal('.home-content p, .about-content', { origin: 'right' });

/* --- 3D Illusion Tilt Effect for Journey Box --- */
const journeyBox = document.querySelector('.journey-box');
if (journeyBox) {
    journeyBox.addEventListener('mousemove', (e) => {
        const { left, top, width, height } = journeyBox.getBoundingClientRect();
        const x = (e.clientX - left) / width;
        const y = (e.clientY - top) / height;

        const tiltX = (y - 0.5) * 20; // max tilt 10deg
        const tiltY = (x - 0.5) * -20;

        journeyBox.style.transform = `translateY(-15px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.02)`;
    });

    journeyBox.addEventListener('mouseleave', () => {
        journeyBox.style.transform = `translateY(0) rotateX(0) rotateY(0) scale(1)`;
    });
}

/* --- AI Chat Widget --- */
const chatToggle = document.getElementById('chat-toggle');
const chatBox = document.getElementById('chat-box');
const chatClose = document.getElementById('chat-close');
const chatMessages = document.getElementById('chat-messages');
const chatInput = document.getElementById('chat-input');
const chatSend = document.getElementById('chat-send');

// Open/Close chat
chatToggle.addEventListener('click', () => {
    chatBox.classList.add('active');
});

chatClose.addEventListener('click', () => {
    chatBox.classList.remove('active');
});

// AI Knowledge Base
const aiResponses = {
    // Portfolio Context
    "skills": "I specialize in modern web technologies including HTML5, CSS3, JavaScript, HTML Canvas, and GSAP animations. I love building glassmorphism UIs!",
    "projects": "You can check out my works in the 'Works' section above. I've built E-commerce apps, Dashboard UIs, and Mobile Apps.",
    "contact": "You can reach out to me via the contact form at the bottom of the page, or connect with me on LinkedIn and GitHub!",
    "experience": "I have extensive experience crafting premium, highly interactive frontend experiences with a keen eye for dark luxury aesthetics and micro-animations.",

    // Greetings & Small Talk
    "hi": "Hello! I am an advanced AI assistant powered by Abhijin's algorithms. How can I help you today?",
    "hello": "Hi there! I am an intelligent virtual assistant here to chat about Abhijin's work, programming languages, or technology in general.",
    "hey": "Hey! What's on your mind? Ask me about web development, AI, or Abhijin's portfolio.",
    "who are you": "I am an AI assistant designed to represent Abhijin K M. I have knowledge regarding web development, numerous programming languages, and tech topics.",
    "how are you": "I'm just a few lines of code, but I'm functioning perfectly! How can I assist you?",

    // Web Technologies
    "html": "HTML (HyperText Markup Language) is the standard markup language for documents designed to be displayed in a web browser. It's the skeleton of the web!",
    "css": "CSS (Cascading Style Sheets) is a style sheet language used for describing the presentation of a document written in HTML. It's what makes this portfolio look so premium and beautiful.",
    "javascript": "JavaScript is a powerful, high-level, interpreted programming language. It is the core technology of the World Wide Web alongside HTML and CSS, adding interactivity to web pages.",
    "js": "JavaScript is my native language! It powers the interactivity of this website and allows me to talk to you.",
    "react": "React is a free and open-source front-end JavaScript library for building user interfaces based on UI components. It's maintained by Meta (Facebook).",
    "angular": "Angular is a TypeScript-based open-source web application framework led by the Angular Team at Google.",
    "vue": "Vue.js is an open-source model–view–viewmodel front end JavaScript framework for building user interfaces and single-page applications.",
    "node": "Node.js is an open-source, cross-platform, back-end JavaScript runtime environment that runs on the V8 engine and executes JavaScript code outside a web browser.",

    // Backend & General Programming Languages
    "python": "Python is a high-level, general-purpose programming language. Its design philosophy emphasizes code readability. It is heavily used in AI, Data Science, and backend development.",
    "java": "Java is a popular high-level, class-based, object-oriented programming language. It is widely used for enterprise applications and Android development.",
    "c++": "C++ is a high-level, general-purpose programming language created by Bjarne Stroustrup. It is widely used in high-performance applications, game engines, and system software.",
    "c#": "C# is a modern, object-oriented, and type-safe programming language developed by Microsoft as part of its .NET initiative.",
    "php": "PHP is a general-purpose scripting language geared toward web development. Despite all the modern alternatives, it still powers a massive portion of the web (like WordPress)!",
    "ruby": "Ruby is an interpreted, high-level, general-purpose programming language. It is most famous for the Ruby on Rails framework.",
    "go": "Go (or Golang) is a statically typed, compiled programming language designed at Google. It's known for its concurrency mechanisms and fast performance.",
    "rust": "Rust is a multi-paradigm, general-purpose programming language that emphasizes performance, type safety, and memory safety without a garbage collector.",
    "swift": "Swift is a general-purpose, multi-paradigm, compiled programming language developed by Apple Inc. for iOS, iPadOS, macOS, watchOS, tvOS.",
    "kotlin": "Kotlin is a cross-platform, statically typed, general-purpose programming language with type inference. It's Google's preferred language for Android app development.",
    "sql": "SQL (Structured Query Language) is a domain-specific language used in programming and designed for managing data held in a relational database management system.",

    // Tools & Concepts
    "git": "Git is a distributed version control system that tracks changes in any set of computer files, usually used for coordinating work among programmers collaboratively.",
    "github": "GitHub is a provider of Internet hosting for software development and version control using Git. You can check out Abhijin's GitHub from the social links!",
    "ai": "Artificial Intelligence involves machines simulating human intelligence. It is a massive field including machine learning, neural networks, natural language processing, and more. Speaking of which, I am a simple form of AI myself!",
    "machine learning": "Machine learning is a field of inquiry devoted to understanding and building methods that 'learn', using data to improve performance on some set of tasks.",

    // Default Fallback
    "default": "While I am processing lots of knowledge, I didn't quite catch that! I know a lot about major programming languages (Python, Java, C++, JS, Rust, Go, etc.) and web technologies. What would you like to know?"
};

function addMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', sender === 'user' ? 'user-message' : 'ai-message');
    msgDiv.textContent = text;
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.classList.add('message', 'ai-message', 'typing-indicator');
    typingDiv.id = 'typing-indicator';
    typingDiv.innerHTML = '<span></span><span></span><span></span>';
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function removeTypingIndicator() {
    const indicator = document.getElementById('typing-indicator');
    if (indicator) indicator.remove();
}

function getAiResponse(userMessage) {
    const lowerCaseMsg = userMessage.toLowerCase();

    // Advanced keyword processing
    // First, check for exact matches or partial word matches
    let bestMatch = "default";
    for (const [key, response] of Object.entries(aiResponses)) {
        // If the user's message contains the keyword as an isolated word or exact phrase
        // Escape special characters so languages like "C++" don't crash the RegExp
        const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`\\b${escapedKey}\\b`, 'i');
        if (regex.test(lowerCaseMsg)) {
            bestMatch = key;
            break;
        }
    }

    // If no word boundary match, do a simple includes check (fallback for partials)
    if (bestMatch === "default") {
        for (const [key, response] of Object.entries(aiResponses)) {
            if (lowerCaseMsg.includes(key)) {
                bestMatch = key;
                break;
            }
        }
    }

    return aiResponses[bestMatch];
}

function handleSend() {
    const message = chatInput.value.trim();
    if (message === '') return;

    // 1. Add User Message
    addMessage(message, 'user');
    chatInput.value = '';

    // 2. Show Thinking/Typing Indicator
    showTypingIndicator();

    // 3. Simulate "Deep AI Thinking" delay (longer delay for realism)
    const thinkingDelay = Math.floor(Math.random() * (2500 - 1500 + 1) + 1500); // Between 1.5s and 2.5s

    setTimeout(() => {
        removeTypingIndicator();
        const reply = getAiResponse(message);
        addMessage(reply, 'ai');
    }, thinkingDelay);
}

chatSend.addEventListener('click', handleSend);

chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSend();
});
