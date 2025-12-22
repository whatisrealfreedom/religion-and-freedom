// Modern Freedom Journey Interactive Script

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initTheme();
    initScrollEffects();
    initHeroAnimations();
    initJourneyProgress();
    initChapterInteractions();
    initModalSystem();
    initQuoteInteractions();
    initResponsiveFeatures();
});

// Theme Management
function initTheme() {
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

        // Animate theme change
        document.body.style.transition = 'background-color 0.5s ease, color 0.5s ease';
        setTimeout(() => {
            document.body.style.transition = '';
        }, 500);
    });
}

// Scroll Effects and Animations
function initScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Scroll progress indicator
    window.addEventListener('scroll', () => {
        const scrolled = (window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        document.documentElement.style.setProperty('--scroll-progress', `${scrolled}%`);
    });
}

// Hero Section Animations
function initHeroAnimations() {
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroActions = document.querySelector('.hero-actions');

    // Sequential animation
    setTimeout(() => heroTitle.classList.add('animate-in'), 500);
    setTimeout(() => heroSubtitle.classList.add('animate-in'), 1000);
    setTimeout(() => heroActions.classList.add('animate-in'), 1500);

    // Start Journey button interaction
    const startJourneyBtn = document.getElementById('startJourney');
    startJourneyBtn.addEventListener('click', () => {
        startJourneyBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> شروع سفر...';
        startJourneyBtn.disabled = true;

        setTimeout(() => {
            document.getElementById('journey').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

            // Simulate loading progress
            simulateProgress();
        }, 1500);
    });

    // Explore Chapters button
    const exploreChaptersBtn = document.getElementById('exploreChapters');
    exploreChaptersBtn.addEventListener('click', () => {
        document.getElementById('chapters').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
}

// Journey Progress System
function initJourneyProgress() {
    const journeySteps = document.querySelectorAll('.journey-step');
    const continueBtn = document.getElementById('continueJourney');

    let currentStep = 0;

    continueBtn.addEventListener('click', () => {
        if (currentStep < journeySteps.length - 1) {
            journeySteps[currentStep].classList.remove('active');
            currentStep++;
            journeySteps[currentStep].classList.add('active');

            // Update progress
            updateJourneyProgress(currentStep);
        } else {
            // Complete journey
            completeJourney();
        }
    });

    function updateJourneyProgress(step) {
        const progressFill = journeySteps[step].querySelector('.progress-fill');
        const progressText = journeySteps[step].querySelector('.progress-text');

        let progress = 0;
        const interval = setInterval(() => {
            progress += 5;
            progressFill.style.width = `${progress}%`;
            progressText.textContent = `${progress}% تکمیل شده`;

            if (progress >= (step + 1) * 25) {
                clearInterval(interval);
            }
        }, 50);
    }

    function completeJourney() {
        continueBtn.innerHTML = '<i class="fas fa-check"></i> سفر تکمیل شد!';
        continueBtn.style.background = 'linear-gradient(135deg, #4caf50, #66bb6a)';

        // Show celebration
        showCelebration();

        // Auto scroll to chapters
        setTimeout(() => {
            document.getElementById('chapters').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }, 2000);
    }

    function showCelebration() {
        const celebration = document.createElement('div');
        celebration.className = 'celebration';
        celebration.innerHTML = `
            <div class="celebration-content">
                <i class="fas fa-trophy"></i>
                <h3>تبریک! سفر آزادی را آغاز کردید</h3>
                <p>حالا آماده کاوش فصول هستید</p>
            </div>
        `;
        document.body.appendChild(celebration);

        setTimeout(() => {
            celebration.remove();
        }, 3000);
    }
}

// Chapter Interactions
function initChapterInteractions() {
    const chapterCards = document.querySelectorAll('.chapter-card');
    const modal = document.getElementById('chapterModal');
    const closeModal = document.getElementById('closeModal');

    chapterCards.forEach((card, index) => {
        const readBtn = card.querySelector('.read-chapter');

        readBtn.addEventListener('click', () => {
            openChapterModal(index + 1);
        });
    });

    closeModal.addEventListener('click', () => {
        modal.classList.remove('show');
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            modal.classList.remove('show');
        }
    });
}

// Modal System for Chapters
function initModalSystem() {
    const modal = document.getElementById('chapterModal');
    const prevBtn = document.getElementById('prevChapter');
    const nextBtn = document.getElementById('nextChapter');
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalContent');
    const currentChapterSpan = document.getElementById('currentChapter');
    const totalChaptersSpan = document.getElementById('totalChapters');

    let currentChapter = 1;
    const totalChapters = 9;

    // Chapter data (simplified - in real implementation, this would be comprehensive)
    const chapterData = {
        1: {
            title: "آزادی واقعی چیست؟ حقوق مالکیت مطلق",
            content: `
                <div class="chapter-intro">
                    <p>در این فصل، جنت‌خواه آزادی را از نو تعریف می‌کند. نه لیبرالیسم غربی با تناقض‌هایش، نه آنارشی با آشوبش.</p>
                    <img src="images/open-hands-light.jpg" alt="دست‌های باز" style="width: 100%; border-radius: 15px; margin: 20px 0;">
                </div>

                <h4>چهار شاخه درخت آزادی</h4>
                <ul>
                    <li><strong>مالکیت جسم:</strong> هیچ‌کس حق اجبار ندارد</li>
                    <li><strong>مالکیت ذهن:</strong> آزادی باور و بیان</li>
                    <li><strong>مالکیت زمان:</strong> حق انتخاب زندگی</li>
                    <li><strong>مالکیت دارایی:</strong> ثمره کار متعلق به خود</li>
                </ul>

                <blockquote>
                    "این تعریف، آزادی را از شعار به یک اصل قضایی تبدیل می‌کند."
                </blockquote>
            `
        },
        2: {
            title: "نظام صوری آکسیوماتیک چیست؟",
            content: `
                <p>قلب نظریه جنت‌خواه: دین به عنوان یک نظام منطقی پایدار.</p>
                <img src="images/axiomatic-structure.jpg" alt="ساختار آکسیوماتیک" style="width: 100%; border-radius: 15px; margin: 20px 0;">

                <h4>مثال هندسه اقلیدسی</h4>
                <p>همه قوانین هندسه از ۵ اصل پایه ساخته شده‌اند.</p>

                <h4>جدول کامل اصول پنج‌گانه</h4>
                <table>
                    <tr><th>اصل</th><th>نقش</th><th>تأثیر</th></tr>
                    <tr><td>توحید</td><td>مالکیت مطلق خدا</td><td>پایان دیکتاتوری</td></tr>
                    <tr><td>نبوت</td><td>الگوهای عملی</td><td>نظام آزاد</td></tr>
                    <tr><td>معاد</td><td>عدالت نهایی</td><td>پایان ظلم</td></tr>
                    <tr><td>عدل</td><td>عدم تعدی</td><td>حقوق مالکیت</td></tr>
                    <tr><td>امامت</td><td>جامعه منتظر</td><td>آزادی مطلق</td></tr>
                </table>
            `
        },
        3: {
            title: "دین، نگهبان واقعی آزادی",
            content: `
                <p>دین بزرگ‌ترین دشمن دولت‌سالاری است.</p>
                <img src="images/freedom-chain.jpg" alt="زنجیرهای شکسته" style="width: 100%; border-radius: 15px; margin: 20px 0;">

                <h4>چگونه دین از آزادی حفاظت می‌کند:</h4>
                <ul>
                    <li>توحید: پایان بت‌پرستی قدرت</li>
                    <li>معاد: عدالت ابدی</li>
                    <li>مهدویت: هدف آزادی کامل</li>
                </ul>

                <p>دین واقعی آزادی را تضمین می‌کند، نه سرکوب.</p>
            `
        },
        4: {
            title: "کاربرد در ایران معاصر",
            content: `
                <p>راه‌حل واقعی برای مشکلات ایران.</p>

                <h4>مشکلات فعلی:</h4>
                <ul>
                    <li>تورم = دزدی از دارایی</li>
                    <li>سانسور = دزدی از ذهن</li>
                    <li>اجبار = دزدی از جسم و زمان</li>
                </ul>

                <h4>راه‌حل دینی:</h4>
                <p>بازگشت به دین واقعی = پایان دولت‌سالاری</p>
                <p>جامعه منتظر مهدی = جامعه منتظر آزادی کامل</p>
            `
        },
        5: {
            title: "تحلیل فلسفی آزادی",
            content: `
                <p>بررسی عمیق آزادی در فلسفه اسلامی و غربی.</p>
                <h4>بررسی فلسفی:</h4>
                <ul>
                    <li>آزادی در اندیشه اسلامی</li>
                    <li>مقایسه با فلسفه غربی</li>
                    <li>نظریه مالکیت در اقتصاد</li>
                    <li>آزادی در عصر دیجیتال</li>
                </ul>
            `
        },
        6: {
            title: "عدل الهی و حقوق بشر",
            content: `
                <p>ارتباط اصل عدل در دین با حقوق مالکیت مطلق.</p>
                <h4>عدل الهی:</h4>
                <ul>
                    <li>اصل عدم تعدی</li>
                    <li>حقوق برابر</li>
                    <li>عدالت اجتماعی</li>
                    <li>حفاظت از ضعفا</li>
                </ul>
            `
        },
        7: {
            title: "جامعه منتظر و آزادی",
            content: `
                <p>نقش امامت و مهدویت در جامعه آزاد.</p>
                <h4>جامعه منتظر:</h4>
                <ul>
                    <li>انتظار آزادی کامل</li>
                    <li>نقش امام در عدالت</li>
                    <li>جامعه بدون سرکوب</li>
                    <li>آزادی سیاسی و اجتماعی</li>
                </ul>
            `
        },
        8: {
            title: "آزادی در جهان مدرن",
            content: `
                <p>کاربرد نظریه در عصر دیجیتال و جهانی‌شدن.</p>
                <h4>چالش‌های مدرن:</h4>
                <ul>
                    <li>حریم خصوصی دیجیتال</li>
                    <li>کنترل دولتی آنلاین</li>
                    <li>آزادی بیان مجازی</li>
                    <li>مالکیت داده‌ها</li>
                </ul>
            `
        },
        9: {
            title: "آینده آزادی",
            content: `
                <p>چشم‌انداز جهانی آزادی بر پایه دین واقعی.</p>
                <h4>آینده:</h4>
                <ul>
                    <li>جامعه جهانی آزاد</li>
                    <li>پایان دولت‌سالاری</li>
                    <li>عدالت فراگیر</li>
                    <li>صلح پایدار</li>
                </ul>
            `
        }
    };

    function openChapterModal(chapterNumber) {
        currentChapter = chapterNumber;
        updateModalContent();
        modal.classList.add('show');
    }

    function updateModalContent() {
        const data = chapterData[currentChapter];
        modalTitle.textContent = data.title;
        modalContent.innerHTML = data.content;
        currentChapterSpan.textContent = currentChapter;
        totalChaptersSpan.textContent = totalChapters;

        // Update navigation buttons
        prevBtn.style.display = currentChapter > 1 ? 'flex' : 'none';
        nextBtn.style.display = currentChapter < totalChapters ? 'flex' : 'none';
    }

    prevBtn.addEventListener('click', () => {
        if (currentChapter > 1) {
            currentChapter--;
            updateModalContent();
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentChapter < totalChapters) {
            currentChapter++;
            updateModalContent();
        }
    });
}

// Quote Interactions
function initQuoteInteractions() {
    const shareBtn = document.getElementById('shareQuote');
    const saveBtn = document.getElementById('saveQuote');
    const quote = document.querySelector('.quote-text');

    shareBtn.addEventListener('click', async () => {
        const quoteText = quote.textContent;

        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'نظریه آزادی جنت‌خواه',
                    text: quoteText,
                    url: window.location.href
                });
            } catch (err) {
                copyToClipboard(quoteText);
            }
        } else {
            copyToClipboard(quoteText);
        }
    });

    saveBtn.addEventListener('click', () => {
        const quoteText = quote.textContent;
        const savedQuotes = JSON.parse(localStorage.getItem('savedQuotes') || '[]');

        if (!savedQuotes.includes(quoteText)) {
            savedQuotes.push(quoteText);
            localStorage.setItem('savedQuotes', JSON.stringify(savedQuotes));

            saveBtn.innerHTML = '<i class="fas fa-check"></i> ذخیره شد';
            saveBtn.style.background = '#4caf50';

            setTimeout(() => {
                saveBtn.innerHTML = '<i class="fas fa-bookmark"></i> ذخیره';
                saveBtn.style.background = '';
            }, 2000);
        } else {
            saveBtn.innerHTML = '<i class="fas fa-times"></i> قبلاً ذخیره شده';
            saveBtn.style.background = '#ff9800';

            setTimeout(() => {
                saveBtn.innerHTML = '<i class="fas fa-bookmark"></i> ذخیره';
                saveBtn.style.background = '';
            }, 2000);
        }
    });
}

// Utility Functions
function simulateProgress() {
    const progressBar = document.querySelector('.loading-progress');
    let progress = 0;

    const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress > 100) progress = 100;

        progressBar.style.width = `${progress}%`;

        if (progress >= 100) {
            clearInterval(interval);
        }
    }, 200);
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showNotification('نقل قول در کلیپ‌بورد کپی شد!');
    });
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;

    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--primary-color);
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: var(--shadow-heavy);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Responsive Features
function initResponsiveFeatures() {
    // Mobile menu toggle
    const navToggle = document.createElement('button');
    navToggle.className = 'nav-toggle';
    navToggle.innerHTML = '<i class="fas fa-bars"></i>';
    navToggle.style.display = 'none';

    const navbar = document.querySelector('.modern-navbar');
    navbar.appendChild(navToggle);

    navToggle.addEventListener('click', () => {
        const navLinks = document.querySelector('.nav-links');
        navLinks.classList.toggle('show');
    });

    // Responsive adjustments
    function handleResize() {
        if (window.innerWidth <= 768) {
            navToggle.style.display = 'block';
        } else {
            navToggle.style.display = 'none';
            document.querySelector('.nav-links').classList.remove('show');
        }
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    // Touch interactions for mobile
    if ('ontouchstart' in window) {
        document.querySelectorAll('.chapter-card, .resource-card').forEach(card => {
            card.addEventListener('touchstart', () => {
                card.style.transform = 'scale(0.98)';
            });

            card.addEventListener('touchend', () => {
                setTimeout(() => {
                    card.style.transform = '';
                }, 150);
            });
        });
    }
}

// Add additional CSS for mobile menu
const mobileMenuCSS = `
.nav-toggle {
    background: none;
    border: 2px solid var(--border-color);
    border-radius: var(--border-radius);
    padding: 0.5rem;
    cursor: pointer;
    transition: var(--transition-fast);
    margin-left: 1rem;
}

.nav-toggle:hover {
    border-color: var(--primary-color);
}

.nav-links.show {
    display: flex !important;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    flex-direction: column;
    padding: 1rem;
    box-shadow: var(--shadow-light);
}

[data-theme="dark"] .nav-links.show {
    background: rgba(18, 18, 18, 0.95);
}

.celebration {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    padding: 2rem;
    border-radius: var(--border-radius-large);
    box-shadow: var(--shadow-heavy);
    text-align: center;
    z-index: 10000;
    animation: celebrationPop 0.5s ease;
}

.celebration-content i {
    font-size: 3rem;
    color: var(--success-color);
    margin-bottom: 1rem;
}

.celebration-content h3 {
    color: var(--text-primary);
    margin-bottom: 1rem;
}

@keyframes celebrationPop {
    0% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
    50% { transform: translate(-50%, -50%) scale(1.1); }
    100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
}

@keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
}

@keyframes slideOut {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(100%); opacity: 0; }
}

.notification {
    animation: slideIn 0.3s ease;
}

.chapter-intro {
    margin-bottom: 2rem;
}

.chapter-intro img {
    margin: 20px 0;
    border-radius: 15px;
    box-shadow: var(--shadow-light);
}

.chapter-intro p {
    font-size: 1.1rem;
    line-height: 1.7;
    color: var(--text-secondary);
}
`;

// Add the CSS to the page
const style = document.createElement('style');
style.textContent = mobileMenuCSS;
document.head.appendChild(style);

// Performance optimizations
function optimizePerformance() {
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // Debounce scroll events
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(() => {
                // Handle scroll events
                scrollTimeout = null;
            }, 16);
        }
    });
}

// Initialize performance optimizations
optimizePerformance();

