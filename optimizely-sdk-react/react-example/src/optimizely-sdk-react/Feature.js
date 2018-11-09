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
var React = require("react");
var PropTypes = require("prop-types");
var withProvider_1 = require("./withProvider");
var FeatureComponent = /** @class */ (function (_super) {
    __extends(FeatureComponent, _super);
    function FeatureComponent(props) {
        var _this = _super.call(this, props) || this;
        var _a = _this.props, feature = _a.feature, optimizely = _a.optimizely;
        var featureValues = {};
        var isEnabled = optimizely.isFeatureEnabled(feature);
        if (isEnabled) {
            featureValues = optimizely.getFeatureVariables(feature);
        }
        _this.state = {
            isEnabled: isEnabled,
            featureValues: featureValues
        };
        return _this;
    }
    FeatureComponent.prototype.render = function () {
        var _a = this.state, isEnabled = _a.isEnabled, featureValues = _a.featureValues;
        var _b = this.props, renderEnabled = _b.renderEnabled, renderDisabled = _b.renderDisabled;
        return isEnabled ? renderEnabled(featureValues) : renderDisabled();
    };
    FeatureComponent.propTypes = {
        feature: PropTypes.string.isRequired,
        renderEnabled: PropTypes.func.isRequired,
        renderDisabled: PropTypes.func.isRequired,
        optimizely: PropTypes.object.isRequired,
    };
    return FeatureComponent;
}(React.Component));
exports.OptimizelyFeature = withProvider_1.withOptimizely(FeatureComponent);
