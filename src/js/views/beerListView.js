(function (window, $help) {

    function BeerListView(template) {
        this.template = template;
        this.$beersList = $help.qs('#beer-list');
        this.$beersCounter = $help.qs('#beer-count');
    };

    BeerListView.prototype.render = function (viewCmd, parameter) {
        var self = this;
        var viewCommands = {
            showEntries: function () {
                self.$beersList.innerHTML = self.template.show(parameter);
            },
            updateElementCount: function () {
                self.$beersCounter.innerHTML = self.template.itemCounter(parameter);
            },
        };

        viewCommands[viewCmd]();
    };

    BeerListView.prototype.bind = function (event, handler) {
        var self = this;
        if (event === 'itemShowDetails') {
            $help.live('#beer-list li button', 'click', function () {
                handler({
                    id: self._itemId(this)
                });
            });
        }
    };

    BeerListView.prototype._itemId = function (element) {
        var li = Helper.parent(element, 'li');
        return parseInt(li.dataset.id, 10);
    };

    window.app = window.app || {};
    window.app.BeerListView = BeerListView;
}(window, Helper || {}));