(function (window) {

    function SliderController(model, view) {
        var self = this;
        self.model = model;
        self.view = view;
    };

    // Export to window
    window.app = window.app || {};
    window.app.SliderController = SliderController;
})(window);