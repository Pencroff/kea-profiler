/**
 * Created by Pencroff on 28/01/2015.
 */

var measureFn = (() => {
    var hrTime = !!process && process.hrtime ? true : false,
        performance, fn;
    if (hrTime) {
        fn = function () {
            return process.hrtime();
        }
    } else {
        performance = !!window && window.performance ? true : false;
        if (performance) {
            fn = function () {
                return window.performance.now();
            }
        } else {
            fn = function () {
                return new Date().getTime();
            }
        }
    }
    return fn;
})();

export default class TimeMeter {
    static getMeasure() {
        return measureFn();
    }
    static calculateDelta(start, end) {
        var isStartArr = Array.isArray(start),
            isEndArr = Array.isArray(end),
            secDelta, nanoSecDelta, ms;

        if (isStartArr && isEndArr) {
            secDelta = end[0] - start[0];
            nanoSecDelta = end[1] - start[1];

            ms = secDelta * 1000 + nanoSecDelta / 1000000;
        } else {
            ms = end - start;
        }
        return ms;
    }
    static format(v) {
        var result = Math.round(v * 1000) / 1000;
        return result + ' ms';
    }
}