import { test, expect } from '@playwright/experimental-ct-react';
import { Page } from 'playwright';
import App from '../App';

const getBackgroundColour = async (page: Page, selector: string) => {
  return page.$eval(selector, (element: HTMLElement) =>
    window.getComputedStyle(element).backgroundColor
  );
};

test.use({ viewport: { width: 500, height: 500 } });

test.describe('Page Content', async () => {
  test('should have correct page title', async ({ mount }) => {
    const app = await mount(<App />);
    await expect(app).toContainText('Insanely Creative React App');
  });
  
  test('should have correct button description', async ({ mount }) => {
    const app = await mount(<App />);
    const description = app.locator('.description');
    await expect(description).toContainText('Click the button to change the background colour.')
  });
});

test.describe('Button Functionality', async() => {
  test('should change background colour when button clicked once', async({ page }) => {
    await page.goto('http://localhost:3000');
    await page.waitForSelector('.bg-button');
  
    const before = await getBackgroundColour(page, 'body');
    await page.click('.bg-button');
    const after = await getBackgroundColour(page, 'body');
  
    expect(before).not.toEqual(after);
  });
  
  test('should change background colour each time button is clicked', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.waitForSelector('.bg-button');
  
    for (let i = 0; i < 10; i++) {
      const before = await getBackgroundColour(page, 'body');
      await page.click('.bg-button');
      const after = await getBackgroundColour(page, 'body');
    
      expect(before).not.toEqual(after);
    }
  });
});