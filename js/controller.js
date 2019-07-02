(function (window) {

    function Controller(model, view) {
        var self = this;
        self.model = model;
        self.view = view;

        self.view.bind('itemToggle', function (item) {
			that.toggleComplete(item.id, item.starred);
		});
    };

    Controller.prototype.toggleComplete = function (id, starred, silent) {
		var self = this;
		self.model.update(id, { starred: starred }, function () {
			self.view.render('elementComplete', {
				id: id,
				completed: completed
			});
		});

		if (!silent) {
			self._filter();
		}
	};

    Controller.prototype.setView = function (locationHash) {
        var route = locationHash.split('/')[1];
        var currentPage = route || '';
        this._updateFilterState(currentPage);
    };

    Controller.prototype.showAll = function () {
        var self = this;
        self.model.read(function (data) {
            self.view.render('showEntries', data);
        });
    };

    Controller.prototype.showStarred = function () {
        var self = this;
        self.model.read({ starred: true }, function (data) {
            self.view.render('showEntries', data);
        });
    };

    Controller.prototype._updateFilterState = function (currentPage) {
        this._activeRoute = currentPage;

        if (currentPage === '') {
            this._activeRoute = 'All'
        }

        this._filter();

        this.view.render('setFilter', currentPage);
    };

    Controller.prototype._filter = function (force) {
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

    Controller.prototype._updateCount = function () {
        var self = this;
        self.model.getCount(function (beers) {
            self.view.render('updateElementCount', beers.starred);
        });
    };

    // Export to window
    window.app = window.app || {};
    window.app.Controller = Controller;
})(window);