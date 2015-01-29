/**
 * Created by Pencroff on 28/01/2015.
 */

var env = process.env.Not_Gulp_Env ? 'src' : 'lib',
    expect = require('chai').expect,
    path = require('path'),
    root = __dirname,
    timeMeter = require('../' + env + '/TimeMeter');

describe('Time meter', function () {
    it('should return measure', function (done) {
        expect(timeMeter.getMeasure()).to.have.length(2);
        done();
    });
    it('should calculate delta for two measures in ms', function (done) {
        var start = timeMeter.getMeasure(),
            end, delta;
        setTimeout(function () {
            end = timeMeter.getMeasure();
            delta = timeMeter.calculateDelta(start, end);
            expect(delta).to.be.at.least(100);
            done();
        }, 100);
        expect(timeMeter.calculateDelta([100, 0], [101, 101457000])).to.be.within(1101.456, 1101.457);
    });
    it('should calculate delta from integer value', function (done) {
        expect(timeMeter.calculateDelta(100, 101.457)).to.be.within(1.456, 1.457);
        done();
    });
    it('should format value to 3 dig after point', function (done) {
        var v = timeMeter.format(101.456578);
        expect(v).to.be.equal('101.457 ms');
        done();
    });
});