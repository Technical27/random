const puppeteer = require('puppeteer');
const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');
let i = 1;

fs.readdirSync('img').forEach(f => {
  f = Number(f.replace('.jpg', ''));
  if (f > i) i = f;
});

const getImg = async page => {
  const frame = await page.frames().find(f => f.name() === 'content').childFrames().find(f => f.name() === 'page').childFrames().find(f => f.name() === 'main');
  const img = await frame.$('img#id_1757');
  const prop = await img.getProperty('src');
  return prop.jsonValue();
};

const download = (url, path) => {
  fetch(url)
    .then(res => {
      const stream = fs.createWriteStream(path);
      res.body.pipe(stream);
    });
};

console.log('opening headless chromium');
puppeteer.launch()
  .then(async browser => {
    console.log('opening page');
    const page = await browser.newPage();
    await page.goto('https://my.hrw.com/index.jsp?url=https://my.hrw.com/tabnav/controller.jsp?isbn=9780544248700');
    console.log('typing in usename and passowrd');
    await page.click('input#Username');
    await page.type('input#Username', process.argv[2]);
    await page.click('input[name=password]');
    await page.type('input[name=password]', process.argv[3]);
    console.log('logging in');
    await page.click('input#loginSubmitBtn');
    setTimeout(async () => {
      await page.evaluate(() => top.onClickPageTab());
      setTimeout(async () => {
        const input = await page.frames().find(f => f.name() === 'waib');
        await page.evaluate(() => g_pageTextboxElem.value = ''); // eslint-disable-line no-undef
        await input.click('input.pulldntxt');
        await input.type('input.pulldntxt', `${i+3}`);
        await page.evaluate(() => top.onClickGo());
        const loop = () => {
          getImg(page)
            .then(img => {
              console.log(`downloading page #${i}`);
              download(img, path.join(__dirname, 'img', `${i}.jpg`));
              i++;
              return page.evaluate(() => top.onClickIncPage(1));
            })
            .then(() => {
              if (i > 703) {
                console.log('all pages downloaded');
                return browser.close();
              }
              setTimeout(loop, 2000);
            });
        };
        setTimeout(loop, 6000);
      }, 2000);
    }, 4000);
  })
  .catch(e => console.log(e));