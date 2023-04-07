const axios = require('axios')
const cheerio = require('cheerio')
const path = require('path')

exports.h1Tags = async (url) => {
  let finalH1List = [];
  // for (let i = 0; i < url.length; i++) {
    const extension = path.extname(url[i]);
    if (extension == ".html") {
      await axios
        .get(url[i])
        .then((response) => {
          const $ = cheerio.load(response.data);
          const numH1Tags = $("h1").length;

          finalH1List.push({
            website: url[i],
            h1Count: numH1Tags,
          });

          //console.log(numH1Tags);
          //console.log(`The website ${url[i]} has ${numH1Tags} h1 tags`);
        })
        .catch((error) => {
          //console.error(`Error fetching website ${url[i]}: ${error}`);
        });
    }
  // }
  return finalH1List
};
