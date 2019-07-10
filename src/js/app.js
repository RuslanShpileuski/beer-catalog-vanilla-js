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
        Router.config({mode: ''}).add('/landing-page', function () {
            console.log('landing-page request');
            beerCatalog.beerController.showBeers();
        }).add('/beer-details/:id', function () {
            console.log('beer-details request');
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