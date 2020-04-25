import axios from 'axios'
import cheerio from 'cheerio'
import config from '../settings/config'

    
const { 
  
  scraping: { browsers, findTag, parentTag, attribute, channel },
  urls: {scrapUrls: {site}}

} = config


export default async(job) => {

  const result: Array<object> = []

    await axios({
      url: job.data.url,
      headers:{
        'user-agent': browsers[Math.floor(Math.random()*browsers.length)]
      }
    })
      .then(response => {
        const html = response.data;
        const $ = cheerio.load(html);
        //const newsTitle = $('h3');  
        //const complete = $('a').attr('data-click-id', 'body')
        //console.log(Object.values(newsTitle));

        $(findTag).each( function(i, element){ 
        //$('a').attr('data-click-id', 'body').each( function(i, el){ 
            //Titles[i] = $(el).text()
            result.push({
                title: $(element).text(),
                link: `${site}${$(element).parents(parentTag).attr(attribute)}`,
                //channel: $(element).parentsUntil(channel).html()
            })
        })
        //Object.values(newsTitle).forEach(function(){})
        //console.log(result)
        //console.log(complete.text())
      })
      .catch(error => {
        console.log(error, "Error fetching url for scrap")
        result.push({error})
      })
      
      //console.log(result, "result for return")
  return result

}