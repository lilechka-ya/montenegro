const { test, expect, request } = require('@playwright/test');

test.describe('Практическая работа №6: Тестирование сайта Montenegro', () => {
  
  const targetUrl = 'https://lilechka-ya.github.io/montenegro/';

  // Тест-кейс №1: Проверка доступности и заголовка страницы
  test('TC1: Проверка доступности и заголовка страницы', async ({ page }) => {
    await page.goto(targetUrl);
    await expect(page).toHaveTitle(/Montenegro/i);
  });

  // Тест-кейс №2: Проверка навигации через меню
  test('TC2: Проверка навигации через меню', async ({ page }) => {
    await page.goto(targetUrl);
    const firstNavLink = page.locator('nav a').first();
    const href = await firstNavLink.getAttribute('href');
    
    await firstNavLink.click();
    
    if (href && href.startsWith('#')) {
        await expect(page).toHaveURL(new RegExp(href));
    }
  });

  // Тест-кейс №3: Проверка адаптивности под мобильные устройства
  test('TC3: Проверка адаптивности (iPhone 12)', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(targetUrl);

    const isHorizontalScrollbarVisible = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    expect(isHorizontalScrollbarVisible).toBe(false);
  });

  // Тест-кейс №4: Проверка загрузки изображений
  test('TC4: Проверка загрузки всех изображений', async ({ page }) => {
    await page.goto(targetUrl);
    const images = page.locator('img');
    const count = await images.count();
    
    for (let i = 0; i < count; i++) {
      const isLoaded = await images.nth(i).evaluate((img) => img.complete && img.naturalWidth > 0);
      expect(isLoaded, `Изображение №${i} не загрузилось`).toBe(true);
    }
  });

  // Тест-кейс №5: Проверка работоспособности в текущем браузере
  test('TC5: Подтверждение работы в текущем окружении', async ({ page, browserName }) => {
    await page.goto(targetUrl);
    console.log(`Тест запущен в: ${browserName}`);
    await expect(page).not.toBeNull();
  });

  // Тест-кейс №6: Проверка внешней ссылки на Telegram (ОБНОВЛЕНО)
  test('TC6: Проверка внешней ссылки на Telegram', async ({ page }) => {
    await page.goto(targetUrl);
    
    // Ищем ссылку, содержащую t.me (стандартный домен Telegram)
    const telegramLink = page.locator('a[href*="t.me"]');
    
    // Проверяем видимость ссылки
    await expect(telegramLink).toBeVisible();
    
    // Проверяем, что атрибут href содержит корректный адрес
    const href = await telegramLink.getAttribute('href');
    expect(href).toContain('t.me');
  });

  // Тест-кейс №7: Автоматическая проверка на наличие «битых» ссылок
  test('TC7: Поиск битых ссылок (404 error)', async ({ page }) => {
    await page.goto(targetUrl);
    
    const links = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('a'))
        .map(a => a.href)
        .filter(href => href.startsWith('http'));
    });

    const context = await request.newContext();
    
    for (const link of links) {
      const response = await context.get(link);
      expect(response.status(), `Ссылка ${link} возвращает ошибку!`).toBeLessThan(400);
    }
  });

});