import React, { Component } from 'react'
import PropTypes from 'prop-types'
import optimizely from '@optimizely/optimizely-sdk'

import OptimizelyContext from './OptimizelyContext'

class OptimizelyProvider extends Component {
  constructor(props) {
    super(props)

    const {
      datafile,
      sdkOptions,
      userId,
      attributes,
    } = props

    this.instance = optimizely.createInstance({
      datafile: datafile,
      ...sdkOptions,
    });

    this.userId = userId;

    this.enabledFeatures = this.instance.getEnabledFeatures(userId);

    this.api = {
      getFeatureVariable: this.getFeatureVariable,
    }

    this.state = {
      attributes: { ...attributes },
    }
  }

  getFeatureVariable = (feature, variable) => {
    if (!this.isFeatureEnabled(feature)) {
      return null;
    }

    const { attributes } = this.state;
    return this.instance.getFeatureVariableString(feature, variable, this.userId, attributes)
  }

  isFeatureEnabled = (feature) => {
    const { attributes } = this.state;
    return this.instance.isFeatureEnabled(feature, this.userId, attributes)
  }

  render() {
    return (
      <OptimizelyContext.Provider value={this.api}>
        {this.props.children}
      </OptimizelyContext.Provider>
    )
  }
}

OptimizelyProvider.propTypes = {
  context: PropTypes.object,
  children: PropTypes.any
}

export default OptimizelyProvider
