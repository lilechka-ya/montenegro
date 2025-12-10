document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.nature-slide');
    const prevBtn = document.getElementById('naturePrev');
    const nextBtn = document.getElementById('natureNext');
    let currentSlide = 0;

    // Функция переключения слайдов
    function showSlide(index) {
        // Убираем активный класс у всех слайдов
        slides.forEach(slide => {
            slide.classList.remove('active');
        });

        // Корректируем индекс (зацикливание)
        if (index >= slides.length) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = slides.length - 1;
        } else {
            currentSlide = index;
        }

        // Добавляем активный класс новому слайду
        slides[currentSlide].classList.add('active');
    }

    // Обработчики кликов
    nextBtn.addEventListener('click', () => {
        showSlide(currentSlide + 1);
    });

    prevBtn.addEventListener('click', () => {
        showSlide(currentSlide - 1);
    });

    // Опционально: переключение стрелками клавиатуры
    document.addEventListener('keydown', (e) => {
        // Проверяем, видна ли секция nature (простая проверка)
        const natureSection = document.getElementById('nature');
        const rect = natureSection.getBoundingClientRect();
        const isVisible = (rect.top >= -window.innerHeight && rect.bottom <= window.innerHeight * 2);

        if (isVisible) {
            if (e.key === 'ArrowRight') {
                showSlide(currentSlide + 1);
            } else if (e.key === 'ArrowLeft') {
                showSlide(currentSlide - 1);
            }
        }
    });
});