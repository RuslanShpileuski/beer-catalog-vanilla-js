var HTTP = (function () {
    return {
        get: function (url, callback) {
            var xhr = new XMLHttpRequest();

            // fix IE8/9
            if (!('withCredentials' in xhr)) {
                xhr = new XDomainRequest();
            }
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    callback(xhr.responseText);
                }
            }
            xhr.open("GET", url, true);
            xhr.send(null);
        }
    }
}())