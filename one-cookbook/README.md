# One Cookbook
### A cookbook to view different types of recipes and to create a grocery shopping list. 
### By Melisa Lee
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Getting Started
This is a full-stack application using MERN(MongoDB, Express, React, Node) the frontend utilizes React and the backend uses the Express framework. 

If you haven't done so already go ahead and clone the repo by entering the following:<br/>
`git clone https://github.com/leemelisa/one-cookbook.git`

Once thats done `cd` into the `one-cookbook` directory. You will see the following file structure by entering `ls` in the command line.
```
/one-cookbook
    /server
    /client
    README.md
```

The `/server` contains all the code for the Express backend.<br/>
The `/client` contains all the code for the React frontend.

## Local Setup
### Set up MongoDB
Follow: https://docs.mongodb.com/manual/mongo/ <br/>
Run the following:<br/>
`npm install mongodb`<br/>
Note: If you are running mongod for the first time remember to give permission mongod read and write permission.<br/>
`mongod`<br/>
On a new terminal window run mongo by entering: <br/>
`mongo`<br/>

### Install Node dependencies


## Running locally
To start client side enter the following in the `/client` folder:<br/>
`npm start`<br/><br/>

To start backend side run the following in the `/server` folder:<br/>
`nodemon server`

## API Keys Setup
Sign up for [unsplash](https://unsplash.com/documentation#creating-a-developer-account) to obtain an unsplashi api key.
To add your own api keys create a `.env` file within the `/client` folder
```
/one-cookbook
    /client
        .env
```
Add the following into the `.env` file insert the following and replacing YOUR UNSPLASH API KEY with your own<br/>
`REACT_APP_UNSPLASH_API_KEY=YOUR OWN UNSPLASH API KEY`<br/><br/>
Add [Google api key](https://developers.google.com/docs/api/how-tos/authorizing): go into the `.env` file insert the following and replacing YOUR GOOGLE API KEY with your own<br/>
`REACT_APP_GOOGLE_API_KEY=YOUR OWN GOOGLE API KEY`<br/>
