(function (helper) {
    'use strict';

    function BeerCatalog(name) {
        // Data
        this.webStorage = new app.WebStorage(name);
        this.punkAPI = new app.PunkAPI();

        // MVC 
        this.beerModel = new app.BeerModel(this.webStorage, this.punkAPI);
        this.beerListTemplate = new app.BeerListTemplate();
        this.beerListView = new app.BeerListView(this.beerListTemplate);
        this.beerController = new app.BeerController(this.beerModel, this.beerListView);
        this.sliderModel = new app.SliderModel();
        this.sliderTemplate = new app.SliderTemplate();
        this.sliderView = new app.SliderView(this.sliderTemplate);
    }

    var beerCatalog = new BeerCatalog('beerCatalog');

    function initRouter() {
        Router.config({ mode: '' }).add('/landing', function () {
            console.log('landing-page request');
            beerCatalog.beerController.showBeers();
        }).add('/beer/:id', function (routeParams) {
            console.log('/beer/:id' + routeParams);
            beerCatalog.beerController.showBeerDetails(routeParams);
        }).add('/page/:page/perPage/:perPage/', function (routeParams) {
            console.log('beers-per-page request ' + routeParams);
            beerCatalog.beerController.loadNextPage(arguments);
        }).add('/favorite/:id', function (routeParams) {
            console.log('favorite request' + routeParams);
            beerCatalog.beerController.markAsFavorite(routeParams);
        });

        Router.navigate('/landing-page')

        Router.listen();
    }

    var start = function () {
        initRouter();
    };

    helper.on(window, 'load', start);


})(Helper || {}, Router || {});