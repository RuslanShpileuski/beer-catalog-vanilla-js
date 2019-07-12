(function (window, $help) {

    function SliderView(template) {
        this.template = template;
        this.$filters = $help.qs('#filters');
    };

    SliderView.prototype.OnRangeValueChanged = 'onRangeValueChanged';
    SliderView.prototype.OnRangeValueChanging = 'onRangeValueChanging';

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
        if (event === SliderView.prototype.OnRangeValueChanged) {
            $help.live('#filters input', 'change', function () {
                var inputElements = $help.qsa('#filters input');
                var data = {
                    abv_gt: 0,
                    ibu_gt: 0,
                    ebc_gt: 0
                };

                for (var i = 0; i < inputElements.length; i++) {
                    var el = inputElements[i];
                    if (el.value) {
                        if (el.id === 'abvSlider') {
                            data.abv_gt = el.value;
                        } else if (el.id === 'ibuSlider') {
                            data.ibu_gt = el.value;
                        } else if (el.id === 'cbebcSlider') {
                            data.ebc_gt = el.value;
                        }
                    }
                }
                handler(data);
            });
        } else if (event === SliderView.prototype.OnRangeValueChanging) {
            $help.live('#filters input', 'input', function () {
                this.nextSibling.innerText = this.value;
                handler(this);
            });
        }
    };

    window.app = window.app || {};
    window.app.SliderView = SliderView;
}(window, Helper || {}));