#The Dante API 
 
 an API, for saving and requesting information about Dante's epic poem, The Divine Comedy. The infromation stored on the database holds a list of locations and persons that were either in the Divine Comedy or vital to the development of the narrative. Also the database holds major influences that Dante's work had over culture through out time, and vice versa. 
 
 I am developing this to serve data to an older front-end project of mine called the Ferry Man. (joshuashoemaker.github.io/theferryman). That project does not yet recieve data from this API, currently it receives data from Wikipedia, Flickr, and Google Maps.

The app is an interface to reviewing the entries into the database, but more specifically, it is an interface for adding and editing entries. 

This works on the stack of Node.JS, Express.JS, MongoDB, and Knockout.JS.

Once some more basic features are secure I will have it live on Heroku. For now if you would like ot get it running, clone the repo and start this project the way you would any node app.

Either run MongoDB locally and create a database name danteAPI, or create one on the cloud and edit the -server.js file to connect to it. Then

-npm install
-npm run

http://localhost:3000

#To Do's

Add Images for location to Amazon S3

Look into this for knockout file binding:
https://github.com/TooManyBees/knockoutjs-file-binding





This is the CSS Frame work
https://daemonite.github.io/material/gh-pages/components/cards/index.html
