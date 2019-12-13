# MERN Dockerized Boilerplate

   - This project is made for build and fast deploying of React frontend and Node Backend
   - It counts with the following stack:
  
     ## Frontend Side
       - React 
         - Redux
         - Selectors, Thunk, Persist
         - Bootstrap
         - React Router
         - Forms handling and validation with Formik and Yup
         - Socket.io Client Side        
         - Other libarires
        
      
     ## Backend Site
       - Express 4
           - Express Middlewares, routes, controllers
         - Database backend with mongodb
           - Mongoose
           - Schema and methods
           - Crud and User management
         - Login and Register
           - Authentication with JWT 
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
  
  The docker compose file has a base template image for backend services, and proxy for serve static files, redis for channels and celery tasks, and optional postgres database to save the data if it needed 

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
  - Websocket and scrap example page 
  

  ## Stand Alone (Buscar Nombre)
  - TODO
  - []
  
# Site Description


  ## TODO
  - [] improve UI display 
  - [] add more schedule tasks and delayed tasks
  - [] define model for saving data from scheduled taks
  - [] set enviroment variables deploy more flexible
  - [] use redis-commander for managing redis service
  