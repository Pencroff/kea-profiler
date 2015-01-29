/**
 * Created by sergii.danilov on 20/10/2014.
 */
var StopWatch = function () {
    this.history = [];
    this.startTime = 0;
    this.stopTime = 0;
    this.running = false;
};

StopWatch.prototype.currentTime = (function () {
    var performance = !!window.performance,
        fn;
    if (performance) {
        fn = function () {
            return window.performance.now();
        }
    } else {
        fn = function () {
            return new Date().getTime();
        }
    }
    return fn;
})();

StopWatch.prototype.start = function () {
    this.history = [];
    this.startTime = this.currentTime();
    this.running = true;
};

StopWatch.prototype.stop = function (name) {
    this.stopTime = this.currentTime();
    this.running = false;
    this.printElapsed(name);
};

StopWatch.prototype.getElapsedMilliseconds = function () {
    if (this.running) {
        this.stopTime = this.currentTime();
    }
    return this.stopTime - this.startTime;
};


StopWatch.prototype.printElapsed = function (name) {
    var currentName = name || 'Elapsed:',
        ms = this.getElapsedMilliseconds();
    this.history.push({name: name, time: ms});
    console.log(currentName, '[' + ms + ' ms]');
};

StopWatch.prototype.printHistory = function () {
    var arr = this.history,
        prevTime = 0,
        stat = {},
        round3Dig = function (v) {
            var res = v * 1000;
            res = Math.round(res);
            return res / 1000;
        },
        len, i, item, prop,
        time, delta;
    len = arr.length;
    for (i = 0; i < len; i += 1) {
        item = arr[i];
        time = round3Dig(item.time);
        delta = round3Dig(time - prevTime);
        console.log(item.name, '[' + time + ' ms]', '- it takes [' + delta + ' ms]');
        prevTime = time;
        if (stat[item.name]) {
            stat[item.name] += 1;
        } else {
            stat[item.name] = 1;
        }
    }
    time = round3Dig(time - arr[0].time);
    console.log('Full cycle:', '[' + time + ' ms]');
    for (prop in stat) {
        console.log(prop + ':', stat[prop] + ' times');
    }
    return time;
};

StopWatch.prototype.clearHistory = function () {
    this.history = [];
};

var sw = new StopWatch();