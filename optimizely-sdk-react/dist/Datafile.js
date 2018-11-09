"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var find = _.find;
var DatafileWrapper = /** @class */ (function () {
    function DatafileWrapper(datafile) {
        this.datafile = datafile;
    }
    DatafileWrapper.prototype.getVariablesForFeature = function (feature) {
        var featureDef = find(this.datafile.featureFlags, { key: feature });
        if (!featureDef) {
            return null;
        }
        return featureDef.variables;
    };
    DatafileWrapper.prototype.getFeatureVariableType = function (feature, variable) {
        var variableDef = this.__getVariableDef(feature, variable);
        if (!variableDef) {
            return null;
        }
        return variableDef.type;
    };
    DatafileWrapper.prototype.__getVariableDef = function (feature, variable) {
        var featureDef = find(this.datafile.featureFlags, { key: feature });
        if (!featureDef) {
            return null;
        }
        var variableDef = find(featureDef.variables, { key: variable });
        if (!variableDef) {
            return null;
        }
        return variableDef;
    };
    return DatafileWrapper;
}());
exports.DatafileWrapper = DatafileWrapper;
