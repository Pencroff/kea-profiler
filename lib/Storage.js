"use strict";

var _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

/**
 * Created by Pencroff on 30/01/2015.
 */

var merge = function (objA, objB) {
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

var Storage = (function () {
    function Storage() {
        this.data = {};
    }

    _prototypeProperties(Storage, null, {
        setData: {
            value: function setData(flowName, stepName, data) {
                var me = this,
                    flow = me.getFlow(flowName);
                flow[stepName] = data || {};
            },
            writable: true,
            enumerable: true,
            configurable: true
        },
        mergeData: {
            value: function mergeData(flowName, stepName, data) {
                var flow = this.getFlow(flowName),
                    currentData = flow[stepName] || {};
                data = data || {};
                flow[stepName] = merge(currentData, data);
            },
            writable: true,
            enumerable: true,
            configurable: true
        },
        getAll: {

            //decoupleDataReferences(flow) {
            //
            //}

            value: function getAll() {
                return this.data;
            },
            writable: true,
            enumerable: true,
            configurable: true
        },
        getFlow: {
            value: function getFlow(flowName) {
                var me = this,
                    flow = me.data[flowName];
                if (!flow) {
                    flow = {};
                    me.data[flowName] = flow;
                }
                return flow;
            },
            writable: true,
            enumerable: true,
            configurable: true
        },
        getStep: {
            value: function getStep(flowName, stepName) {
                return this.getFlow(flowName)[stepName];
            },
            writable: true,
            enumerable: true,
            configurable: true
        },
        clearFlow: {
            value: function clearFlow(flowName) {
                this.data[flowName] = {};
            },
            writable: true,
            enumerable: true,
            configurable: true
        },
        clear: {
            value: function clear() {
                this.data = {};
            },
            writable: true,
            enumerable: true,
            configurable: true
        }
    });

    return Storage;
})();

module.exports = Storage;