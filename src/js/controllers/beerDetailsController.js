(function (window) {
    function BeerDetailsController(args) {
        this.init(args);
    }

    BeerDetailsController.prototype.details = function (param) {
        var self = this;
        self.beerModel.read(param.id, function (beer) {
            self.beerDetailsView.render('show', JSON.parse(beer));
        });
    };

    BeerDetailsController.prototype.init = function (args) {
        var self = this;
        self.beerModel = args.beerModel;
        self.beerDetailsView = args.beerDetailsView;
    };

    window.app = window.app || {};
    window.app.BeerDetailsController = BeerDetailsController;
}(window))