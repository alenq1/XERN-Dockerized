


// export const pages = {

//     normal: [
//         {path: '/', component: Home},
//         {path: '/login', component: Login},
//         {path: '/example', component: Example},
//     ],

//     protected: [
//         {path: '/list', component: Crud},
//         {path: '/users', component: Users},
//         {path: '/profile', component: Profile},
//     ]
// }


const myHost = 'http://localhost'
//const myHost = 'http://352e2197.ngrok.io'
const wsPort = 9000

export const sources = {

    //WSocket : `${myHost}:${wsPort}`,
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
    logo: require('../assets/imgs/mern-stack-transparent.png')
}


export const display = {

    crudNamesCols:  [
        'Name',
        'Price',
        'Quantity',
        'Description',
    ],
    usersNamesCols:     [
        'Username',
        'Email',
        'Role',
        'Active',
    ]
}

export const dataTest = {
    id: 1,
    message: "Display Test Data"    
}