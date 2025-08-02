
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
