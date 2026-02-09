const { test, expect } = require('@playwright/test');

test('book animation check', async ({ page }) => {
    // 1. Go to page
    await page.goto('http://localhost:3001/projects');
    await page.waitForTimeout(2000); // wait for initial load

    // 2. Hover check (closed)
    const book = page.locator('.cursor-pointer'); // Target the book wrapper
    await book.hover();
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'hover_closed.png' });

    // 3. Scroll down (open)
    await page.evaluate(() => window.scrollTo(0, 500));
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'scrolled_open.png' });

    // 4. Scroll up (close)
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(1000); // wait for spring to settle
    await page.screenshot({ path: 'scrolled_closed.png' });

    // 5. Hover again
    await book.hover();
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'hover_closed_after.png' });
});
