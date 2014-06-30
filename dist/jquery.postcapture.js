/*!
 * jQuery Validation Plugin v0.0.1
 *
 * https://github.com/ssut/jQuery-PostCapture
 *
 * Copyright (c) 2014 ssut (SuHun Han)
 * Released under the BSD 3-Clause license
 */
(function(factory) {
	if (typeof define === 'function' && define.amd) {
		define(['jquery'], factory);
	} else {
		factory(window.jQuery);
	}
}(function($) {

// Create chainable jQuery plugin:
$.fn.capture = function (options, args) {
    if (!this.is('form')) {
        return;
    }

    var action = function () {
        var data = {};
        var elements = $(this).find('[name]');

        for (var i = 0; i < elements.length; i++) {
            var self = elements.eq(i);
            var name = self.prop('name');
            var type = self.prop('type').toLowerCase();
            var value = self.val();

            if (type == 'checkbox') {
                // multiple checkbox
                if (name.indexOf('[]') > -1) {
                    if (!data.hasOwnProperty(name)) {
                        data[name] = [];
                    }
                    data[name].push(value);
                } else {
                    data[name] = 'on';
                }
            } else if (type == 'radio') {
                if (value !== '') {
                    data[name] = value;
                } else {
                    data[name] = 'on';
                }
            } else if (type == 'file') {

            } else {
                data[name] = value;
            }
        }
    };

    this.submit(action);
};

$.captures = function (key) {
    
};

/*!
* jQuery Cookie Plugin v1.4.1
* https://github.com/carhartl/jquery-cookie
*
* Copyright 2013 Klaus Hartl
* Released under the MIT license
*/

var pluses = /\+/g;

function encode(s) {
    return config.raw ? s : encodeURIComponent(s);
}

function decode(s) {
    return config.raw ? s : decodeURIComponent(s);
}

function stringifyCookieValue(value) {
    return encode(config.json ? JSON.stringify(value) : String(value));
}

function parseCookieValue(s) {
    if (s.indexOf('"') === 0) {
        // This is a quoted cookie as according to RFC2068, unescape...
        s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
    }

    try {
        // Replace server-side written pluses with spaces.
        // If we can't decode the cookie, ignore it, it's unusable.
        // If we can't parse the cookie, ignore it, it's unusable.
        s = decodeURIComponent(s.replace(pluses, ' '));
        return config.json ? JSON.parse(s) : s;
    } catch(e) {}
}

function read(s, converter) {
    var value = config.raw ? s : parseCookieValue(s);
    return $.isFunction(converter) ? converter(value) : value;
}

var config = $.cookie = function (key, value, options) {

    // Write

    if (value !== undefined && !$.isFunction(value)) {
        options = $.extend({}, config.defaults, options);

        if (typeof options.expires === 'number') {
            var days = options.expires, t = options.expires = new Date();
            t.setTime(+t + days * 864e+5);
        }

        return (document.cookie = [
            encode(key), '=', stringifyCookieValue(value),
            options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
            options.path    ? '; path=' + options.path : '',
            options.domain  ? '; domain=' + options.domain : '',
            options.secure  ? '; secure' : ''
        ].join(''));
    }

    // Read

    var result = key ? undefined : {};

    // To prevent the for loop in the first place assign an empty array
    // in case there are no cookies at all. Also prevents odd result when
    // calling $.cookie().
    var cookies = document.cookie ? document.cookie.split('; ') : [];

    for (var i = 0, l = cookies.length; i < l; i++) {
        var parts = cookies[i].split('=');
        var name = decode(parts.shift());
        var cookie = parts.join('=');

        if (key && key === name) {
            // If second argument (value) is a function it's a converter...
            result = read(cookie, value);
            break;
        }

        // Prevent storing a cookie that we couldn't decode.
        if (!key && (cookie = read(cookie)) !== undefined) {
            result[name] = cookie;
        }
    }

    return result;
};

config.defaults = {};

$.removeCookie = function (key, options) {
    if ($.cookie(key) === undefined) {
        return false;
    }

    // Must not alter options, thus extending a fresh object...
    $.cookie(key, '', $.extend({}, options, { expires: -1 }));
    return !$.cookie(key);
};
}));