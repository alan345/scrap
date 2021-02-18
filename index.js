const scrapy = require("node-scrapy");
const fetch = require("node-fetch");
var stringify = require("csv-stringify");
var fs = require("fs");

const scrap = async (i, page) => {
  console.log("scrap");
  const url = `${page}?page=${i}`;
  const model = [
    ".views-row",
    {
      name: ".text-uppercase > a > span",
      address: ".comp-addr",
      // url,
      empl: ".empl",
      // size: ".prj-size",
      link: ".visit-button a (href)",
    },
  ];

  fetch(url)
    .then((res) => res.text())
    .then((body) => {
      const jsonData = scrapy.extract(body, model);
      let jsonDataAugmented = jsonData.map((singleJson) => {
        return {
          url,
          ...singleJson,
        };
      });
      stringify(jsonDataAugmented, function (err, output) {
        fs.appendFile("total.csv", output, "utf8", function (err) {
          if (err) {
            console.log(
              "Some error occured - file either not saved or corrupted file saved."
            );
          } else {
            console.log(`It's saved!, page ${page}`);
          }
        });
      });
    })
    .catch(console.error);
};

const arrayData = [
  { page: "https://themanifest.com/social-media/agencies", max: 84 },
  { page: "https://themanifest.com/systems-integrations/companies", max: 54 },
  { page: "https://themanifest.com/software-development/companies", max: 145 },
  { page: "https://themanifest.com/app-development/companies", max: 182 },
  { page: "https://themanifest.com/it-services/msp/companies", max: 24 },
  { page: "https://themanifest.com/digital-marketing/agencies", max: 174 },
];

// for (const singleUserRoleCompanie of userRoleCompanies) {
for (const data of arrayData) {
  // console.log("a");
  console.log(data);
  for (let i = 0; i < data.max; i++) {
    console.log(`scrap${i}/${data.page}`);
    scrap(i, data.page);
  }
}
