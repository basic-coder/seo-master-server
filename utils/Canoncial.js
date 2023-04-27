const axios = require('axios')
const cheerio = require('cheerio')
const path = require('path')

exports.Canonical = async(url) =>{
    let finalCanonicalList = [];
    for (let i = 0; i < url.length; i++) {
      const extension = path.extname(url[i]);
      // if (extension == ".html") {
        console.log(url[i]);
        await axios
          .get(url[i])
          .then((response) => {
            const $ = cheerio.load(response.data);
            const numCanonicals = $('link[rel="canonical"]').length;
  
            finalCanonicalList.push({
              website: url[i],
              status: response.status,
              h1Count: numCanonicals,
            });
  
            // console.log(
            //   `The website ${url[i]} has ${numCanonicals} canonical tags`
            // );
             console.log(i);
  
            if (numCanonicals != 1) {
              // console.log(
              //   `The website ${url[i]} has ${numCanonicals} canonical tags`
              // );
            }
          })
          .catch((error) => {
            try {
              if(error.response.status){
                finalCanonicalList.push({
                  website: url[i],
                  status: error.response.status,
                });
              }else{
                console.log(error.response);
              }   
            } catch (error) {
              finalCanonicalList.push({
                website: url[i],
                status: error.response,
              });
            }
              
             console.error(`Error fetching website ${url[i]}: ${error}`);
          });
      }
    // }
    return finalCanonicalList;
}