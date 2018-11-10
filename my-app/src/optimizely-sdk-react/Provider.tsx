import * as React from 'react'
import * as optimizely from '@optimizely/optimizely-sdk'

import { OptimizelyContextProvider, VariableValue, OptimizelySDKReactAPI, VariableValuesObject } from './OptimizelyContext'
import { OptimizelyDatafile, DatafileWrapper } from './Datafile';

interface OptimizelyProviderProps {
  userId: string
  datafile: OptimizelyDatafile
  sdkOptions?: object
  attributes?: optimizely.UserAttributes
}

interface OptimizelyProviderState {
  userId: string
  attributes: optimizely.UserAttributes | undefined
}

export class OptimizelyProvider extends React.Component<OptimizelyProviderProps, OptimizelyProviderState> {
  datafileWrapper: DatafileWrapper;
  api: OptimizelySDKReactAPI;
  featureVariableGetters: {
    string: (feature: string, variable: string, userid: string, attributes: object | undefined) => string,
    boolean: (feature: string, variable: string, userid: string, attributes: object | undefined) => boolean,
    double: (feature: string, variable: string, userid: string, attributes: object | undefined) => number,
    integer: (feature: string, variable: string, userid: string, attributes: object | undefined) => number,
  }
  instance: optimizely.Client; // TODO change name?

  constructor(props: OptimizelyProviderProps) {
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

    this.datafileWrapper = new DatafileWrapper(datafile);

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

  getFeatureVariables = (feature: string) : VariableValuesObject => {
    const { attributes, userId } = this.state;
    const variableDefs = this.datafileWrapper.getVariablesForFeature(feature);
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

  getFeatureVariable = (feature: string, variable: string) : VariableValue | null => {
    if (!this.isFeatureEnabled(feature)) {
      return null;
    }

    const { attributes, userId } = this.state;
    const variableType = this.datafileWrapper.getFeatureVariableType(feature, variable)
    if (!variableType) {
      return null;
    }
    const getFn = this.featureVariableGetters[variableType]
    if (!getFn) {
      return null;
    }
    return getFn(feature, variable, userId, attributes)
  }

  isFeatureEnabled = (feature: string) : boolean => {
    const { attributes, userId } = this.state;
    return this.instance.isFeatureEnabled(feature, userId, attributes)
  }

  render() {
    const { children } = this.props
    return (
      <OptimizelyContextProvider value={this.api}>
        {children}
      </OptimizelyContextProvider>
    )
  }
}
