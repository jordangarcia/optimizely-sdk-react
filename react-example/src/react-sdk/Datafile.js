import _ from 'lodash'

const find = _.find

export default class Datafile {
  constructor(datafile) {
    this.datafile = datafile;
  }

  getFeatureVariableType(feature, variable) {
    const variableDef =  this.__getVariableDef(feature, variable)
    if (!variableDef) {
      return null;
    }

    return variableDef.type
  }

  __getVariableDef(feature, variable) {
    const featureDef = find(this.datafile.featureFlags, { key: feature })
    if (!featureDef) {
      return null
    }

    const variableDef = find(featureDef.variables, { key: variable })
    if (!variableDef) {
      return null
    }

    return variableDef
  }
}
