(function (window, $help) {

    function BeerListView(template) {
        this.template = template;
        this.$beersList = $help.qs('#beer-list');
        this.$beersCounter = $help.qs('#beer-count');
    };

    BeerListView.prototype.OnItemOpenShowDetails = 'onItemOpenShowDetails';
    BeerListView.prototype.OnScrollNextPage = 'onScrollNextPage';

    BeerListView.prototype.render = function (viewCmd, parameter) {
        var self = this;
        var viewCommands = {
            showEntries: function () {
                self.$beersList.innerHTML = self.template.show(parameter);
            },
            appendEntries: function () {
                self.$beersList.innerHTML += self.template.show(parameter);
            },
            updateElementCount: function () {
                self.$beersCounter.innerHTML = self.template.itemCounter(parameter);
            },
        };

        viewCommands[viewCmd]();
    };

    BeerListView.prototype.bind = function (event, handler) {
        var self = this;
        if (event === self.OnItemOpenShowDetails) {
            $help.live('#beer-list div button.details', 'click', function () {
                handler({
                    id: self._itemId(this)
                });
            });
        } else if (event === self.OnScrollNextPage) {
            $help.live('scroll', 'scroll', function () {
                $help.onscroll(handler, '#beer-list > div:last-child')
            })
        }
    };

    BeerListView.prototype._itemId = function (element) {
        var div = Helper.parent(element, 'div');
        return parseInt(div.dataset.id, 10);
    };

    window.app = window.app || {};
    window.app.BeerListView = BeerListView;
}(window, Helper || {}));