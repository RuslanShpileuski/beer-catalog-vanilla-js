(function (window) {

    function BeerController(model, view) {
        var self = this;
        self.model = model;
        self.view = view;

        self.view.bind('itemToggle', function (item) {
			self.toggleFavorite(item.id, item.favorite);
		});
    };

    BeerController.prototype.toggleFavorite = function (id, favorite) {
		var self = this;
		self.model.update(id, { favorite: favorite }, function () {
			self.view.render('elementFavorite', {
				id: id,
				favorite: favorite
			});
		});
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

        this.view.render('setFilter', currentPage);
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