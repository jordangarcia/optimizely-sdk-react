"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const PropTypes = require("prop-types");
const withProvider_1 = require("./withProvider");
class FeatureVariable extends react_1.Component {
    constructor(props) {
        super(props);
        const { feature, variable, optimizely } = this.props;
        this.state = {
            value: optimizely.getFeatureVariable(feature, variable)
        };
    }
    render() {
        const { value } = this.state;
        if (value) {
            return value;
        }
        return this.props.children;
    }
}
FeatureVariable.propTypes = {
    feature: PropTypes.string.isRequired,
    variable: PropTypes.string.isRequired
};
exports.OptimizelyFeatureVariable = withProvider_1.withOptimizely(FeatureVariable);
