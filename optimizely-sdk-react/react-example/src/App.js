import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './App.css';
import Example from './Example'

import { OptimizelyProvider } from './optimizely-sdk-react/Provider'
import { OptimizelyFeature } from './optimizely-sdk-react/Feature'
import { OptimizelyFeatureVariable } from './optimizely-sdk-react/FeatureVariable'


class App extends Component {
  static propTypes = {
    datafile: PropTypes.object,
  };

  render() {
    debugger
    const { datafile } = this.props;

    return (
      <OptimizelyProvider datafile={datafile} userId='jordan'>
        <div className="App">
          <Example title='FeatureVariable example'>
            <h1>
              <OptimizelyFeature feature='feature1' variable='header' >
                Default header
              </OptimizelyFeature>
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
              renderEnabled={(featureVariables) => (
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
