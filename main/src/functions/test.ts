import { Builder, By, WebDriver } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';
import { path as chromedriverPath } from 'chromedriver'; // ✅ Correct Import

export async function scrapeRexall() {
  // Set up Chrome options
  const options = new chrome.Options();

  // Initialize WebDriver with Chrome
  const driver: WebDriver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options) // ✅ Use setChromeOptions instead
    .build();

  try {
    const url: string = 'https://shop.rexall.ca/store/rexall/s?k=ibuprofen+Option%2B';
    await driver.get(url);
    await driver.sleep(5000);

    let count: string;
    try {
      const countElement = await driver.findElement(By.className('e-an4oxa'));
      count = await countElement.getText();
    } catch {
      count = 'Not Found';
    }

    let price: string;
    try {
      const priceElement = await driver.findElement(By.className('e-1ip314g'));
      const priceParts = await priceElement.findElements(By.tagName('span'));
      const priceTexts = await Promise.all(priceParts.map(async part => await part.getText()));
      price = priceTexts.join('.');
    } catch {
      price = 'Not Found';
    }

    let brandName: string;
    try {
      const brandElement = await driver.findElement(By.className('e-147kl2c'));
      brandName = await brandElement.getText();
    } catch {
      brandName = 'Not Found';
    }

    console.log(`Count: ${count}`);
    console.log(`Price: ${price}`);
    console.log(`Brand Name: ${brandName}`);
  } catch (error) {
    console.error('Error scraping data:', error);
  } finally {
    await driver.quit();
  }
}

scrapeRexall();
