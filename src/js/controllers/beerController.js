(function (window) {
    function BeerController(model, view) {
        var self = this;
        self.model = model;
        self.view = view;
        self.page = 1;

        self.view.bind('itemShowDetails', function (item) {
            self.showDetails(item.id);
        });

        self.view.bind('loadNextPage', function () {
            console.log('loadNextPage');
            //Router.navigate('/page/' + self.page + '/perPage/' + 9);
            self.loadNextPage({ page: self.page++, resultPerPage: 9 });
        });
    };

    BeerController.prototype.loadNextPage = function (pagination) {
        var self = this;
        console.log(pagination);
        self.model.readBeers(pagination, function (beers) {
            if (!Helper.isEmptyObject(beers)) {
                beers = JSON.parse(beers);
                self.view.render('appendEntries', beers);
            }
        });
    };

    BeerController.prototype.showBeers = function () {
        var self = this;
        self.model.readBeers({ page: 1, resultPerPage: 9 }, function (beers) {
            beers = JSON.parse(beers);
            self.view.render('showEntries', beers);
        });
    };

    BeerController.prototype.showDetails = function (id) {
        Router.navigate('/beer/' + id);
    };

    BeerController.prototype.showBeerDetails = function (parameters) {
        var self = this;
        self.model.readBeers(parameters.id, function (data) {
            beers = JSON.parse(data);
            self.view.render('showEntries', beers);
        });
    }

    // Export to window
    window.app = window.app || {};
    window.app.BeerController = BeerController;
})(window);