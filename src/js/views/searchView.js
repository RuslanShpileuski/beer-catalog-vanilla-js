(function (window, $help) {

    function SearchView(template) {
        this.template = template;
        this.$filters = $help.qs('#searches');
    };

    SearchView.prototype.render = function (viewCmd, item) {
        var self = this;
        var viewCommands = {
            show: function () {
                self.$filters.innerHTML += self.template.show(item);
            },
            oninput: function (id) {
                console.log('value - id: ' + id);
            }
        };

        viewCommands[viewCmd]();
    };

    SearchView.prototype.bind = function (event, handler) {
        if (event === 'onSearchValueChanging') {
            $help.live('#searches input#search', 'input', function () {
                handler(this.value);
            });
        }
    };

    window.app = window.app || {};
    window.app.SearchView = SearchView;
}(window, Helper || {}));