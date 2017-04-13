#The Dante API 

is well, an API, for saving and requesting information about Dante's epic poem, The Divine Comedy. The infromation stored on the database holds a list of locations and persons that were either in the Divine Comedy or vital to the development of the narrative. Also the database holds major influences that Dante's work had over culture through out time, and vice versa.

This is also a full web app built ontop of the API. The app is an interface to reviewing the entries into the database, but more specifically, it is an interface for adding and editing entries. 

This works on the stack of Node.JS, Express.JS, MongoDB, and Knockout.JS.

Once some more basic feature are secure I will have it live on Heroku. For now if you would like ot get it running, clone the repo and start this project the way you would any noe app.

Either run MongoDB locally and create a database name danteAPI, or create one on the cloud and edit the -server.js file to connect to it. Then

-npm install
-npm run

#To Do's

There is an error with updating location notes. 

###Example of adding a location note:

If this is done with out refreshing the page in between form submitions:

####Add 1
####Add 2
####Add 3

After adding "Add 1", the list of notes will be updated. However when "Add 2" is added, the list does not update and it only shows "Add 1". If you then add "Add 3" the list will update to show "Add 1 Add 2". If you refresh the list, either by selecting th elocation or refreshing the page, you will see "Add1 Add 3".
