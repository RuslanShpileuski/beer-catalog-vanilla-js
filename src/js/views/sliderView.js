(function (window, $help) {

    function SliderView(template) {
        this.template = template;
        this.$filters = $help.qs('#filters');
    };

    SliderView.prototype.render = function (viewCmd, settings) {
        var self = this;
        var viewCommands = {
            showSliders: function () {
                self.$filters.innerHTML = self.template.build(settings);
            }
        };

        viewCommands[viewCmd]();
    };

    window.app = window.app || {};
    window.app.SliderView = SliderView;
}(window, Helper || {}));