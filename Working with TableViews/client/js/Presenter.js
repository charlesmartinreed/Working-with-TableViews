var Presenter = {
    //creates a TVML document 
    //if you can read this, the files are working
    makeDocument: function(resource) {
        if (!Presenter.parser) {
            Presenter.parser = new DOMParser(); //convert TVML string into object
        }
        var doc = Presenter.parser.parseFromString(resource, "application/xml");
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
    //video player
    //load is analogous to an @IBAction, event is similar to the sender arg
    load: function(event) {
        var self = this,
        ele = event.target, //"target" refers to our lockup elements; each event has a target
        videoURL = ele.getAttribute("videoURL") //see Template file. This attribute is defined in our lockup.
        if (videoURL) {
            var player = new Player(); //Player class provided by TVJS framework
            var playlist = new Playlist();
            var mediaItem = new MediaItem("video", videoURL);

            player.playlist = playlist;
            player.playlist.push(mediaItem);
            player.present();
        }
    },
}
