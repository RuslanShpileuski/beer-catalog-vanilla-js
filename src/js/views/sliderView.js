(function (window, $help) {

    function SliderView(template) {
        this.template = template;
        this.$filters = $help.qs('#filters');
    };

    SliderView.prototype.render = function (viewCmd, data) {
        var self = this;
        var viewCommands = {
            show: function () {
                self.$filters.innerHTML += self.template.show(data);
            },
            change: function (id) {
                console.log('drag - id: ' + id);
            }
        };

        viewCommands[viewCmd]();
    };

    SliderView.prototype.bind = function (event, handler) {
        if (event === 'change') {
            $help.live('#filters input#', 'change', function () {
                handler({
                    id: this.id,
                    minValue: this.min,
                    maxValue: this.max,
                    currentValue: this.value
                });
            });
        }
    };

    window.app = window.app || {};
    window.app.SliderView = SliderView;
}(window, Helper || {}));