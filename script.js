// ============================================
// MOBILE MENU TOGGLE
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Анимация иконки гамбургера
            const spans = menuToggle.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translateY(9px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translateY(-9px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Закрытие меню при клике на ссылку
        const menuLinks = navMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    navMenu.classList.remove('active');
                    const spans = menuToggle.querySelectorAll('span');
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                }
            });
        });
    }
});

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ============================================
// FADE IN ANIMATION ON SCROLL
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Наблюдение за элементами с отложенной анимацией
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.type-card, .motive-item, .formation-card, .indicator-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
});

// ============================================
// ACTIVE PAGE INDICATOR UPDATE
// ============================================

// Обновление активной ссылки в навигации на основе текущей страницы
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});

// ============================================
// SCROLL TO TOP BUTTON
// ============================================

// Создание кнопки "Наверх"
const scrollButton = document.createElement('button');
scrollButton.innerHTML = '↑';
scrollButton.className = 'scroll-to-top';
scrollButton.setAttribute('aria-label', 'Прокрутить наверх');
document.body.appendChild(scrollButton);

// Добавление стилей для кнопки
const style = document.createElement('style');
style.textContent = `
    .scroll-to-top {
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #8b7355 0%, #5d4e37 100%);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 24px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        box-shadow: 0 4px 8px rgba(93, 78, 55, 0.3);
        z-index: 999;
    }
    
    .scroll-to-top.visible {
        opacity: 1;
        visibility: visible;
    }
    
    .scroll-to-top:hover {
        transform: translateY(-5px);
        box-shadow: 0 6px 12px rgba(93, 78, 55, 0.4);
        background: linear-gradient(135deg, #5d4e37 0%, #704214 100%);
    }
    
    .scroll-to-top:active {
        transform: translateY(-2px);
    }
    
    @media (max-width: 768px) {
        .scroll-to-top {
            bottom: 20px;
            right: 20px;
            width: 45px;
            height: 45px;
            font-size: 20px;
        }
    }
`;
document.head.appendChild(style);

// Показ/скрытие кнопки при прокрутке
window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
        scrollButton.classList.add('visible');
    } else {
        scrollButton.classList.remove('visible');
    }
});

// Прокрутка наверх при клике
scrollButton.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ============================================
// READING PROGRESS BAR
// ============================================

// Создание индикатора прогресса чтения
const progressBar = document.createElement('div');
progressBar.className = 'reading-progress';
document.body.appendChild(progressBar);

const progressStyle = document.createElement('style');
progressStyle.textContent = `
    .reading-progress {
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 4px;
        background: linear-gradient(90deg, #9d7e54 0%, #704214 100%);
        z-index: 9999;
        transition: width 0.1s ease;
        box-shadow: 0 2px 4px rgba(112, 66, 20, 0.3);
    }
`;
document.head.appendChild(progressStyle);

// Обновление индикатора прогресса при прокрутке
window.addEventListener('scroll', function() {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight - windowHeight;
    const scrolled = window.pageYOffset;
    const progress = (scrolled / documentHeight) * 100;
    
    progressBar.style.width = progress + '%';
});

// ============================================
// ENHANCED KEYBOARD NAVIGATION
// ============================================

document.addEventListener('keydown', function(e) {
    // Навигация стрелками между страницами
    const navButtons = document.querySelectorAll('.navigation-buttons .btn');
    
    if (e.key === 'ArrowLeft') {
        const prevButton = Array.from(navButtons).find(btn => btn.classList.contains('btn-prev'));
        if (prevButton) {
            window.location.href = prevButton.getAttribute('href');
        }
    } else if (e.key === 'ArrowRight') {
        const nextButton = Array.from(navButtons).find(btn => btn.classList.contains('btn-next'));
        if (nextButton) {
            window.location.href = nextButton.getAttribute('href');
        }
    } else if (e.key === 'Home' && e.ctrlKey) {
        e.preventDefault();
        window.location.href = 'index.html';
    }
});

// ============================================
// PRINT OPTIMIZATION
// ============================================

// Оптимизация для печати
window.addEventListener('beforeprint', function() {
    // Скрыть навигацию и кнопки при печати
    const nav = document.querySelector('nav');
    const navButtons = document.querySelector('.navigation-buttons');
    const scrollBtn = document.querySelector('.scroll-to-top');
    
    if (nav) nav.style.display = 'none';
    if (navButtons) navButtons.style.display = 'none';
    if (scrollBtn) scrollBtn.style.display = 'none';
});

window.addEventListener('afterprint', function() {
    // Восстановить элементы после печати
    const nav = document.querySelector('nav');
    const navButtons = document.querySelector('.navigation-buttons');
    const scrollBtn = document.querySelector('.scroll-to-top');
    
    if (nav) nav.style.display = '';
    if (navButtons) navButtons.style.display = '';
    if (scrollBtn) scrollBtn.style.display = '';
});

// ============================================
// CONSOLE EASTER EGG
// ============================================

console.log('%c🎓 Исследование Антропонимики', 'font-size: 20px; font-weight: bold; color: #704214;');
console.log('%cNickname как особая разновидность современных антропонимов', 'font-size: 14px; color: #8b7355;');
console.log('%c\nИнтересуетесь лингвистикой? Добро пожаловать!', 'font-size: 12px; color: #5d4e37;');
