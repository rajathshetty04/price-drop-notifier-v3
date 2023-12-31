// const extractUrls = require("extract-urls");
const puppeteer = require("puppeteer");

const getURL = (url) => {
  const RegEx =
    /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/gim;
  const newURL =  url.match(RegEx);
  console.log(newURL[0]);
  return newURL[0];
};

// const checkProductDetails = async (productLink) => {
//   const nightmare = require("nightmare")();

//   console.log("checking price");
//   productLink = extractUrls(productLink)[0];
//   try {
//     const productDetails = await nightmare
//       .goto(productLink)
//       .wait(".a-price-whole")
//       .evaluate(() => {
//         return {
//           name: document.querySelector("#productTitle").innerText,
//           currentPrice: parseFloat(
//             document.querySelector(".a-price-whole").innerText.replace(/,/g, "")
//           ),
//         };
//       })
//       .end();
//     console.log(productDetails);
//     return productDetails;
//   } catch (error) {
//     console.log(error);
//     return
//   }
// };

const checkProductDetails = async (productLink) => {
  let browser;
  try {
    const url =await getURL(productLink);
    
    browser = await puppeteer.launch({
      headless: 'new'
    });
    console.log("browser opened")
    const page = await browser.newPage();
    await page.goto(url);
    await page.waitForSelector("#productTitle");
    await page.waitForSelector(".a-price-whole");
    const result =await page.evaluate(() => {
      return {
        name: document.querySelector("#productTitle").innerText,
        currentPrice: parseFloat(
          document.querySelector(".a-price-whole").innerText.replace(/,/g, "")
        ),
      };
      
    });
    console.log(result);
    return result;

  } catch (error) {
    console.log(error);

  } finally {
    console.log("browser closed");
    await browser.close();
  }
};

module.exports = checkProductDetails;
