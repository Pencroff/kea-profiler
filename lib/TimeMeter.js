"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

/**
 * Created by sergii.danilov on 28/01/2015.
 */

var measureFn = (function () {
    var hrTime = !!process && process.hrtime ? true : false,
        performance,
        fn;
    if (hrTime) {
        fn = function () {
            return process.hrtime();
        };
    } else {
        performance = !!window && window.performance ? true : false;
        if (performance) {
            fn = function () {
                return window.performance.now();
            };
        } else {
            fn = function () {
                return new Date().getTime();
            };
        }
    }
    return fn;
})();

var TimeMeter = (function () {
    function TimeMeter() {}

    _prototypeProperties(TimeMeter, {
        getMeasure: {
            value: function getMeasure() {
                return measureFn();
            },
            writable: true,
            enumerable: true,
            configurable: true
        },
        calculateDelta: {
            value: function calculateDelta(start, end) {
                var isStartArr = Array.isArray(start),
                    isEndArr = Array.isArray(end),
                    secDelta,
                    nanoSecDelta,
                    ms;

                if (isStartArr && isEndArr) {
                    secDelta = end[0] - start[0];
                    nanoSecDelta = end[1] - start[1];

                    ms = secDelta * 1000 + nanoSecDelta / 1000000;
                } else {
                    ms = end - start;
                }
                return ms;
            },
            writable: true,
            enumerable: true,
            configurable: true
        },
        format: {
            value: function format(v) {
                var result = Math.round(v * 1000) / 1000;
                return result + " ms";
            },
            writable: true,
            enumerable: true,
            configurable: true
        }
    });

    return TimeMeter;
})();

module.exports = TimeMeter;