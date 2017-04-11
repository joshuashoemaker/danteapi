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


    //For any input that relies on only key events
    this.preventForm = function(){
        return false;
    };
}



let PersonsPanel= function(){
    
    let self = this;

}


//  We POST to our API to save a new location. Returns a Promise/
function addLocation(location){
    return $.ajax({
        url: '/addLocation',
        type: 'POST',
        dataType: 'json',
        data: location
    });
}


function updateLocation(location){
    return $.ajax({
        url: '/updateLocation',
        type: 'POST',
        dataType: 'json',
        data: location
    });
}


function deleteLocation(location){
    return $.ajax({
        url: '/deleteLocation',
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
            address : location.address
        };
        locationArray.push(newLocation);
    }, this);
    return locationArray;
}


ko.applyBindings(VM());