const axios = require('axios')
const cheerio = require('cheerio');

exports.searchWordInWebPages = async (word,urls) =>{
    const wordList = []
    
    for (const url of urls) {
        try {
          const response = await axios.get(url);
          const $ = cheerio.load(response.data);
          const links = $('a'); // select all <a> elements on the page
          let count = 0;
          links.each((index, element) => {
            const href = $(element).attr('href'); // get the href attribute
            if (href && href.includes(word)) {
              count++;
            }
          });
          if(count > 0){
            wordList.push({
                url,
                count
            })
              console.log(`The word "${word}" appears ${count} time(s) on ${url}`);
          }
        } catch (err) {
            if (err.response.status === 404) {
                // wordList.push({
                //     url,
                //     "status": err.response.status
                // })
            }
          console.error(`Error fetching ${url}: ${err?.message}`);
        }
    }

    return wordList;
}


