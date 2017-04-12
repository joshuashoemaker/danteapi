/*  This is thr controller for the locations pannel interface. 
    It contains froms, buttons, and a search feature.   */
let LocationsPanel = function(){
    let self = this;

    //Helper Functions
    function clearSelectedLocation(){
        self.selectedLocation.name("");
        self.selectedLocation.oldName("");
        self.selectedLocation.address("");
        self.selectedLocation.summary("");
        console.log("Selection Cleared");
    }
    

    function clearInputAddLocation(){
        self.addLocationForm.name("");
        self.addLocationForm.address("");
        self.addLocationForm.summary("");
    }

    function clearAddNote(){
        self.selectedLocation.selectedNote("");
    }


    /*  This is a string value used to determine which form the
        view will show. It can either be the add new or edit current.
        The edit form is pre-populated by the data of the selected 
        location for ease of editing. By default the form open is the 
        add new because no location is selected by default. The 
        data-binding can be found on partials/locationspanel.ejs    */
    this.formWindowSelected = ko.observable('add');

    
    this.editInfoFormWindowSelected = ko.observable('basic');


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


    this.selectedLocation = {
        name: ko.observable(""),
        address: ko.observable(""),
        summary: ko.observable(""),
        oldName: ko.observable(""),
        notes: ko.observableArray(),
        selectedNote: ko.observable("")
    }


    this.selectLocation = function(name){

        let foundLocation = {};

        self.locations().forEach(function(loc) {
            if(loc.name === name){
                foundLocation = loc;
            }
        }, this);

        self.selectedLocation.name(foundLocation.name);
        self.selectedLocation.oldName(foundLocation.name)
        self.selectedLocation.summary(foundLocation.summary || "");
        self.selectedLocation.address(foundLocation.address || "");
        self.selectedLocation.notes(foundLocation.notes);

        console.log(self.selectedLocation.notes());
    }


    this.selectLocationNote = function(note){

        self.selectedLocation.selectedNote(note);
        console.log(self.selectedLocation.selectedNote());
    }


    this.searchValue = ko.observable();


    /*  Here we make the call to our api to retrieve our locations
        and return our findings. We gather all of our locations 
        saved so that our search feature will be faster.    */
    function getLocations(filter){
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
            self.filter(filter || "");
        })
        .fail(function(data){
            console.log("Failure in AJAX call for getAllLocations");
        })
    }
    

    /*  Here we initialize the first api request of retrieving the locations.
        We pass in thre as a paramater because we need to tell this function 
        that it is the first request of this function and to set up the 
        observables values appropriatly.    */
    getLocations(self.searchValue());


    /*  Here we are simply passing in a string value to change which form 
        we would like to have open for the locations pannel. The data-binding
        in partials/locationspanel.ejs looks at the observable 
        formWindowSelected() to decide which form to show.*/
    this.formWindowChange = function(windowName){
        self.formWindowSelected(windowName);
    };


    this.editInfoFormWindowChange = function(windowName){
        self.editInfoFormWindowSelected(windowName);
    }


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
                    clearInputAddLocation();
                    
                    self.locations.push(location);
                    self.filter(self.searchValue());
                    self.selectLocation(location.name);
                })
                .fail(function(response){
                    
                    //Currently the server does not send a appropriate response. 
                    self.changeFormResponse(response.message);

                    //We do not remove the values of the input fields.
                });
            }
        }
    };


    /*  This function is called when the user submits to the add location form.
        This function takes in markup of the form and lookes through its 
        data-bindings to extract the values of the form. Only the name value is 
        needed to add a location. The form is found in partials/addLocationForm.ejs   */
    this.submitUpdateLocation = function(data){

        //If we receive the form
        if(data){
            
            //Here we take the data-bindings of the input values of the form
            let location = {
                name : self.selectedLocation.name(),
                address : self.selectedLocation.address() || "",
                summary: self.selectedLocation.summary() || "",
                oldName: self.selectedLocation.oldName()
            }

            console.log(location);

            //This is the AJAX Promise of the PSOT to the API
            let promise = updateLocation(location);

            //If we have a name value
            if(location.name){
                promise.done(function(response){

                    //Currently the server does not send a appropriate response. 
                    //self.changeFormResponse(response.message);
                    console.log(response);
                    getLocations(self.searchValue());
                })
                .fail(function(response){
                    
                    //Currently the server does not send a appropriate response. 
                    //self.changeFormResponse(response.message);
                    console.log(response);

                    //We do not remove the values of the input fields.
                });
            }
        }
    };


    /*  This Function deletes the currently selected location and then 
        removes the values of the selectedLocation observable   */
    this.deleteLocation = function(data){

        if(!data){
            return false;
        }

        let location = data;

        let promise = deleteLocation(data);

        promise.done(function(response){
            clearSelectedLocation();
            getLocations(self.searchValue());
        })
        .fail(function(response){
            console.log(response);
        });

    };


    this.submitLocationNotes = function(data){

        let locationName = self.selectedLocation.name();
        let locationNotes = self.selectedLocation.notes();
        let newNote = self.selectedLocation.selectedNote();

        locationNotes.push(newNote);

        let location = {
            name: locationName,
            notes: locationNotes
        };

        console.log(location);
        
        let promise = updateLocationNotes(location);

        promise.done(function(response){
            console.log(response);
            clearAddNote();
            getLocations(self.searchValue());
        })
        .fail(function(response){
            console.log("There was a problem sending your note.");
        });
        
    }


    this.searchQueryEntered = function(value, event){
        self.filter(self.searchValue());
        return true;
    };


    this.filter = function(value){
        //Create a pattern from the value passed in to test() while searching
        let patt = RegExp(value);
        
        //reference to locations
        let locations = self.locations();

        let foundLocations = [];

        //If we are filtering by keyword. 
        if(value){
            if(value.charAt(0) === '#'){
                let splitKey = value.split('#')
                let keyword = splitKey[1].toLowerCase();

                locations.forEach(function(loc) {
                    if(loc.keywords.includes(keyword)){
                        foundLocations.push(loc);
                    }
                }, this);
            }
            //Search by name if no using keyword search
            else if(value.charAt(0) != '#'){
                locations.forEach(function(loc) {
                    if(patt.test(loc.name)){
                        foundLocations.push(loc);
                    }
                }, this);
            }
        }
        //default foundLocations[] to entire locationsList[] if all cases fail
        else{
            foundLocations = locations;
        }

        //Filter location markers. Function found in map.js
        self.filteredLocations(foundLocations);
    };

}
