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
});