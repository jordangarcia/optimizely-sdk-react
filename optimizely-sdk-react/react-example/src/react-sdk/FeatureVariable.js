import { Component } from 'react';
import PropTypes from 'prop-types';
import withProvider from './withProvider'

class FeatureVariable extends Component {
  static propTypes = {
    feature: PropTypes.string.isRequired,
    variable: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);

    const {
      feature,
      variable,
      optimizely,
    } = this.props


    this.state = {
      value: optimizely.getFeatureVariable(feature, variable)
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
