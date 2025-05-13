document.addEventListener('DOMContentLoaded', function() {
    // Плавная прокрутка для якорных ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Карусель
    const carousel = document.querySelector('.carousel');
    if (carousel) {
        const inner = carousel.querySelector('.carousel-inner');
        const items = carousel.querySelectorAll('.carousel-item');
        const prevBtn = carousel.querySelector('.prev');
        const nextBtn = carousel.querySelector('.next');

        let currentIndex = 0;
        const itemCount = items.length;

        function updateCarousel() {
            inner.style.transform = `translateX(-${currentIndex * 100}%)`;
        }

        function nextSlide() {
            currentIndex = (currentIndex + 1) % itemCount;
            updateCarousel();
        }

        function prevSlide() {
            currentIndex = (currentIndex - 1 + itemCount) % itemCount;
            updateCarousel();
        }

        nextBtn.addEventListener('click', nextSlide);
        prevBtn.addEventListener('click', prevSlide);

        // Автоматическое перелистывание
        let interval = setInterval(nextSlide, 5000);

        carousel.addEventListener('mouseenter', () => {
            clearInterval(interval);
        });

        carousel.addEventListener('mouseleave', () => {
            interval = setInterval(nextSlide, 5000);
        });
    }

    // Переключение темы
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        const icon = themeToggle.querySelector('i');

        // Проверяем сохраненную тему в localStorage
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);

        // Устанавливаем соответствующую иконку
        if (savedTheme === 'dark') {
            icon.classList.replace('fa-moon', 'fa-sun');
        }

        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);

            if (newTheme === 'dark') {
                icon.classList.replace('fa-moon', 'fa-sun');
            } else {
                icon.classList.replace('fa-sun', 'fa-moon');
            }
        });
    }

    // Фильтрация статей
    const filterButtons = document.querySelectorAll('.filter-btn');
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Удаляем активный класс у всех кнопок
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Добавляем активный класс текущей кнопке
                button.classList.add('active');

                const filterValue = button.getAttribute('data-filter');
                const articles = document.querySelectorAll('.article-preview');

                articles.forEach(article => {
                    if (filterValue === 'all' || article.getAttribute('data-category') === filterValue) {
                        article.style.display = 'flex';
                    } else {
                        article.style.display = 'none';
                    }
                });
            });
        });
    }

    // Загрузка контента статьи
    function loadArticleContent() {
        const pathParts = window.location.pathname.split('/');
        const articleFile = pathParts[pathParts.length - 1];

        if (articleFile.startsWith('article')) {
            const articleId = articleFile.replace('article', '').replace('.html', '');
            console.log(`Загружена статья с ID: ${articleId}`);

            // Можно добавить дополнительную логику для разных статей
        }
    }

    // Вызываем для страниц статей
    if (window.location.pathname.includes('article')) {
        loadArticleContent();
    }

    // Анимация при наведении
    const interactiveElements = document.querySelectorAll('a, button, .article-card, .related-article, .tag, .share-btn, .social-link, .submit-btn');
    interactiveElements.forEach(element => {
        element.style.transition = 'var(--transition)';

        element.addEventListener('mouseenter', () => {
            element.style.transform = 'translateY(-3px)';
            element.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        });

        element.addEventListener('mouseleave', () => {
            element.style.transform = '';
            element.style.boxShadow = '';
        });
    });

    // Фиксированная навигация при прокрутке
    const mainNav = document.querySelector('.main-nav');
    if (mainNav) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                mainNav.style.backgroundColor = 'var(--header-bg)';
                mainNav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            } else {
                mainNav.style.backgroundColor = 'rgba(44, 62, 80, 0.9)';
                mainNav.style.boxShadow = 'none';
            }
        });
    }
});