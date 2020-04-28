# XERN Dockerized Boilerplate

   - This project is made for build and fast deploying React frontend and Node Backend development enviroment 
   - It counts with the following stack:
  
     ## Frontend Side
       - React 
         - Redux
         - Selectors, Thunk, Persist
         - Styled Components and some Bootstrap
         - React Router
         - Forms handling and validation with Formik and Yup
         - Socket.io Client Side
         - Url and config settings file
         - Other libarires
        
     ## Backend Site
       - Express 4
           - Express Middlewares, routes, controllers
         - Database backend support for mongodb and SQL databases (MySQL, Postgres)
           - Mongoose
           - TypeORM 
           - Schema and methods
           - Crud and User management
           - Shared Functions 
           - Easy Switch for Database service
         - Login and Register
           - Authentication with JWT
           - Authorization User roles
           - Acesss Token
           - Refresh Token
         - BackGround and Scheduled Tasks
           - Bulljs 
           - Worker for manage job process
           - Jobs using redis backend
         - Websocket Streaming Data
           - Socket.io
           - Separate process for sockets process  
         - Scraping Data
           - Cheerio
           - Axios
         - Other Tools
           - Config Settings file 
           - Joi for data validation
           - Cors Headers
           
     ## Additional Stack
       - Proxy with nginx
       - Bull Board for Monitor tasks
       - Typescript partial support
       - Hot reaload with ts-node and nodemon

     ## Deploy tools
       - Docker 
       - Docker Compose
       - Custom entrypoints
       - Custom Enviroments Variables
       - HealthChecks and Wait for Ready Services

# How to run

  ## Docker way
  
  The docker compose file has a base template image for backend services, and proxy for serve static files, redis for socket.io and bull queue for tasks.

  You need to have installed docker and docker-compose to run this project
  
  if you have docker and docker-compose installed you need to build images in docker-compose and custom Dockerfiles in the backend and frontend folders

    docker-compose build 
  
  After download and build the images just run the app with the command.

    docker-compose up -d
  
  If you encounter a error like this on starting containers 

    for frontend  UnixHTTPConnectionPool(host='localhost', port=None): Read timed out. (read timeout=60)

  Just restart the container affected (Frontend) or set this on the shell console On Linux and MAC

    export DOCKER_CLIENT_TIMEOUT=120
    export COMPOSE_HTTP_TIMEOUT=120


# Services Check

  Once all containers are up and running just check the services status on the home page site http://localhost:3000/, and now you can see the service check page


  This is the initial page for check the services which our app will interact and do the following checks

  - Backend root api endpoint
  - Make a request to api backend which makes another request to external api
  - Websocket client send a PING message to the server and awaits for PONG response
  - A button link to the Bull Board monitor for scheduled tasks running (see backend/src/app/app.ts to disable/enable)
  - A button link to the Crud page for manipulate data after login
  - An Admin section with only Admin Role User access authorized for data manipulation
  - Websocket and scrap example page 

# ScreenShots 
  ## Home Section
![Home-Desktop](/screenshots/home-desktop.jpg)
  ### Mobile Display
  ![Home-Mobile](/screenshots/home-mobile.jpg)
  
  ### Sidebar
  ![Sidebar-Desktop](/screenshots/sidebar-desktop.jpg)
  ![Sidebar-Mobile](/screenshots/sidebar-mobile.jpg)

  ## CRUD Section
![Crud-Page](/screenshots/crud-page.jpg)
![Crud-Modal-Actions](/screenshots/crud-modal-actions.jpg)

  ## Admin Users Section
![Admin-User-Section](/screenshots/admin-user-section.jpg)

  ## Websocket and Scraping Examples
![Websocket-Example](/screenshots/websocket-data-example.jpg)
![Scraping-Example](/screenshots/scraping-data.jpg)


  ## TODO
  - [] Production Enviroment settings
  - [] improve UI display 
  - [] add more schedule tasks and delayed tasks
  - [] define model for saving data from scheduled taks
  - [] set enviroment variables deploy more flexible
  - [] use redis-commander for managing redis service
  