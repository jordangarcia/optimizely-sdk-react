import React, { Component } from 'react'
import PropTypes from 'prop-types'
import optimizely from '@optimizely/optimizely-sdk'

import Datafile from './Datafile'
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

    this.datafile = new Datafile(datafile);

    this.state = {
      userId,
      attributes: { ...attributes },
    }

    this.featureVariableGetters = {
      'string': this.instance.getFeatureVariableString.bind(this.instance),
      'boolean': this.instance.getFeatureVariableBoolean.bind(this.instance),
      'double': this.instance.getFeatureVariableDouble.bind(this.instance),
      'integer': this.instance.getFeatureVariableInteger.bind(this.instance),
    };

    this.api = {
      getFeatureVariable: this.getFeatureVariable,
      getFeatureVariables: this.getFeatureVariables,
      isFeatureEnabled: this.isFeatureEnabled,
    };
  }

  getFeatureVariables = (feature) => {
    const { attributes, userId } = this.state;
    const variableDefs = this.datafile.getVariablesForFeature(feature);
    if (!variableDefs) {
      // TODO: error
      return {}
    }

    const variableObj = {}
    variableDefs.forEach((({ key, type }) => {
      const getFn = this.featureVariableGetters[type]
      const value = getFn
        ? getFn(feature, key, userId, attributes)
        : null

      variableObj[key] = value
    }))

    return variableObj
  }

  getFeatureVariable = (feature, variable) => {
    if (!this.isFeatureEnabled(feature)) {
      return null;
    }

    const { attributes, userId } = this.state;
    const variableType = this.datafile.getFeatureVariableType(feature, variable)
    if (!variableType) {
      return null;
    }
    const getFn = this.featureVariableGetters[variableType]
    if (!getFn) {
      return null;
    }
    return getFn(feature, variable, userId, attributes)
  }

  isFeatureEnabled = (feature) => {
    const { attributes, userId } = this.state;
    return this.instance.isFeatureEnabled(feature, userId, attributes)
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
