(function (window) {

    function BeerController(model, view) {
        var self = this;
        self.model = model;
        self.view = view;

        self.view.bind('itemToggle', function (item) {
			self.toggleFavorite(item.id, item.favorite);
		});
    };

    BeerController.prototype.toggleFavorite = function (id, favorite, silent) {
		var self = this;
		self.model.update(id, { favorite: favorite }, function () {
			self.view.render('elementFavorite', {
				id: id,
				favorite: favorite
			});
		});

		if (!silent) {
			self._filter();
		}
	};

    BeerController.prototype.setView = function (locationHash) {
        var route = locationHash.split('/')[1];
        var currentPage = route || '';
        this._updateFilterState(currentPage);
    };

    BeerController.prototype.showAll = function () {
        var self = this;
        self.model.read(function (data) {
            self.view.render('showEntries', data);
        });
    };

    BeerController.prototype.showFavorite = function () {
        var self = this;
        self.model.read({ favorite: true }, function (data) {
            self.view.render('showEntries', data);
        });
    };

    BeerController.prototype._updateFilterState = function (currentPage) {
        this._activeRoute = currentPage;

        if (currentPage === '') {
            this._activeRoute = 'All'
        }

        this._filter();

        this.view.render('setFilter', currentPage);
    };

    BeerController.prototype._filter = function (force) {
        var activeRoute = this._activeRoute.charAt(0).toUpperCase() + this._activeRoute.substr(1);

        // Update the elements on the page, which change with each completed todo
        this._updateCount();

        // If the last active route isn't "All", or we're switching routes, we
        // re-create the todo item elements, calling:
        //   this.show[All|Active|Completed]();
        if (force || this._lastActiveRoute !== 'All' || this._lastActiveRoute !== activeRoute) {
            this['show' + activeRoute]();
        }

        this._lastActiveRoute = activeRoute;
    };

    BeerController.prototype._updateCount = function () {
        var self = this;
        self.model.getCount(function (beers) {
            self.view.render('updateElementCount', beers.favorite);
        });
    };

    // Export to window
    window.app = window.app || {};
    window.app.BeerController = BeerController;
})(window);