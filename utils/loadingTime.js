const https = require("https");

exports.linkLoadingTime = async (url) => {
  const linkLoadingTimeList = [];
  for (let i = 0; i < url.length; i++) {
    try {
      const startTime = new Date();
      const response = await new Promise((resolve, reject) => {
        https
          .get(url[i], (res) => {
            resolve(res);
          })
          .on("error", (err) => {
            reject(err);
          });
      });
      const endTime = new Date();
      console.log(startTime , endTime);
      const loadingTime = endTime - startTime;
      //console.log(`Website loaded in ${loadingTime} ms`);
      linkLoadingTimeList.push({
        website: url[i],
        loadingTime: loadingTime,
      });
    } catch (error) {
      console.log(error?.response);
    }
  }
  return linkLoadingTimeList;
};
