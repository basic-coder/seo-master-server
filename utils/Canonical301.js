const cheerio = require("cheerio");
const axios = require("axios");
const url = "https://www.github.com";

exports.Canonical301 = async (url) => {
  try {
    const finalCanonicalList = [];
    for (let i = 0; i < url.length; i++) {
      await axios
        .get(url[i], { maxRedirects: 0 })
        .then((res) => {
          console.log("Status Code:", res.status);

          const $ = cheerio.load(res.data);
          const numCanonicals = $('link[rel="canonical"]').length;

          console.log(numCanonicals);
          finalCanonicalList.push({
            website: url[i],
            redirectedUrl: "no redirection",
            canonicalCount: numCanonicals,
            status: "200",
          });
        })
        .catch((err) => {
          try {
            if (err.response.status === 301) {
              console.log("This URL is being redirected to another URL.");
              console.log("Location:", url[i]);
              console.log("Redirect Location:", err.response.headers.location);

              // Make a new request to the redirected URL
              const redirectedUrl = err.response.headers.location;
              axios
                .get(redirectedUrl)
                .then((res) => {
                  const $ = cheerio.load(res.data);
                  const canonicalTag = $('head link[rel="canonical"]');
                  if (canonicalTag.length) {
                    console.log(canonicalTag.length);
                    finalCanonicalList.push({
                      website: url[i],
                      redirectedUrl: redirectedUrl,
                      canonicalCount: canonicalTag.length,
                      status: "301",
                    });
                    console.log("Canonical Tag:", canonicalTag.length);
                  } else {
                    console.log("No Canonical Tag Found");
                  }
                })
                .catch((err) => {
                  console.error("Failed to fetch redirected URL:", err.message);
                });
            } else {
              finalCanonicalList.push({
                website: url[i],
                redirectedUrl: "no redirection",
                canonicalCount: "no count",
                status: err.response.status,
              });
              console.log("This URL is not being redirected.");
            }
          } catch (error) {
            finalCanonicalList.push({
              website: url[i],
              status: "no status"
            });
            console.log(error.response);
          }
        });
    }
    return finalCanonicalList;
  } catch (error) {
    console.log(error);
  }
};
