let VM = function(){

    let self = this;

    this.locationsPanel = new LocationsPanel();

    /*  From the index page file. When a user clicks on either of the 
        buttons to open the form panels to add and edit either locations,
        people, or infulences. This changes the string value of which 
        pannel was selected. The data-binding in the view looks at this 
        string and opens and closes the pannels needed to show. */
    this.openedPanel = ko.observable('none');
    this.openPanel = function(panelName){
        self.openedPanel(panelName);
    };

    
    //Still need to add the ability to open and close the jumbotron. 

}


/*  This is thr controller for the locations pannel interface. 
    It contains froms, buttons, and a search feature.   */
let LocationsPanel = function(){
    let self = this;

    /*  This is a string value used to determine which form the
    view will show. It can either be the add new or edit current.
    The edit form is pre-populated by the data of the selected 
    location for ease of editing. By default the form open is the 
    add new because no location is selected by default. The 
    data-binding can be found on partials/locationspanel.ejs    */
    this.formWindowSelected = ko.observable('add');

    /*  This observableArray will be populated my the locations 
    return from an ajax call later in this controller.  */
    this.locations = ko.observableArray();

    /* These are the result of a filter from the users search 
    input. By default these will be populated with the the available
    data of the curently selected location. */
    this.filteredLocations = ko.observableArray();

    /* These are the values of the add location form found in 
        partials/addLocationForm.ejs    */
    this.addLocationForm = {
        name: ko.observable(),
        address: ko.observable(),
        summary: ko.observable()
    };

    /*  Here we make the call to our api to retrieve our locations
        and return our findings. We gather all of our locations 
        saved so that our search feature will be faster.    */
    function getLocations(isAppInit){
        //This is the ajax call promise
        let getAllLocationsPromise = getAllLocations();

        //When the promise gets done
        getAllLocationsPromise.done(function(data){

            /*We assign the data to this value after we alter the 
                structure of the json that is retrieved from the api.
                This is so our returned json is simpler and leaves out 
                things like useless metadata.   */
            let locations = (parseRetrievedLocations(data));

            //Now we assigned the newly parsed json to our observable
            self.locations(locations);
            
            /*  If this function -getLocations is called at the initialization
                of the app then we need to assign the filteredLocations() to be
                all of the locations retrieved from the api.    */
            if(isAppInit){
                self.filteredLocations(locations)
            }
        })
        .fail(function(data){
            console.log("Failure in AJAX call for getAllLocations");
        })
    }
    
    /*  Here we initialize the first api request of retrieving the locations.
        We pass in thre as a paramater because we need to tell this function 
        that it is the first request of this function and to set up the 
        observables values appropriatly.    */
    getLocations(true);

    /*  Here we are simply passing in a string value to change which form 
        we would like to have open for the locations pannel. The data-binding
        in partials/locationspanel.ejs looks at the observable 
        formWindowSelected() to decide which form to show.*/
    this.formWindowChange = function(windowName){
        self.formWindowSelected(windowName);
    };

    /*  At the moment we do not return any response from the API 
        when we POST a new location. This would be used however for showing
        either a success or error message to the user upon locations submitions.*/
    this.formResponse = {
        message: ko.observable(""),
        type: ko.observable("")
    };

    /*  At the moment we do not return any response from the API 
        when we POST a new location. This would be used however to change
        either a success or error message to the user upon locations submitions.    */
    this.changeFormResponse = function(response){

        self.formResponse.message(response.message);
        self.formResponse.type(response.type);

        setTimeout(function(){
            self.formResponse.message("");
        }, 3000);
    };

    /*  This function is called when the user submits to the add location form.
        This function takes in markup of the form and lookes through its 
        data-bindings to extract the values of the form. Only the name value is 
        needed to add a location. The form is found in partials/addLocationForm.ejs   */
    this.submitNewLocation = function(data){

        //If we receive the form
        if(data){
            
            //Here we take the data-bindings of the input values of the form
            let location = {
                name : self.addLocationForm.name(),
                address : self.addLocationForm.address() || "",
                summary: self.addLocationForm.summary() || ""
            }

            //This is the AJAX Promise of the PSOT to the API
            let promise = addLocation(location);

            //If we have a name value
            if(location.name){
                promise.done(function(response){

                    //Currently the server does not send a appropriate response. 
                    self.changeFormResponse(response.message);

                    //Clear input feailds if it was successfull
                    clearInput();
                })
                .fail(function(response){
                    
                    //Currently the server does not send a appropriate response. 
                    self.changeFormResponse(response.message);

                    //We do not remove the values of the input fields.
                });
            }
            
            function clearInput(){
                self.addLocationForm.name("");
                self.addLocationForm.address("");
                self.addLocationForm.summary("");
            }
        }
    }
}


let PersonsPanel= function(){
    
    let self = this;

}


//We POST to our API to save a new location. Returns a Promise/
function addLocation(location){
    return $.ajax({
        url: '/addLocation',
        type: 'POST',
        dataType: 'json',
        data: location
    });
}


//We call to our API to get all saved locations. Returns a Promise.
function getAllLocations(){
    return $.ajax({
        url: '/getLocation',
        type: 'GET',
        dataType: 'json'
    });
}


/*  Here we simplify the JSON of locations recieved from the server. 
    Makes it easier to navigate on the client   */
function parseRetrievedLocations(locations){
    let locationArray = [];
    locations.forEach(function(location) {
        let newLocation = {
            name : location.name,
            summary : location.summary,
            address : location.summary
        };
        locationArray.push(newLocation);
    }, this);
    return locationArray;
}


ko.applyBindings(VM());