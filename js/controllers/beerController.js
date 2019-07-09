(function (window) {
    function BeerController(model, view) {
        var self = this;
        self.model = model;
        self.view = view;

        self.view.bind('itemShowDetails', function (item) {
            self.showDetails(item.id);
        });
    };

    BeerController.prototype.showBeers = function () {
        var self = this;
        self.model.readBeers(function (beers) {
            beers = JSON.parse(beers);
            self.view.render('showEntries', beers);
        });
    };

    BeerController.prototype.showDetails = function (item) {
        Router.navigate('/beer-details/' + item);
    };

    BeerController.prototype.showBeerDetails = function (item) {
        var self = this;
        self.model.readBeers(item[0].id, function (data) {
            beers = JSON.parse(data);
            self.view.render('showEntries', beers);
        });
    }

    // Export to window
    window.app = window.app || {};
    window.app.BeerController = BeerController;
})(window);