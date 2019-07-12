(function (helper) {
    'use strict';

    function BeerCatalog(name) {
        // Data
        this.punkAPI = new app.PunkAPI();

        // MVC 
        this.beerModel = new app.BeerModel(this.punkAPI);
        this.beerListTemplate = new app.BeerListTemplate();
        this.beerListView = new app.BeerListView(this.beerListTemplate);
        this.sliderModel = new app.SliderModel();
        this.sliderTemplate = new app.SliderTemplate();
        this.sliderView = new app.SliderView(this.sliderTemplate);
        this.searchModel = new app.SearchModel();
        this.searchTemplate = new app.SearchTemplate();
        this.searchView = new app.SearchView(this.searchTemplate);

        this.beerDetailsTemplate = new app.BeerDetailsTemplate();
        this.beerDetailsView = new app.BeerDetailsView(this.beerDetailsTemplate);

        this.beerController = new app.BeerController({
            beerModel: this.beerModel,
            beerView: this.beerListView,
            sliderModel: this.sliderModel,
            sliderView: this.sliderView,
            searchTemplate: this.searchTemplate,
            searchView: this.searchView
        });

        this.beerDetailsController = new app.BeerDetailsController({
            beerDetailsView: this.beerDetailsView,
            beerModel: this.beerModel
        });
    }

    var beerCatalog = new BeerCatalog('beerCatalog');

    function init() {
        Router.config({ mode: '' }).add('/landing', function () {
            beerCatalog.beerController.next({ page: 1, perPage: 9 });
        }).add('/beer/:id', function (params) {
            beerCatalog.beerDetailsController.details(params);
        }).add('/favorite/:id', function (params) {
            beerCatalog.beerController.markAsFavorite(params);
        }).add('/page/:page/perPage/:perPage', function (params) {
            beerCatalog.beerController.next(params);
        });

        Router.navigate('/landing-page')
        Router.listen();
    }

    helper.on(window, 'load', init);

})(Helper || {}, Router || {});