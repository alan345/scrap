const scrapy = require("node-scrapy");
const fetch = require("node-fetch");

const scrap = async () => {
  console.log("scrap");
  const url = "https://www.facebook.com/getnachonacho/";
  // const url = `https://twitter.com/getnachonacho`;
  // const model = ":nth-child(2) > .css-4rbku5 > .r-18jsvk2 > .css-901oao";
  const model = "._4bl9";
  fetch(url)
    .then((res) => res.text())
    .then((body) => {
      // console.log("body");
      // console.log(body);
      const jsonData = scrapy.extract(body, model);
      console.log("jsonData");
      console.log(jsonData);
      // let jsonDataAugmented = jsonData.map((singleJson) => {
      //   return {
      //     url,
      //     ...singleJson,
      //   };
      // });
      // stringify(jsonDataAugmented, function (err, output) {
      //   fs.appendFile("total.csv", output, "utf8", function (err) {
      //     if (err) {
      //       console.log(
      //         "Some error occured - file either not saved or corrupted file saved."
      //       );
      //     } else {
      //       console.log(`It's saved!, page ${page}`);
      //     }
      //   });
      // });
    })
    .catch(console.error);
};

scrap();
