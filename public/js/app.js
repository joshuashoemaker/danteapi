let VM = function(){

    let self = this;

    this.locationsPanel = new LocationsPanel();

    this.openedPanel = ko.observable('none');
    this.openPanel = function(panelName){
        self.openedPanel(panelName);
    };

}

let LocationsPanel = function(){
    
    let self = this;

    this.formWindowSelected = ko.observable('add');

    this.formWindowChange = function(windowName){
        self.formWindowSelected(windowName);
    };

}

let PersonsPanel= function(){
    
    let self = this;

}

ko.applyBindings(VM());