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
        console.log('seek: ');
        console.log(options);
    };

    BeerController.prototype.init = function (args) {
        var self = this;
        self.beerModel = args.beerModel;
        self.beerView = args.beerView;
        self.sliderModel = args.sliderModel;
        self.sliderView = args.sliderView;
        self.searchModel = args.searchModel;
        self.searchView = args.searchView;

        self.beerView.bind('itemShowDetails', function (item) {
            Router.navigate('/beer/' + item.id);
        });

        self.beerView.bind('nextPage', function (args) {
            self.beerModel.pagination.page++;
            self.beerModel.pagination.lastBeerId = args.lastBeerId;
            Router.navigate(['/page/', pagination.page, '/perPage/', pagination.perPage].join(''));
        });

        // search
        self.searchView.render('show');

        // slider filters
        self.sliderView.render('show', { id: 'abvSlider', name: 'Alcohol by volume' });
        self.sliderView.render('show', { id: 'ibuSlider', name: 'International Bitterness Units' });
        self.sliderView.render('show', { id: 'cbebcSlider', name: 'Color by EBC' });

        self.sliderView.bind('change', function (settings) {
            self.seek(settings);
        });

        self.sliderView.bind('change', function (settings) {
            self.seek(settings);
        });

        self.searchView.bind('oninput', function (settings) {
            self.seek(settings);
        });
    };

    // Export to window
    window.app = window.app || {};
    window.app.BeerController = BeerController;
})(window);