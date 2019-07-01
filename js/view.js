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
    
    window.app = window.app || {};
    window.app.View = View;
}(window, Helper || {}));