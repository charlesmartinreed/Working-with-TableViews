var resourceLoader;

//App.onLaunch is the entry point of Javascript - TVML context will enter here
App.onLaunch = function(options) {
  var javascriptFiles = [
    //used to make our app aware of our additional classes
    `${options.BASEURL}js/ResourceLoader.js`,
    `${options.BASEURL}js/Presenter.js`
  ];

  evaluateScripts(javascriptFiles, function(success) {
    if (success) {
      resourceLoader = new ResourceLoader(options.BASEURL);
      resourceLoader.loadResource(`${options.BASEURL}templates/RWDevConTemplate.xml.js`, function(resource) {
        var doc = Presenter.makeDocument(resource);
        Presenter.pushDocument(doc);
      });
    } else {
      // handle the error by presenting the alert with navigationDocument
      var error = createAlert("Error: Missing or incorrect script config", "Error while attempting to evaluate external JS files");
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
