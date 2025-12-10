// js/header-behavior.js
document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.header');
  if (!header) return;

  let isScrolled = false;
  let mouseInTopZone = false;

  // Зона активации — верхние 50px экрана
  const TOP_ZONE_HEIGHT = 100;

  // Проверка: уже проскроллено?
  const checkScrolled = () => window.scrollY > 80;

  const updateHeader = () => {
    isScrolled = checkScrolled();

    if (!isScrolled) {
      // Пользователь в самом верху — исходный вид
      header.classList.remove('hide', 'show-solid');
    } else {
      // Уже проскроллено
      if (mouseInTopZone) {
        header.classList.remove('hide');
        header.classList.add('show-solid');
      } else {
        header.classList.add('hide');
        header.classList.remove('show-solid');
      }
    }
  };

  // Отслеживаем положение мыши
  document.addEventListener('mousemove', (e) => {
    const inTop = e.clientY <= TOP_ZONE_HEIGHT;
    if (inTop !== mouseInTopZone) {
      mouseInTopZone = inTop;
      updateHeader();
    }
  });

  // Отслеживаем скролл
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateHeader();
        ticking = false;
      });
      ticking = true;
    }
  });

  // При наведении на сам хедер — гарантируем видимость
  header.addEventListener('mouseenter', () => {
    if (isScrolled) {
      header.classList.remove('hide');
      header.classList.add('show-solid');
    }
  });

  // Инициализация при загрузке
  updateHeader();
});