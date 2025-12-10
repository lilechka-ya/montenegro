// Слайдер туров — кликабельные миниатюры + смена контента и фото
document.addEventListener('DOMContentLoaded', function () {
  const thumbs = document.querySelectorAll('.tours-thumbs .thumb');
  const contents = document.querySelectorAll('.tour-content-item');
  const bigImages = document.querySelectorAll('.tour-big-image img');

  thumbs.forEach(thumb => {
    thumb.addEventListener('click', function () {
      const index = this.dataset.index;

      // Убираем active у всех
      thumbs.forEach(t => t.classList.remove('active'));
      contents.forEach(c => c.classList.remove('active'));
      bigImages.forEach(img => img.classList.remove('active'));

      // Активируем выбранное
      this.classList.add('active');
      contents[index].classList.add('active');
      bigImages[index].classList.add('active');
    });
  });
});