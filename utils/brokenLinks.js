const axios = require('axios')

exports.BrokenLinks = async(url) =>{
    const finalBrokenList = [];
  for (let i = 0; i < url.length; i++) {

    try {
      let response = await axios.head(url[i]);

      if (response.status < 400) {
        finalBrokenList.push({
          website: url[i],
          value: "success",
        });
        //  console.log(`success link: ${url[i]} (${response.status})`);
      }
    } catch (error) {
      finalBrokenList.push({
        website: url[i],
        value: "broken",
      });
     // console.log(`Broken link found: ${url[i]} (${error.response.status})`);
    }
  }
  return finalBrokenList
}