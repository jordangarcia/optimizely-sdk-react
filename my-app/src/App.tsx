import * as React from 'react'
import * as PropTypes from 'prop-types'

import './App.css';
import Example from './Example'

import {
  OptimizelyFeature,
  OptimizelyFeatureVariable,
  OptimizelyProvider,
} from './optimizely-sdk-react'
import { OptimizelyDatafile } from './optimizely-sdk-react/Datafile';
import { VariableValuesObject } from './optimizely-sdk-react/OptimizelyContext';


interface AppProps {
  datafile: OptimizelyDatafile
}

class App extends React.Component<AppProps> {
  static propTypes = {
    datafile: PropTypes.object,
  };

  render() {
    const { datafile } = this.props;

    return (
      <OptimizelyProvider datafile={datafile} userId='jordan'>
        <div className="App">
          <Example title='FeatureVariable2 example'>
            <p>
              <OptimizelyFeatureVariable feature="feature1" variable="content"></OptimizelyFeatureVariable>
            </p>
          </Example>

          <Example title='FeatureVariable example'>
            <h1>
              <OptimizelyFeatureVariable feature='feature1' variable='header'>
                Default header
              </OptimizelyFeatureVariable>
            </h1>
            <p>
              <OptimizelyFeatureVariable feature='feature1' variable='content' >
                Content
              </OptimizelyFeatureVariable>
            </p>
          </Example>

          <Example title='Feature example'>
            <OptimizelyFeature
              feature="feature1"
              renderEnabled={(featureVariables: VariableValuesObject) => (
                <div>
                  "feature1" is enabled
                  <pre>
                    {JSON.stringify(featureVariables, null, '  ')}
                  </pre>
                </div>
              )}
              renderDisabled={() => `Feature1 is disabled`}
            />
          </Example>
        </div>
      </OptimizelyProvider>
    );
  }
}

export default App;
