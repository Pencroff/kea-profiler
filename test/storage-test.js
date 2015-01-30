/**
 * Created by Pencroff on 30/01/2015.
 */

var env = process.env.Not_Gulp_Env ? 'src' : 'lib',
    expect = require('chai').expect,
    StorageCtor = require('../' + env + '/Storage');

describe('Storage', function () {
    var store;
    beforeEach(function (done) {
        store = new StorageCtor();
        done();
    });
    it('should return all data', function (done) {
        expect(store.getAll()).to.eql({});
        done();
    });
    it('Should return object for any flow', function (done) {
        expect(store.getFlow('Flow1')).to.eql({});
        expect(store.getFlow('Flow2')).to.eql({});
        expect(store.getAll()).to.eql({
            Flow1: {},
            Flow2: {}
        });
        done();
    });
    it('should save data into step', function (done) {
        store.setData('Flow', 'StepA', { some: 'First Object' });
        store.setData('Flow', 'StepB', { some: 'Second Object' });
        expect(store.getAll()).to.eql({
            Flow: {
                StepA: { some: 'First Object' },
                StepB: { some: 'Second Object' }
            }
        });
        done();
    });
    it('should get data for step', function (done) {
        store.setData('Flow', 'StepA', {
            fieldA: 'DataA',
            fieldB: 'DataB'
        });
        expect(store.getStep('Flow', 'StepA')).to.eql({
            fieldA: 'DataA',
            fieldB: 'DataB'
        });
        done();
    });
    it('Should merge data into flow', function (done) {
        store.setData('Flow', 'StepA', {
            fieldA: 'DataA',
            fieldB: 'DataB'
        });
        store.mergeData('Flow', 'StepA', {
            fieldB: 'DataBB',
            fieldC: 'DataC'
        });
        expect(store.getAll()).to.eql({
            Flow: {
                StepA: {
                    fieldA: 'DataA',
                    fieldB: 'DataBB',
                    fieldC: 'DataC'
                }
            }
        });
        done();
    });
    it('should support undefined or null values', function (done) {
        store.setData('Flow', 'StepA');
        expect(store.getStep('Flow', 'StepA')).to.eql({});
        store.setData('Flow', 'StepA', null);
        expect(store.getStep('Flow', 'StepA')).to.eql({});
        store.mergeData('Flow', 'StepA');
        expect(store.getStep('Flow', 'StepA')).to.eql({});
        store.mergeData('Flow', 'StepA', null);
        expect(store.getStep('Flow', 'StepA')).to.eql({});
        done();
    });
    it('should clear flow data', function (done) {
        store.setData('Flow', 'StepA', {
            fieldA: 'DataA',
            fieldB: 'DataB'
        });
        store.clearFlow('Flow');
        expect(store.getFlow('Flow')).to.eql({});
        done();
    });
    it('should clear flow data', function (done) {
        store.setData('Flow', 'StepA', {
            fieldA: 'DataA',
            fieldB: 'DataB'
        });
        store.clear();
        expect(store.getAll()).to.eql({});
        done();
    });
});