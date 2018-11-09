import { Component } from "react";
import * as PropTypes from "prop-types";
import { OptimizelySDKReactAPI, VariableValue } from "./OptimizelyContext";
import { withOptimizely } from "./withProvider";

interface FeatureVariableProps {
  feature: string
  variable: string
  optimizely: OptimizelySDKReactAPI
}

interface FeatureVariableState {
  value: VariableValue | null
}

class FeatureVariable extends Component<FeatureVariableProps, FeatureVariableState> {
  static propTypes = {
    feature: PropTypes.string.isRequired,
    variable: PropTypes.string.isRequired
  };

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

export const OptimizelyFeatureVariable = withOptimizely(FeatureVariable)