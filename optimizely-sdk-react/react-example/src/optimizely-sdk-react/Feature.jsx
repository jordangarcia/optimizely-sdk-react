"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const PropTypes = require("prop-types");
const withProvider_1 = require("./withProvider");
class FeatureComponent extends React.Component {
    constructor(props) {
        super(props);
        const { feature, optimizely } = this.props;
        let featureValues = {};
        const isEnabled = optimizely.isFeatureEnabled(feature);
        if (isEnabled) {
            featureValues = optimizely.getFeatureVariables(feature);
        }
        this.state = {
            isEnabled,
            featureValues
        };
    }
    render() {
        const { isEnabled, featureValues } = this.state;
        const { renderEnabled, renderDisabled } = this.props;
        return isEnabled ? renderEnabled(featureValues) : renderDisabled();
    }
}
FeatureComponent.propTypes = {
    feature: PropTypes.string.isRequired,
    renderEnabled: PropTypes.func.isRequired,
    renderDisabled: PropTypes.func.isRequired,
    optimizely: PropTypes.object.isRequired,
};
exports.OptimizelyFeature = withProvider_1.withOptimizely(FeatureComponent);
