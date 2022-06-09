import dotenv from 'dotenv'

dotenv.config()

const config: any = {

    ports:{
        serverPort: process.env.NODE_PORT || 4000,
        ws_Port: process.env.WSOCKET_PORT || 9000,
    },

    services:{    
        redis: process.env.REDIS_URL || 'redis://redis:6379' ,
        dbtype: process.env.DB_TYPE || 'mongo', // 'sql or 'mongo'
        nosqldb: process.env.MONGODB_URL || 'mongodb://userExample:example@mongo:27017/',
        sqldb : {
            type: process.env.SQL_DB || 'mysql',
            host: process.env.SQL_DB || 'mysql',
            port: process.env.SQL_DB_PORT || 3306,
            username: "user",
            password: "passwd",
            database: "app",
        }
    },
    
    tokens:{
        accessSecret: process.env.ACCESS_TOKEN || 'access',
        expireAccess:'5m',
        refreshSecret: process.env.REFRESH_TOKEN || 'refresh',
        expireRefresh: '12h',
    },

    saltForPassword: 10,

    adminCredentials: {
        username: process.env.ADMIN_USER,
        email: process.env.ADMIN_MAIL,
        password: process.env.ADMIN_PASSWD,
        role: 'admin',
        active: true
    },

    urls:{
        externalApi: 'https://api.publicapis.org/entries',
        wheatherApi:  (location: string) => 
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${config.apikeys.openWheather}&units=metric`,
        scrapUrls: {
            site: 'https://www.reddit.com/',
            channels: [
            'r/news/new',
            'r/popular',
            'r/all'
            ]
        },
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
        attribute: 'href',
        channel: 'h2'

    },

    authCookie: {
            maxAge: 60 * 60 * 1000, // 1 hour
            httpOnly: true,
            secure: false, //switch to true for https
            sameSite: true,    
    },

    // ADDITIONAL HELPER OPTIONS FOR APPS SERVICES

    misc: {
        cities: ['Beijing', 'Berlin','Dubai','Chicago', 'London', 'Moscow', 'Paris', 'Sydney', 'Tokyo'],
        corsOptions: {
            origin: [
        //   //`${process.env.FRONT_URL}`,
            'http://localhost:3000',
            'http://192.168.1.103:3000',
            "http://ngrok.io", 
            /\.ngrok\.io$/,
            ],
        //origin: false,
        credentials: true
        }
    }
}

export default config