const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function run() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  const requests = [];
  const apiCalls = [];

  page.on('request', request => {
    const url = request.url();
    requests.push(url);
    if (url.includes('api') || url.includes('user') || url.includes('profile')) {
      apiCalls.push({
        url: url,
        method: request.method(),
        headers: request.headers()
      });
    }
  });

  page.on('response', async response => {
    const url = response.url();
    if (url.includes('api.codolio.com') || url.includes('codolio.com/api')) {
      try {
        const text = await response.text();
        console.log(`\n--- API Response for ${url} ---`);
        console.log(text.substring(0, 1000));
      } catch (e) {
        // ignore binary responses
      }
    }
  });

  console.log('Navigating to Codolio profile page...');
  await page.goto('https://codolio.com/profile/generalBR', { waitUntil: 'networkidle' });
  
  console.log('\n--- Intercepted API/Data Requests ---');
  apiCalls.forEach(call => {
    console.log(`[${call.method}] ${call.url}`);
  });

  await browser.close();
}

run().catch(console.error);
