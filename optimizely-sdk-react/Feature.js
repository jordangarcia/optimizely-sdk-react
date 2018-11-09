import { Component } from 'react';
import PropTypes from 'prop-types';
import withProvider from './withProvider'


class Feature extends Component {
  static propTypes = {
    feature: PropTypes.string.isRequired,
    renderEnabled: PropTypes.func.isRequired,
    renderDisabled: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    const {
      feature,
      optimizely,
    } = this.props

    let featureValues = {};
    const isEnabled = optimizely.isFeatureEnabled(feature);
    if (isEnabled) {
      featureValues = optimizely.getFeatureVariables(feature)
    }

    this.state = {
      isEnabled,
      featureValues,
    }
  }

  render() {
    const { isEnabled, featureValues } = this.state;
    const {
      renderEnabled,
      renderDisabled
    } = this.props;

    return isEnabled
      ? renderEnabled(featureValues)
      : renderDisabled()
  }
}

export default withProvider(Feature);
