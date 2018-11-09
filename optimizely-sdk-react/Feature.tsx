import * as React from "react";
import * as PropTypes from "prop-types";
import { withOptimizely } from "./withProvider";
import {
  OptimizelySDKReactAPI,
  VariableValuesObject
} from "./OptimizelyContext";

export interface FeatureProps {
  feature: string
  renderEnabled: Function
  renderDisabled: Function
  optimizely: OptimizelySDKReactAPI
}

export interface FeatureState {
  isEnabled: boolean
  featureValues: VariableValuesObject
}

class FeatureComponent extends React.Component<FeatureProps, FeatureState> {
  static propTypes = {
    feature: PropTypes.string.isRequired,
    renderEnabled: PropTypes.func.isRequired,
    renderDisabled: PropTypes.func.isRequired,
    optimizely: PropTypes.object.isRequired,
  };

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

export const OptimizelyFeature = withOptimizely(FeatureComponent);
