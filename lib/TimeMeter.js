"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

/**
 * Created by sergii.danilov on 28/01/2015.
 */

var TimeMeter = (function () {
    function TimeMeter() {}

    _prototypeProperties(TimeMeter, {
        getMeasure: {
            value: function getMeasure() {
                return [1, 3];
            },
            writable: true,
            enumerable: true,
            configurable: true
        }
    });

    return TimeMeter;
})();

module.exports = TimeMeter;