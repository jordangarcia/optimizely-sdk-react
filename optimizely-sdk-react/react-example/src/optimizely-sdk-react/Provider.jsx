"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const optimizely = require("@optimizely/optimizely-sdk");
const OptimizelyContext_1 = require("./OptimizelyContext");
const Datafile_1 = require("./Datafile");
class OptimizelyProvider extends React.Component {
    constructor(props) {
        super(props);
        this.getFeatureVariables = (feature) => {
            const { attributes, userId } = this.state;
            const variableDefs = this.datafileWrapper.getVariablesForFeature(feature);
            if (!variableDefs) {
                // TODO: error
                return {};
            }
            const variableObj = {};
            variableDefs.forEach((({ key, type }) => {
                const getFn = this.featureVariableGetters[type];
                const value = getFn
                    ? getFn(feature, key, userId, attributes)
                    : null;
                variableObj[key] = value;
            }));
            return variableObj;
        };
        this.getFeatureVariable = (feature, variable) => {
            if (!this.isFeatureEnabled(feature)) {
                return null;
            }
            const { attributes, userId } = this.state;
            const variableType = this.datafileWrapper.getFeatureVariableType(feature, variable);
            if (!variableType) {
                return null;
            }
            const getFn = this.featureVariableGetters[variableType];
            if (!getFn) {
                return null;
            }
            return getFn(feature, variable, userId, attributes);
        };
        this.isFeatureEnabled = (feature) => {
            const { attributes, userId } = this.state;
            return this.instance.isFeatureEnabled(feature, userId, attributes);
        };
        const { datafile, sdkOptions, userId, attributes, } = props;
        this.instance = optimizely.createInstance(Object.assign({ datafile: datafile }, sdkOptions));
        this.datafileWrapper = new Datafile_1.DatafileWrapper(datafile);
        this.state = {
            userId,
            attributes: Object.assign({}, attributes),
        };
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
    render() {
        const { children } = this.props;
        return (<OptimizelyContext_1.OptimizelyContextProvider value={this.api}>
        {children}
      </OptimizelyContext_1.OptimizelyContextProvider>);
    }
}
exports.OptimizelyProvider = OptimizelyProvider;
