"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

/**
 * Created by Pencroff on 29/01/2015.
 */

var StopWatch = (function () {
    function StopWatch(flow, deps) {
        this.timeMeater = deps.timeMeter;
        this.storage = deps.storage;
    }

    _prototypeProperties(StopWatch, null, {
        start: {
            value: function start() {},
            writable: true,
            enumerable: true,
            configurable: true
        },
        finish: {
            value: function finish() {},
            writable: true,
            enumerable: true,
            configurable: true
        },
        step: {
            value: function step() {},
            writable: true,
            enumerable: true,
            configurable: true
        },
        addStepDetails: {
            value: function addStepDetails() {},
            writable: true,
            enumerable: true,
            configurable: true
        }
    });

    return StopWatch;
})();

module.exports = StopWatch;