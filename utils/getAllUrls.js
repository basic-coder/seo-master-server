const axios = require('axios')
const xml2js = require('xml2js')

exports.getAllUrls = async (url) => {
    const allUrls = [];
  await axios
    .get(url, {
      "Content-Type": "application/xml; charset=utf-8",
    })
    .then((response) => response.data.toString())
    .then((res) => {
      const parser = new xml2js.Parser({ explicitArray: false });
      parser.parseString(res, (err, result) => {
        result.urlset.url.forEach((element) => {
          allUrls.push(element.loc);
        });
      });
    });
    return allUrls
};
