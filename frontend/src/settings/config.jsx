const myHost = 'http://localhost'
const wsPort = 9000

export const sources = {

    WSocket : `${myHost}:${wsPort}`,
    HealthEndpoint : `${myHost}/api/health/`,
    checkApiUrl : `${myHost}/api/test`,    
    taskMonitor : `${myHost}/admin/queues`,
    dataAdmin : `${myHost}/api/crud/`,
    LoginUrl: `${myHost}/api/login/`,
    RegisterUrl: `${myHost}/api/register/`,
    refreshUrl: `${myHost}/api/tkrefresh/`,
    scrapUrl: `${myHost}/api/scrap/`,
    scrapPage: 'https://www.reddit.com/r/news/new/',
    UsersUrl: `${myHost}/api/users/`,
    logo: require('../layout/imgs/mern.png')
}

export const dataTest = {
    id: 1,
    message: "Display Test Data"    
}