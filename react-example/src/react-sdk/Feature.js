import React, { Component } from 'react';
import PropTypes from 'prop-types';
import OptimizelyProvider from './Provider'
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

    this.state = {
      isEnabled: optimizely.isFeatureEnabled(feature),
    }
  }

  render() {
    const {
      value,
    } = this.state;

    if (value) {
      return value;
    }
    return this.props.children;
  }
}

export default withProvider(FeatureVariable);
