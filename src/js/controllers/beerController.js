(function (window) {
    function BeerController(args) {
        this.init(args);
    };

    BeerController.prototype.nextPage = function (pagination) {
        var self = this;
        pagination = pagination || self.beerModel.pagination;
        console.log(pagination);
        self.beerModel.read(pagination, function (beers) {
            self.beerView.render('appendEntries', JSON.parse(beers));
        });
    };

    BeerController.prototype.details = function (param) {
        var self = this;
        self.beerModel.read(param.id, function (beer) {
            self.beerView.render('showEntries', JSON.parse(beer));
        });
    };

    BeerController.prototype.seek = function (options) {
        var self = this;
        self.beerModel.read(options, function (beers) {
            self.beerView.render('showEntries', JSON.parse(beers));
        });
    };

    BeerController.prototype.init = function (args) {
        var self = this;
        self.beerModel = args.beerModel;
        self.beerView = args.beerView;
        self.sliderModel = args.sliderModel;
        self.sliderView = args.sliderView;
        self.searchModel = args.searchModel;
        self.searchView = args.searchView;

        self.beerView.bind('onItemOpenShowDetails', function (item) {
            Router.navigate('/beer/' + item.id);
        });

        self.beerView.bind('onScrollNextPage', function (args) {
            self.beerModel.pagination.page++;
            self.beerModel.pagination.lastBeerId = args.lastBeerId;
            Router.navigate(['/page/', pagination.page, '/perPage/', pagination.perPage].join(''));
        });

        // search
        self.searchView.render('show');

        // slider filters
        self.sliderView.render('show', {
            id: 'abvSlider',
            name: 'Alcohol by volume',
            minValue: 2,
            maxValue: 14,
            currentValue: 9
        });
        self.sliderView.render('show', {
            id: 'ibuSlider',
            name: 'International Bitterness Units',
            minValue: 0,
            maxValue: 120,
            currentValue: 60
        });
        self.sliderView.render('show', {
            id: 'cbebcSlider', 
            name: 'Color by EBC',
            minValue: 4,
            maxValue: 80,
            currentValue: 20
        });

        self.sliderView.bind('onRangeValueChanged', function (attributes) {
            self.seek(attributes);
        });

        self.sliderView.bind('onRangeValueChanging', function (attributes) {
        });

        self.searchView.bind('onSearchValueChanging', function (attributes) {
            self.seek(attributes);
        });
    };

    // Export to window
    window.app = window.app || {};
    window.app.BeerController = BeerController;
})(window);