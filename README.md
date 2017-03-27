#The Dante API 

is well, an API, for saving and requesting information about Dante's epic poem, The Divine Comedy. The infromation stored on the database holds a list of locations and persons that were either in the Divine Comedy or vital to the development of the narrative. Also the database holds major influences that Dante's work had over culture through out time, and vice versa.

This is also a full web app built ontop of the API. The app is an interface to reviewing the entries into the database, but more specifically, it is an interface for adding and editing entries. 

This works on the stack of Node.JS, Express.JS, MongoDB, and Knockout.JS.

Once some more basic feature are secure I will have it live on Heroku. For now if you would like ot get it running, clone the repo and start this project the way you would any noe app.

Either run MongoDB locally and create a database name danteAPI, or create one on the cloud and edit the -server.js file to connect to it. Then

-npm install
-npm run