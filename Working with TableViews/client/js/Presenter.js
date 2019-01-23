var Presenter = {
    //creates a TVML document 
    makeDocument: function(resource) {
        if (!Presenter.parser) {
            Presenter.parser = new DOMParser(); //convert TVML string into object
        }
        var doc = Presenter.parser.parseFromString(resource, "applicaiton/xml");
        return doc
    }, 
    //takes a TVML document and presents it onscreen, modally
    modalDialogPresenter: function(xml) {
        navigationDocument.presentModal(xml);
    },
    //takes a TVML document and pushes it onto the navigation stack
    pushDocument: function(xml) {
        navigationDocument.pushDocument(xml);
    },
}