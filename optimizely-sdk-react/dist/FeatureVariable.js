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
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var PropTypes = require("prop-types");
var withProvider_1 = require("./withProvider");
var FeatureVariable = /** @class */ (function (_super) {
    __extends(FeatureVariable, _super);
    function FeatureVariable(props) {
        var _this = _super.call(this, props) || this;
        var _a = _this.props, feature = _a.feature, variable = _a.variable, optimizely = _a.optimizely;
        _this.state = {
            value: optimizely.getFeatureVariable(feature, variable)
        };
        return _this;
    }
    FeatureVariable.prototype.render = function () {
        var value = this.state.value;
        if (value) {
            return value;
        }
        return this.props.children;
    };
    FeatureVariable.propTypes = {
        feature: PropTypes.string.isRequired,
        variable: PropTypes.string.isRequired
    };
    return FeatureVariable;
}(react_1.Component));
exports.OptimizelyFeatureVariable = withProvider_1.withOptimizely(FeatureVariable);
