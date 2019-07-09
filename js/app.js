(function (helper) {
    'use strict';

    function BeerCatalog(name) {
        // Data
        this.webStorage = new app.WebStorage(name);
        this.punkApi = new app.PunkApi();

        // MVC 
        this.beerModel = new app.BeerModel(this.webStorage, this.punkApi);
        this.beerListTemplate = new app.BeerListTemplate();
        this.beerListView = new app.BeerListView(this.beerListTemplate);
        this.beerController = new app.BeerController(this.beerModel, this.beerListView);
        this.sliderModel = new app.SliderModel();
        this.sliderTemplate = new app.SliderTemplate();
        this.sliderView = new app.SliderView(this.sliderTemplate);
    }

    var beerCatalog = new BeerCatalog('beerCatalog');

    function initRouter() {
        Router.config({}).add('/landing-page', function () {
            beerCatalog.beerController.showBeers();
        }).add('/beer-details/:id', function () {
            beerCatalog.beerController.showBeerDetails(arguments);
        });

        Router.navigate('/landing-page')

        Router.listen();
    }

    var start = function () {
        initRouter();
    };

    helper.on(window, 'load', start);

})(Helper || {}, Router || {});