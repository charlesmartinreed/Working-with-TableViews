
//App.onLaunch is the entry point of Javascript - TVML context will enter here
App.onLaunch = function(options) {
  var javascriptFiles = [
    `${options.BASEURL}js/Presenter.js` //makes app aware of our additional classes
  ];
  evaluateScripts(javascriptFiles, function(success) {
    if (success) {
      var alert = createAlert("Hello world!", "");
      Presenter.modalDialogPresenter(alert);
    } else {
      // handle the error by presenting the alert with navigationDocument
      var error = createAlert("Error: Missing or incorrect script config", "");
      navigationDocument.presentModal(error)
    }
  });
}

//createAlert returns a TVML document. Analogous to UIAlertController.
var createAlert = function(title, description) {
  var alertString = `<?xml version="1.0" encoding="UTF-8" ?>
    <document>
      <alertTemplate> //one of Apple's included templates for laying out TVML apps
        <title>${title}</title>
        <description>${description}</description>
        <button>
          <text>OK</text>
        </button>
      </alertTemplate>
    </document>`
    var parser = new DOMParser();
    var alertDoc = parser.parseFromString(alertString, "application/xml");
    return alertDoc
}
