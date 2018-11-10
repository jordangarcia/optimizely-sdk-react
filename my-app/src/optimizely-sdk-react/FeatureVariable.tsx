import * as React from "react";
import * as PropTypes from "prop-types";
import { OptimizelySDKReactAPI, VariableValue } from "./OptimizelyContext";
import { withOptimizely, WithOptimizelyProps } from "./withProvider";

interface FeatureVariableProps extends WithOptimizelyProps {
  feature: string;
  variable: string;
  children?: JSX.Element | string;
}

interface FeatureVariableState {
  value: VariableValue | null;
}

class FeatureVariable extends React.Component<
  FeatureVariableProps,
  FeatureVariableState
> {
  constructor(props: FeatureVariableProps) {
    super(props);

    const { feature, variable, optimizely } = this.props;
    if (optimizely === null) {
      throw new Error("optimizely prop must be supplied");
    }

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

export const OptimizelyFeatureVariable = withOptimizely(FeatureVariable);
