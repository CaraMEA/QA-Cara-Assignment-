
import { test, expect } from '@playwright/test';

test('login form should work', async ({ page }) => {
  // Navigate to login page
  await page.goto('http://the-internet.herokuapp.com/login');

  // Fill in username and password
  await page.fill('#username', 'tomsmith');
  await page.fill('#password', 'SuperSecretPassword!');

  // Click the login button
  await page.click('button[type="submit"]');

  // Expect successful login message
  await expect(page.locator('#flash')).toContainText('You logged into a secure area!');
});
test('Verify system behavior with overlength username input', async ({ page }) => {
  await page.goto('http://the-internet.herokuapp.com/login');

  const longUsername = 'a'.repeat(150);

  await page.fill('#username', longUsername);
  await page.fill('#password', 'SuperSecretPassword!');
  await page.click('button[type="submit"]');

  await expect(page.locator('#flash')).toContainText('Your username is invalid!');

});
test('Should reject login when username and password are empty', async ({ page }) => {
  await page.goto('http://the-internet.herokuapp.com/login');

  await page.fill('#username', '');
  await page.fill('#password', '');
  await page.click('button[type="submit"]');

  await expect(page.locator('#flash')).toContainText('Your username is invalid!');
});
test('Login should complete within 2 seconds', async ({ page }) => {
  const start = Date.now();

  await page.goto('http://the-internet.herokuapp.com/login');
  await page.fill('#username', 'tomsmith');
  await page.fill('#password', 'SuperSecretPassword!');
  await page.click('button[type="submit"]');

  await page.waitForURL('**/secure', { timeout: 2000 }); // Ensure redirect is fast
  const end = Date.now();
  const duration = end - start;

  console.log(`Login duration: ${duration}ms`);
  expect(duration).toBeLessThanOrEqual(2000);
});
test('Should not allow direct access to secure page without login', async ({ page }) => {
  await page.goto('http://the-internet.herokuapp.com/secure');

  // Expect redirect back to login or display of unauthorized message
  await expect(page).toHaveURL('http://the-internet.herokuapp.com/login');
  await expect(page.locator('#flash')).toContainText('You must login');
});



