(function (window, $help) {

    function BeerDetailsView(template) {
        this.template = template;
        this.$beersList = $help.qs('#beer-list');
    };

    BeerDetailsView.prototype.render = function (viewCmd, item) {
        var self = this;
        var viewCommands = {
            show: function () {
                self.$beersList.innerHTML = self.template.show(item);
            }
        };

        viewCommands[viewCmd]();
    };

    BeerDetailsView.prototype.bind = function (event, handler) {

    };

    window.app = window.app || {};
    window.app.BeerDetailsView = BeerDetailsView;
}(window, Helper || {}));