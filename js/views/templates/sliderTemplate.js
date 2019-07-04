(function (window) {
    function SliderTemplate(settings) {
        this.defaultTemplate =
            "<div>{{filterType}}</div>"
            + '<input type="range" min="{{minValue}}" max="{{maxValue}}" value="{{currentValue}}" id="{{id}}">';
        if (!settings) {
            this.defaultSettings = {
                minValue: 1,
                maxValue: 100,
                currentValue: 50
            }
        }
    };

    SliderTemplate.prototype.build = function (id, filterType) {
        template = template.replace('{{filterType}}', filterType)
        template = template.replace('{{id}}', id);
        template = template.replace('{{minValue}}', this.defaultSettings.minValue);
        template = template.replace('{{maxValue}}', this.defaultSettings.maxValue);
        template = template.replace('{{currentValue}}', this.defaultSettings.currentValue);
        view = view + template;
        return view;
    }

    window.app = window.app || {};
    window.app.SliderTemplate = SliderTemplate;
}(window));