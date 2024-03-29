const puppeteer = require("puppeteer");

async function getToday() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto("https://www.readle.day/");

  const title = await page.evaluate(() =>
    document.querySelector("h1").textContent.trim()
  );

  const article = await page.evaluate(() => {
    const elements = document.querySelector("article").children;
    const articles = [];
    for (const article of elements) {
      articles.push(article.firstChild.textContent.trim());
    }
    return articles.join("\n\n");
  });

  await browser.close();

  return [title, article]
}

getToday();
