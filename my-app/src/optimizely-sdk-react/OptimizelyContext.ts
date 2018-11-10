import * as React from 'react';

export type VariableValue  = string | boolean | number;

export type VariableValuesObject = {
    [key: string]: VariableValue
}

export type OptimizelySDKReactAPI = {
  getFeatureVariable: (feature: string, variable: string) => VariableValue | null
  getFeatureVariables: (feature: string) => VariableValuesObject
  isFeatureEnabled: (feature: string) => boolean
}

const { Consumer, Provider } = React.createContext<OptimizelySDKReactAPI | null>(null)

export const OptimizelyContextConsumer = Consumer
export const OptimizelyContextProvider = Provider