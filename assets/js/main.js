document.addEventListener('DOMContentLoaded', () => {
    // Set current year in footer
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
    
    // Mobile Nav Toggle
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
        
        // Close menu when a link is clicked
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }

    // Dark Mode Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    
    // Check for saved user preference, if any, on load of the website
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        htmlElement.setAttribute('data-theme', 'dark');
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }

    // Scroll Spy
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -50% 0px', // Trigger when section is near top/center
        threshold: 0
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove active class from all links
                navLinks.forEach(link => link.classList.remove('active'));
                
                // Add active class to corresponding link
                const id = entry.target.getAttribute('id');
                const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        observer.observe(section);
    });

    // Dev Mode Terminal Logic
    const terminalToggle = document.getElementById('terminal-toggle');
    const terminalOverlay = document.getElementById('terminal-overlay');
    const terminalClose = document.getElementById('terminal-close');
    const terminalInput = document.getElementById('terminal-input');
    const terminalOutput = document.getElementById('terminal-output');

    if (terminalToggle && terminalOverlay && terminalClose && terminalInput && terminalOutput) {
        
        // Toggle Terminal
        const toggleTerminal = () => {
            terminalOverlay.classList.toggle('hidden');
            if (!terminalOverlay.classList.contains('hidden')) {
                terminalInput.focus();
            }
        };

        terminalToggle.addEventListener('click', toggleTerminal);
        terminalClose.addEventListener('click', toggleTerminal);

        // Close on outside click
        terminalOverlay.addEventListener('click', (e) => {
            if (e.target === terminalOverlay) {
                toggleTerminal();
            }
        });

        // Command processing
        const commands = {
            help: "Available commands: <span class='cmd-highlight'>about</span>, <span class='cmd-highlight'>skills</span>, <span class='cmd-highlight'>contact</span>, <span class='cmd-highlight'>projects</span>, <span class='cmd-highlight'>clear</span>, <span class='cmd-highlight'>exit</span>",
            about: "I am a Backend Engineer obsessed with system architecture, data integrity, and production readiness.",
            skills: "Python, FastAPI, PostgreSQL, Docker, Linux, System Design, REST APIs.",
            contact: "Email: nyangaufredrick443@gmail.com | LinkedIn: /in/fredricknyangau | GitHub: @fredricknyangau",
            projects: "Check out the 'Projects' section to see my work on Wi-Fi Billing systems and Livestock Management.",
            exit: "Closing terminal..."
        };

        terminalInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const input = terminalInput.value.trim().toLowerCase();
                
                // Add input line
                const inputLine = document.createElement('div');
                inputLine.className = 'terminal-line';
                inputLine.innerHTML = `<span class="prompt">fred@portfolio:~$</span> ${input}`;
                terminalOutput.appendChild(inputLine);

                // Process command
                if (input) {
                    const responseLine = document.createElement('div');
                    responseLine.className = 'terminal-line';
                    
                    if (input === 'clear') {
                        terminalOutput.innerHTML = '';
                    } else if (input === 'exit') {
                        responseLine.textContent = commands.exit;
                        terminalOutput.appendChild(responseLine);
                        setTimeout(toggleTerminal, 1000);
                    } else if (commands[input]) {
                        responseLine.innerHTML = commands[input];
                        terminalOutput.appendChild(responseLine);
                    } else {
                        responseLine.textContent = `Command not found: ${input}. Type 'help' for available commands.`;
                        terminalOutput.appendChild(responseLine);
                    }
                }

                // Clear input and scroll to bottom
                terminalInput.value = '';
                terminalOutput.scrollTop = terminalOutput.scrollHeight;
            }
        });
    }

    // Live Status Widget Logic
    const statusPing = document.getElementById('status-ping-bento');
    if (statusPing) {
        setInterval(() => {
            const ping = Math.floor(Math.random() * (60 - 20 + 1)) + 20;
            statusPing.textContent = `Ping: ${ping}ms`;
        }, 3000);
    }

    // cURL Copy Logic
    const copyBtn = document.getElementById('copy-curl');
    const curlCode = document.getElementById('curl-code');
    
    if (copyBtn && curlCode) {
        copyBtn.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(curlCode.textContent.trim());
                
                // Visual feedback
                const originalIcon = copyBtn.innerHTML;
                copyBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
                copyBtn.style.color = '#10b981';
                
                setTimeout(() => {
                    copyBtn.innerHTML = originalIcon;
                    copyBtn.style.color = '';
                }, 2000);
            } catch (err) {
                console.error('Failed to copy!', err);
            }
        });
    }

    // Spotlight Effect logic
    const cards = document.querySelectorAll('.project-card, .experience-card, .leadership-card, .skill-category');
    
    document.addEventListener('mousemove', (e) => {
        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    console.log('Backend Engineer Portfolio loaded');
});
