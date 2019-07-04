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

        this.router = new app.Router();
    }

    var beerCatalog = new BeerCatalog('beerCatalog');

    function setView() {
        beerCatalog.beerController.setView(document.location.hash);
    }

    function initRouter() {

        var appArea = document.body.appendChild(document.createElement("div"));

        //Add dashboard route
        beerCatalog.router.addRoute("home", "", (function dashboardController() {
            //Scope specific elements
            var header = document.createElement("h1");
            header.textContent = "Home";
            //Return initializer function
            return function initialize() {
                //Apply route
                appArea.appendChild(header);
                //Destroy elements on exit
                Router.onScopeDestroy(homeExitController);
            };
            //Unloading function
            function homeExitController() {
                appArea.removeChild(header);
            }
        })());

        //Add dashboard route
        beerCatalog.router.addRoute("home", "", (function dashboardController() {
            //Scope specific elements
            var header = document.createElement("h1");
            header.textContent = "Home";
            var links = document.createElement("ol");
            links.innerHTML = "<li><a href=\"#beers\">All beers</a></li><li><a href=\"#favorites\">Favorites</a></li>";
            //Return initializer function
            return function initialize() {
                //Apply route
                appArea.appendChild(header);
                appArea.appendChild(links);
                //Destroy elements on exit
                beerCatalog.router.onScopeDestroy(dashboardExitController);
            };
            //Unloading function
            function dashboardExitController() {
                appArea.removeChild(header);
                appArea.removeChild(links);
            }
        })());

        //Add other routes
        beerCatalog.router.addRoutes([
            {
                name: "beers",
                url: "beers",
                callback: (function todoController() {
                    //Scope specific elements
                    var header = document.createElement("h1");
                    header.textContent = "All beers";
                    var links = document.createElement("ol");
                    links.innerHTML = "<li><a href=\"#\">Home</a></li><li><a href=\"#favorites\">Favorites</a></li>";
                    //Return initializer function
                    return function initialize() {
                        //Apply route
                        appArea.appendChild(header);
                        appArea.appendChild(links);
                        //Destroy elements on exit
                        beerCatalog.router.onScopeDestroy(todoExitController);
                    };
                    //Unloading function
                    function todoExitController() {
                        appArea.removeChild(header);
                        appArea.removeChild(links);
                    }
                })()
            },
            {
                name: "favorites",
                url: "favorites",
                callback: (function calendarController() {
                    //Scope specific elements
                    var header = document.createElement("h1");
                    header.textContent = "My favorites";
                    var links = document.createElement("ol");
                    links.innerHTML = "<li><a href=\"#\">Home</a></li><li><a href=\"#beers\">All beers</a></li>";
                    //Return initializer function
                    return function initialize() {
                        //Apply route
                        appArea.appendChild(header);
                        appArea.appendChild(links);
                        //Destroy elements on exit
                        beerCatalog.router.onScopeDestroy(calendarExitController);
                    };
                    //Unloading function
                    function calendarExitController() {
                        appArea.removeChild(header);
                        appArea.removeChild(links);
                    }
                })()
            }
        ]);

        beerCatalog.router.init();
    }

    var init = function () {
        setView();
        initRouter();
    };

    helper.on(window, 'load', init);
    // helper.on(window, 'hashchange', setView);
    //helper.on(window, 'DOMContentLoaded', initRouter);

})(Helper || {});