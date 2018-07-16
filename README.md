# search-interface
This is a web app that sit on top of an Algolia Index that stores and looks through a dataset of apps. This application can search and browse through them, but also add and delete them.
The backend was developed using Node js and the frontend was developed using Inferno Js.


To see the end application please see the link of the deployed page on heroku:
https://rocky-lowlands-55287.herokuapp.com/


# Helpful NPM Scripts

## npm run dev 
Running 'npm run dev' will start nodemon as a dev server for the index.js file and will start up the Inferno Dev Environment
at the same time. This works sometimes a little bit buggy due to the front end restarting before the server, but it may be easily resolved by just refreshing manually the page.

## npm run cdev
This starts up the server for index.js and the dev environment of Inferno. This was mainly used for a more rapid development when only dealing with the front end.

## npm run build
This lets Inferno build the front end as static files and copies the to the public directory outside the client directory, for the index.js to serve.


# File structure
The entry point of the file contains the usual Node-app files, adding the module and client directories.

The module directory stores the algolia-model file, containing the class used for the interaction with the Algolia Engine.

The client directory containes all the tada files created by Inferno + the classes of the different components of the application itself (src).

The src directory containes the css files for styling, the components and subcomponents -- as mentioned --, 2 static images and the model directory containing the JS files for different functions that deal with the handle of the UI or the API communication with the backend.


J. Esteban Vega

