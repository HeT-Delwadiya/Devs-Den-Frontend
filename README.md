# Devs-Den-Frontend
 A platform for developers

## Description

A platform built with MERN stack, and utilizes third party API's. This platform enable two main different flows or implementations:  

1. Developers creates profiles, find other developers to collaborate with, uses dev tools
2. Companies create profiles, find and recruite devs for their work.   


* features:
  * Developers can create their professional profiles
  * Developers can showcase their project/work 
  * Developers can find other developers to collaborate for their project
  * Developers can use compiler & docs functionality
  * Developers can create their group and invite other developers. (Direct messaging functionality also)
  * Companies can create their professional profiles
  * Companies can find developers on skill bases and communicate with them
  * Companies can share their achievements

## Demo
 
  * This app is deployed on Heroku. Please check it out :smile: https://devs-den.herokuapp.com/ (Socket server is not running in this demo. so, chat wont be real time. I'm using heroku's free tier. Server goes offline when its idle for 30mins and everytime it restarts, heroku assigns new port, so that why i didn't started socket server for this demo).

  *  Demo User :   Email- user@test.com  |  password- testuser123   (Not responsive for mobile)

  
## Note 

  * This repo is just a frontend of Dev's Den website. You need socket server and backend also. Check out socket server and backend of DevsDen projects -> https://github.com/HeT-Delwadiya/.

## Disclaimer

  * I have used G4G's compiler API for compiler functionality & w3cub's docs for docs functionality of DevsDen project. 

## Install

Some basic Git commands are:

```
$ git clone https://github.com/HeT-Delwadiya/Devs-Den-Socket-Server.git
$ cd project
$ npm install
```

## Setup

```
 Create .env file that includes:

  * REACT_APP_BACKEND=http://localhost:8000/api
  * REACT_APP_FRONTEND=http://localhost:3000/
  * REACT_APP_SOCKET_URL=ws://localhost:8900
```

## Heroku Deployment

```
> Create a Procfile in the root directory of your application with the following command **web: npm run start:production**
```


## Simple build for production

```
$ npm run production
```

## Run the application for development

```
$ npm start
```

## Run the application for production

```
$ npm run start:production
```

## Languages & tools

- [Node](https://nodejs.org/en/)

- [Express](https://expressjs.com/)

- [Mongoose](https://mongoosejs.com/)

- [React](https://reactjs.org/)

