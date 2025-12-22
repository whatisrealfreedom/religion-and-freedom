// Chapter Reading Interactive Script

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all chapter features
    initReadingProgress();
    initThemeToggle();
    initBranchInteractions();
    initQuizSystem();
    initScrollEffects();
    initSidebarToggle();
});

// Reading Progress Tracking
function initReadingProgress() {
    const readingProgress = document.getElementById('readingProgress');
    const progressText = document.querySelector('.progress-text');
    const progressCircle = document.getElementById('progressCircle');
    const progressPercent = document.getElementById('progressPercent');

    function updateProgress() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;

        const clampedPercent = Math.min(100, Math.max(0, scrollPercent));

        readingProgress.style.width = `${clampedPercent}%`;
        progressText.textContent = `${Math.round(clampedPercent)}% مطالعه شده`;

        // Update circular progress
        const circumference = 2 * Math.PI * 50; // 2πr = 2π50
        const offset = circumference - (clampedPercent / 100) * circumference;
        progressCircle.style.strokeDashoffset = offset;
        progressPercent.textContent = Math.round(clampedPercent);
    }

    window.addEventListener('scroll', updateProgress);
    updateProgress(); // Initial call
}

// Theme Toggle for Chapters
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const currentTheme = localStorage.getItem('theme') || 'light';

    document.documentElement.setAttribute('data-theme', currentTheme);

    if (currentTheme === 'dark') {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);

        themeToggle.innerHTML = newTheme === 'dark'
            ? '<i class="fas fa-sun"></i>'
            : '<i class="fas fa-moon"></i>';
    });
}

// Interactive Freedom Tree Branches
function initBranchInteractions() {
    const branches = document.querySelectorAll('.branch');

    branches.forEach(branch => {
        branch.addEventListener('mouseenter', () => {
            // Highlight the branch
            branch.classList.add('active');

            // Show detailed explanation
            const freedomType = branch.dataset.freedom;
            showBranchTooltip(branch, freedomType);
        });

        branch.addEventListener('mouseleave', () => {
            branch.classList.remove('active');
            hideBranchTooltip();
        });

        branch.addEventListener('click', () => {
            // Toggle detailed view
            toggleBranchDetail(branch);
        });
    });
}

function showBranchTooltip(branch, freedomType) {
    // Remove existing tooltip
    hideBranchTooltip();

    const tooltip = document.createElement('div');
    tooltip.className = 'branch-tooltip';

    const tooltips = {
        'جسم': 'جسم تو ملک مطلق توست. هیچ‌کس حق دخالت فیزیکی ندارد.',
        'ذهن': 'ذهن و افکار تو ملک توست. آزادی بیان و باور مطلق.',
        'زمان': 'زمان زندگی تو ملک توست. حق انتخاب شغل و استراحت.',
        'دارایی': 'ثمره دسترنج تو ملک توست. بدون مالیات و مصادره.'
    };

    tooltip.innerHTML = `
        <div class="tooltip-content">
            <i class="fas fa-info-circle"></i>
            <p>${tooltips[freedomType]}</p>
        </div>
    `;

    document.body.appendChild(tooltip);

    // Position tooltip
    const rect = branch.getBoundingClientRect();
    tooltip.style.left = `${rect.left + rect.width / 2}px`;
    tooltip.style.top = `${rect.top - 10}px`;
    tooltip.style.transform = 'translateX(-50%) translateY(-100%)';
}

function hideBranchTooltip() {
    const tooltip = document.querySelector('.branch-tooltip');
    if (tooltip) {
        tooltip.remove();
    }
}

function toggleBranchDetail(branch) {
    const isExpanded = branch.classList.contains('expanded');

    // Close all other branches
    document.querySelectorAll('.branch.expanded').forEach(b => {
        if (b !== branch) {
            b.classList.remove('expanded');
        }
    });

    // Toggle current branch
    branch.classList.toggle('expanded');

    if (!isExpanded) {
        // Scroll branch into view
        branch.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

// Quiz System
function initQuizSystem() {
    const submitBtn = document.getElementById('submitQuiz');
    const resultDiv = document.getElementById('quizResult');

    if (!submitBtn) return;

    submitBtn.addEventListener('click', () => {
        const answers = {
            q1: document.querySelector('input[name="q1"]:checked')?.value,
            q2: document.querySelector('input[name="q2"]:checked')?.value
        };

        const correctAnswers = { q1: 'b', q2: 'b' };
        let score = 0;
        let totalQuestions = Object.keys(correctAnswers).length;

        Object.keys(correctAnswers).forEach(question => {
            if (answers[question] === correctAnswers[question]) {
                score++;
            }
        });

        const percentage = Math.round((score / totalQuestions) * 100);

        let resultHTML = `
            <div class="quiz-score">
                <div class="score-circle" style="--score: ${percentage}">
                    <span class="score-number">${percentage}%</span>
                    <span class="score-label">درست</span>
                </div>
                <h4>نتیجه آزمون</h4>
                <p>از ${totalQuestions} سوال، ${score} پاسخ درست داشتید.</p>
            </div>
        `;

        if (percentage >= 80) {
            resultHTML += `
                <div class="quiz-feedback success">
                    <i class="fas fa-trophy"></i>
                    <h5>عالی!</h5>
                    <p>فصل را به خوبی درک کرده‌اید. آماده فصل بعدی هستید.</p>
                </div>
            `;
        } else if (percentage >= 50) {
            resultHTML += `
                <div class="quiz-feedback warning">
                    <i class="fas fa-book"></i>
                    <h5>خوب</h5>
                    <p>فصل را مرور کنید و دوباره آزمون دهید.</p>
                </div>
            `;
        } else {
            resultHTML += `
                <div class="quiz-feedback error">
                    <i class="fas fa-redo"></i>
                    <h5>نیاز به مرور</h5>
                    <p>فصل را دوباره مطالعه کنید.</p>
                </div>
            `;
        }

        resultDiv.innerHTML = resultHTML;
        resultDiv.style.display = 'block';

        // Scroll to result
        resultDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
}

// Scroll Effects for Chapter
function initScrollEffects() {
    const sections = document.querySelectorAll('.content-section');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => observer.observe(section));

    // Highlight current section in sidebar
    const sidebarLinks = document.querySelectorAll('.sidebar-link[href^="#"]');

    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                const id = section.id;
                sidebarLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

// Sidebar Toggle for Mobile
function initSidebarToggle() {
    const sidebar = document.querySelector('.content-sidebar');
    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'sidebar-toggle';
    toggleBtn.innerHTML = '<i class="fas fa-bars"></i>';
    toggleBtn.style.display = 'none';

    // Add toggle button for mobile
    if (window.innerWidth <= 768) {
        const contentWrapper = document.querySelector('.content-wrapper');
        contentWrapper.parentNode.insertBefore(toggleBtn, contentWrapper);

        toggleBtn.style.display = 'block';
        sidebar.style.display = 'none';

        toggleBtn.addEventListener('click', () => {
            const isVisible = sidebar.style.display !== 'none';
            sidebar.style.display = isVisible ? 'none' : 'block';

            toggleBtn.innerHTML = isVisible
                ? '<i class="fas fa-bars"></i>'
                : '<i class="fas fa-times"></i>';
        });
    }

    window.addEventListener('resize', () => {
        if (window.innerWidth <= 768) {
            toggleBtn.style.display = 'block';
            sidebar.style.display = 'none';
        } else {
            toggleBtn.style.display = 'none';
            sidebar.style.display = 'block';
        }
    });
}

// Additional interactive features
function addInteractiveFeatures() {
    // Highlight important text on click
    document.querySelectorAll('.highlight-box').forEach(box => {
        box.addEventListener('click', () => {
            box.classList.toggle('highlighted');
        });
    });

    // Example tags interaction
    document.querySelectorAll('.example-tag').forEach(tag => {
        tag.addEventListener('click', () => {
            tag.classList.toggle('active');
        });
    });

    // Smooth scroll for sidebar links
    document.querySelectorAll('.sidebar-link[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Initialize additional features
addInteractiveFeatures();

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K: Toggle sidebar
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const sidebar = document.querySelector('.content-sidebar');
        if (sidebar) {
            sidebar.classList.toggle('hidden');
        }
    }

    // Space: Toggle theme
    if (e.code === 'Space' && !e.target.matches('input, textarea')) {
        e.preventDefault();
        document.getElementById('themeToggle')?.click();
    }
});

// Performance monitoring
function monitorReadingTime() {
    const startTime = Date.now();
    let lastScrollTime = Date.now();

    window.addEventListener('scroll', () => {
        lastScrollTime = Date.now();
    });

    // Track reading time every 30 seconds
    setInterval(() => {
        const currentTime = Date.now();
        const timeSinceLastScroll = currentTime - lastScrollTime;

        // If user hasn't scrolled for 5 minutes, consider session ended
        if (timeSinceLastScroll > 300000) {
            const totalReadingTime = Math.round((lastScrollTime - startTime) / 1000 / 60);
            console.log(`Reading session ended. Total reading time: ${totalReadingTime} minutes`);

            // Here you could send this data to analytics
        }
    }, 30000);
}

monitorReadingTime();

