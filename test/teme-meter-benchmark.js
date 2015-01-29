/**
 * Created by Pencroff on 13.12.2014.
 */

var path = require('path'),
    root = __dirname,
    timeMeter = require('../lib/TimeMeter.js');

// A test suite
module.exports = {
    name: 'kea-config benchmark',
    tests: {
        'Get measure native': function () {
            'use strict';
            var i = process.hrtime();
        },
        'Get measure by TimeMeter': function () {
            'use strict';
            var i = timeMeter.getMeasure();
        }
    }
};