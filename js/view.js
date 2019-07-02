(function (window) {
    function View(template) {
        this.template = template;
        this.$beersList = Helper.qs('#beer-list');
        this.$beersCounter = Helper.qs('#beer-count');
    };

    View.prototype._setFilter = function (currentPage) {
        Helper.qs('#filters .selected').className = '';
        Helper.qs('#filters [href="#/' + currentPage + '"]').className = 'selected';
    };

    View.prototype.render = function (viewCmd, parameter) {
        var self = this;
        var viewCommands = {
            showEntries: function () {
                self.$beersList.innerHTML = self.template.show(parameter);
            },
            updateElementCount: function () {
                self.$beersCounter.innerHTML = self.template.itemCounter(parameter);
            },
            setFilter: function () {
                self._setFilter(parameter);
            }
        };

        viewCommands[viewCmd]();
    };

    View.prototype.bind = function (event, handler) {
        var self = this;
        if (event === 'itemToggle') {
            Helper.live('', 'click', function () {
                handler({
                    id: self._itemId(this),
                    starred: this.checked
                });
            });
        }
    };

    View.prototype._itemId = function (element) {
        var li = Helper.parent(element, 'li');
        return parseInt(li.dataset.id, 10);
    };

    window.app = window.app || {};
    window.app.View = View;
}(window, Helper || {}));