(function (helper) {
    'use strict';

    function BeerCatalog(name) {
        this.webStorage = new app.WebStorage(name);
        this.punkApi = new app.PunkApi();

        this.beerModel = new app.BeerModel(this.webStorage, this.punkApi);
        this.beerListTemplate = new app.BeerListTemplate();
        this.beerListView = new app.BeerListView(this.beerListTemplate);
        this.beerController = new app.BeerController(this.beerModel, this.beerListView);

        this.sliderModel = new app.SliderModel();
        this.sliderTemplate = new app.SliderTemplate();
        this.sliderView = new app.SliderView(this.sliderTemplate);
        this.sliderController = new app.SliderController(this.sliderModel, this.SliderView);
        this.beerCatalogRouter = new app.Router();
    }

    function BeerListController(name) {
        this.webStorage = new self.app.WebStorage(name);
        this.punkApi = new self.app.PunkApi();

        this.beerModel = new app.BeerModel(this.webStorage, this.punkApi);
        this.beerListTemplate = new app.BeerListTemplate();
        this.beerListView = new app.BeerListView(this.beerListTemplate);
        this.beerController = new app.BeerController(this.beerModel, this.beerListView);
    }

    var beerCatalog = new BeerCatalog('beerCatalog');
    var beerListController = new BeerListController('beerList');

    function initRouter() {
        beerCatalog.beerCatalogRouter.addRoute('home', '/', function () {
            console.log('home');
        }).addRoute('slider', '/slider', function () {
            console.log('slider');
        }).addRoute('favorites', '/favorites', function () {
            console.log('favorites');
        }).addRoute('home', '/', function () {
            console.log('/');
        }).addRoute('favorite', '/favorites/details', function () {
            console.log('/favorites/details');
        });

        beerCatalog.beerCatalogRouter.init();

        // (function dashboardController() {
        //     //Scope specific elements
        //     var header = document.createElement("h1");
        //     header.textContent = "Home";
        //     //Return initializer function
        //     return function initialize() {
        //         //Apply route
        //         appArea.appendChild(header);
        //         //Destroy elements on exit
        //         Router.onScopeDestroy(homeExitController);
        //     };
        //     //Unloading function
        //     function homeExitController() {
        //         appArea.removeChild(header);
        //     }
        // })());

        //Add dashboard route
        // beerCatalog.router.addRoute("home", "", (function dashboardController() {
        //     //Scope specific elements
        //     var header = document.createElement("h1");
        //     header.textContent = "Home";
        //     var links = document.createElement("ol");
        //     links.innerHTML = "<li><a href=\"#beers\">All beers</a></li><li><a href=\"#favorites\">Favorites</a></li>";
        //     //Return initializer function
        //     return function initialize() {
        //         //Apply route
        //         appArea.appendChild(header);
        //         appArea.appendChild(links);
        //         //Destroy elements on exit
        //         beerCatalog.router.onScopeDestroy(dashboardExitController);
        //     };
        //     //Unloading function
        //     function dashboardExitController() {
        //         appArea.removeChild(header);
        //         appArea.removeChild(links);
        //     }
        // })());

        // //Add other routes
        // beerCatalog.router.addRoutes([
        //     {
        //         name: "beers",
        //         url: "beers",
        //         callback: (function todoController() {
        //             //Scope specific elements
        //             var header = document.createElement("h1");
        //             header.textContent = "All beers";
        //             var links = document.createElement("ol");
        //             links.innerHTML = "<li><a href=\"#\">Home</a></li><li><a href=\"#favorites\">Favorites</a></li>";
        //             //Return initializer function
        //             return function initialize() {
        //                 //Apply route
        //                 appArea.appendChild(header);
        //                 appArea.appendChild(links);
        //                 //Destroy elements on exit
        //                 beerCatalog.router.onScopeDestroy(todoExitController);
        //             };
        //             //Unloading function
        //             function todoExitController() {
        //                 appArea.removeChild(header);
        //                 appArea.removeChild(links);
        //             }
        //         })()
        //     },
        //     {
        //         name: "favorites",
        //         url: "favorites",
        //         callback: (function calendarController() {
        //             //Scope specific elements
        //             var header = document.createElement("h1");
        //             header.textContent = "My favorites";
        //             var links = document.createElement("ol");
        //             links.innerHTML = "<li><a href=\"#\">Home</a></li><li><a href=\"#beers\">All beers</a></li>";
        //             //Return initializer function
        //             return function initialize() {
        //                 //Apply route
        //                 appArea.appendChild(header);
        //                 appArea.appendChild(links);
        //                 //Destroy elements on exit
        //                 beerCatalog.router.onScopeDestroy(calendarExitController);
        //             };
        //             //Unloading function
        //             function calendarExitController() {
        //                 appArea.removeChild(header);
        //                 appArea.removeChild(links);
        //             }
        //         })()
        //     }
        // ]);
    }

    var init = function () {
        initRouter();
    };

    helper.on(window, 'load', init);

})(Helper || {});