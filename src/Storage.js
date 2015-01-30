/**
 * Created by Pencroff on 30/01/2015.
 */

var merge = (objA, objB) => {
    var keys = Object.keys(objB),
        len = keys.length,
        i = 0,
        prop;
    while (i < len) {
        prop = keys[i];
        objA[prop] = objB[prop];
        i += 1;
    }
    return objA;
};

export default class Storage {
    constructor () {
        this.data = {};
    }

    setData(flowName, stepName, data) {
        var me = this,
            flow = me.getFlow(flowName);
        flow[stepName] = data || {};
    }

    mergeData(flowName, stepName, data) {
        var flow = this.getFlow(flowName),
            currentData = flow[stepName] || {};
        data = data || {};
        flow[stepName] = merge(currentData, data);
    }

    //decoupleDataReferences(flow) {
    //
    //}

    getAll() {
        return this.data;
    }

    getFlow(flowName) {
        var me = this,
            flow = me.data[flowName];
        if(!flow) {
            flow = {};
            me.data[flowName] = flow;
        }
        return flow;
    }

    getStep(flowName, stepName) {
        return this.getFlow(flowName)[stepName];
    }

    clearFlow(flowName) {
        this.data[flowName] = {};
    }

    clear() {
        this.data = {};
    }
}