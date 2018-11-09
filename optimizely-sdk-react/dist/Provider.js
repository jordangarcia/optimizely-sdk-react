"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var optimizely = require("@optimizely/optimizely-sdk");
var OptimizelyContext_1 = require("./OptimizelyContext");
var Datafile_1 = require("./Datafile");
var OptimizelyProvider = /** @class */ (function (_super) {
    __extends(OptimizelyProvider, _super);
    function OptimizelyProvider(props) {
        var _this = _super.call(this, props) || this;
        _this.getFeatureVariables = function (feature) {
            var _a = _this.state, attributes = _a.attributes, userId = _a.userId;
            var variableDefs = _this.datafileWrapper.getVariablesForFeature(feature);
            if (!variableDefs) {
                // TODO: error
                return {};
            }
            var variableObj = {};
            variableDefs.forEach((function (_a) {
                var key = _a.key, type = _a.type;
                var getFn = _this.featureVariableGetters[type];
                var value = getFn
                    ? getFn(feature, key, userId, attributes)
                    : null;
                variableObj[key] = value;
            }));
            return variableObj;
        };
        _this.getFeatureVariable = function (feature, variable) {
            if (!_this.isFeatureEnabled(feature)) {
                return null;
            }
            var _a = _this.state, attributes = _a.attributes, userId = _a.userId;
            var variableType = _this.datafileWrapper.getFeatureVariableType(feature, variable);
            if (!variableType) {
                return null;
            }
            var getFn = _this.featureVariableGetters[variableType];
            if (!getFn) {
                return null;
            }
            return getFn(feature, variable, userId, attributes);
        };
        _this.isFeatureEnabled = function (feature) {
            var _a = _this.state, attributes = _a.attributes, userId = _a.userId;
            return _this.instance.isFeatureEnabled(feature, userId, attributes);
        };
        var datafile = props.datafile, sdkOptions = props.sdkOptions, userId = props.userId, attributes = props.attributes;
        _this.instance = optimizely.createInstance(__assign({ datafile: datafile }, sdkOptions));
        _this.datafileWrapper = new Datafile_1.DatafileWrapper(datafile);
        _this.state = {
            userId: userId,
            attributes: __assign({}, attributes),
        };
        _this.featureVariableGetters = {
            'string': _this.instance.getFeatureVariableString.bind(_this.instance),
            'boolean': _this.instance.getFeatureVariableBoolean.bind(_this.instance),
            'double': _this.instance.getFeatureVariableDouble.bind(_this.instance),
            'integer': _this.instance.getFeatureVariableInteger.bind(_this.instance),
        };
        _this.api = {
            getFeatureVariable: _this.getFeatureVariable,
            getFeatureVariables: _this.getFeatureVariables,
            isFeatureEnabled: _this.isFeatureEnabled,
        };
        return _this;
    }
    OptimizelyProvider.prototype.render = function () {
        var children = this.props.children;
        return (React.createElement(OptimizelyContext_1.OptimizelyContextProvider, { value: this.api }, children));
    };
    return OptimizelyProvider;
}(React.Component));
exports.default = OptimizelyProvider;
