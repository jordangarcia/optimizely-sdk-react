import * as _ from 'lodash'

const find = _.find

export type Datafile = {
  readonly version: string;
  readonly projectId: string;
  readonly accountId: string;

  readonly rollouts: RolloutGroup[];
  readonly featureFlags: FeatureFlag[];
  readonly attributes: Attribute[];

  readonly audiences: Audience[];
  readonly groups: Group[];
  readonly experiments: Experiment[]

  readonly anonymizeIP: boolean;
  readonly botFiltering: boolean;
  readonly revision: string;

  // deprecated
  readonly typedAudiences: Array<object>; /* TODO */
  readonly variables: Array<object>;
}

export type Group = {
  readonly id: string;
  readonly policy: 'random'; // TODO
  readonly trafficAllocation: TrafficAllocation[];
  readonly experiments: Experiment[];
}

export type Audience = {
  readonly id: string;
  readonly conditions: string;
  readonly name: string;
}

export type Attribute = {
  readonly id: string;
  readonly key: string;
}

export type VariableDef = {
  readonly defaultValue: string | number | boolean;
  readonly type: VariableType;
  readonly id: string;
  readonly key: string;
}

export type VariableType = "string" | "double" | "integer" | "boolean";

export type FeatureFlag = {
  readonly id: string;
  readonly key: string;
  readonly experimentIds: string[];
  readonly rolloutId: string;
  readonly variables: VariableDef[];
}

/* is this the right name*/
export type RolloutGroup = {
  readonly id: string;
  readonly experiments: Experiment[];
}

export type TrafficAllocation = {
  readonly entityId: string;
  readonly endOfRange: number;
}

export type ExperimentVariationVariables = {
  readonly id: string;
  readonly value: string | boolean | number;

}

export type ExperimentVariation = {
  readonly variables: ExperimentVariationVariables;
  readonly id: string;
  readonly key: string;
  readonly featureEnabled: boolean;
}

export type Experiment = {
  readonly id: string;
  readonly status: "Running" | "Paused" | "Not started";
  readonly key: string;
  readonly layerId: string;
  readonly trafficAllocation: TrafficAllocation[];
  readonly audienceIds: string[];
  readonly variations: ExperimentVariation[];
  readonly forcedVariations: object; /** readonly TODO: type */
}

interface IDatafileReader {
  readonly datafile: Datafile;
}

export default class DatafileReader implements IDatafileReader {
  readonly datafile: Datafile;

  constructor(datafile: Datafile) {
    this.datafile = datafile;
  }

  getVariablesForFeature(feature: string) : VariableDef[] | null {
    const featureDef = find(this.datafile.featureFlags, { key: feature })
    if (!featureDef) {
      return null
    }

    return featureDef.variables
  }

  getFeatureVariableType(feature: string, variable: string) : VariableType {
    const variableDef =  this.__getVariableDef(feature, variable)
    if (!variableDef) {
      return null;
    }

    return variableDef.type
  }

  __getVariableDef(feature: string, variable: string) : VariableDef | null{
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
