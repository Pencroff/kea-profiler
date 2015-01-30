/**
 * Created by sergii.danilov on 30/01/2015.
 */

var env = process.env.Not_Gulp_Env ? 'src' : 'lib',
    expect = require('chai').expect,
    StopWatchCtor = require('../' + env + '/StopWatch'),
    StorageCtor = require('../' + env + '/Storage'),
    TimeMeter = require('../' + env + '/TimeMeter');

describe('Time meter', function () {
    var stopwatch,
        storage = new StorageCtor();
    beforeEach(function (done) {
        stopwatch = new StopWatchCtor('Flow', {
                timemeter: TimeMeter,
                storage: storage
            });
        done();
    });
    it('should use constructor dependency', function (done) {
        expect(stopwatch.flowName).to.equal('Flow');
        expect(stopwatch.timemeter).to.equal(TimeMeter);
        expect(stopwatch.storage).to.equal(storage);
        done();
    });
});
