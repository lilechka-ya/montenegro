// Mobile functionality - упрощенная версия
document.addEventListener('DOMContentLoaded', function() {
    const burgerMenu = document.getElementById('burgerMenu');
    const header = document.querySelector('.header');
    const body = document.body;
    
    // Проверяем размер экрана
    function checkScreenSize() {
        const isMobile = window.innerWidth <= 768;
        
        if (isMobile && burgerMenu) {
            // Убираем класс d-none если он остался
            burgerMenu.classList.remove('d-none');
            
            // Показываем/скрываем обычное меню
            const nav = document.querySelector('nav');
            if (nav) {
                nav.style.display = 'none';
            }
        } else {
            // На десктопе скрываем бургер и показываем обычное меню
            if (burgerMenu) burgerMenu.style.display = 'none';
            const nav = document.querySelector('nav');
            if (nav) nav.style.display = 'block';
        }
    }
    
    // Проверяем при загрузке
    checkScreenSize();
    
    // Обработчик клика по бургеру
    if (burgerMenu) {
        burgerMenu.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // Переключаем классы
            this.classList.toggle('open');
            header.classList.toggle('mobile-menu-open');
            
            // Показываем/скрываем меню
            const nav = document.querySelector('nav');
            if (nav) {
                if (header.classList.contains('mobile-menu-open')) {
                    nav.style.display = 'block';
                    body.style.overflow = 'hidden'; // Блокируем скролл
                } else {
                    nav.style.display = 'none';
                    body.style.overflow = ''; // Разблокируем скролл
                }
            }
        });
    }
    
    // Закрытие меню при клике на ссылку
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (burgerMenu && header.classList.contains('mobile-menu-open')) {
                burgerMenu.classList.remove('open');
                header.classList.remove('mobile-menu-open');
                body.style.overflow = '';
                
                const nav = document.querySelector('nav');
                if (nav) nav.style.display = 'none';
            }
        });
    });
    
    // Закрытие меню при клике вне меню
    document.addEventListener('click', function(e) {
        if (burgerMenu && header.classList.contains('mobile-menu-open') && 
            !header.contains(e.target)) {
            burgerMenu.classList.remove('open');
            header.classList.remove('mobile-menu-open');
            body.style.overflow = '';
            
            const nav = document.querySelector('nav');
            if (nav) nav.style.display = 'none';
        }
    });
    
    // Обновляем при изменении размера окна
    window.addEventListener('resize', checkScreenSize);
    
    // Пагинация для мобильных
    if (window.innerWidth <= 768) {
        const pagination = document.querySelector('.custom-pagination');
        if (pagination) {
            // Добавляем индикатор
            const paginationContainer = pagination.parentElement;
            const indicator = document.createElement('div');
            indicator.className = 'page-indicator';
            indicator.innerHTML = '<span style="color: #152E42; font-family: Ysabeau;">Страница <span class="current-page">1</span> из 3</span>';
            indicator.style.marginTop = '15px';
            indicator.style.textAlign = 'center';
            indicator.style.fontSize = '0.95rem';
            
            paginationContainer.appendChild(indicator);
            
            // Обработчики для пагинации
            const pageItems = pagination.querySelectorAll('.page-item');
            pageItems.forEach((item, index) => {
                item.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    // Убираем активный класс у всех
                    pageItems.forEach(p => p.classList.remove('active'));
                    
                    // Добавляем активный класс текущему
                    this.classList.add('active');
                    
                    // Обновляем индикатор
                    const currentPage = index + 1;
                    indicator.querySelector('.current-page').textContent = currentPage;
                });
            });
        }
    }
});