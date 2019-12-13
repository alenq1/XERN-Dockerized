import dotenv from 'dotenv'

dotenv.config()

const config: any = {

ports:{
    serverPort: process.env.NODE_PORT,
    ws_Port: process.env.WSOCKET_PORT,
},

services:{    
    redis: process.env.REDIS_URL || 'redis://redis:6379' ,
    db: process.env.DB_URL || 'mongodb://userExample:example@mongo:27017/'
},
tokens:{
    accessSecret: process.env.ACCESS_TOKEN || 'access',
    expireAccess:'5m',
    refreshSecret: process.env.REFRESH_TOKEN || 'refresh',
    expireRefresh: '12h',
},
urls:{
    externalApi: 'https://api.publicapis.org/entries',
    wheatherApi:  (location: string) => 
    `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${config.apikeys.openWheather}&units=metric`,
    scrapUrls: [
        'https://www.reddit.com/r/news/new/',
        'https://www.reddit.com/r/popular/',
        'https://www.reddit.com/r/all/'
    ],
},
apikeys: {
    openWheather: '24cc5a25a529fdb19c637798b92c8ba9',
    //'35bf572979091ae09b59e2901df3167'
},

scraping: {    
    browsers: [
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.36 Safari/537.36',
    'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:59.0) Gecko/20120101 Firefox/59.0'
    ],
    findTag: 'h3',
    parentTag: 'a',
    attribute: 'href'

},
misc: {
    cities: ['Beijing', 'Berlin','Dubai','Chicago', 'London', 'Moscow', 'Paris', 'Sydney', 'Tokyo']
}


}


export default config