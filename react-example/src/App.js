import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './App.css';
import Example from './Example'

import {
  OptimizelyProvider,
  Feature,
  FeatureVariable,
} from './react-sdk';


class App extends Component {
  static propTypes = {
    datafile: PropTypes.object,
  };

  render() {
    const { datafile } = this.props;

    return (
      <OptimizelyProvider datafile={datafile} userId='jordan'>
        <div className="App">
          <Example title='FeatureVariable example'>
            <h1>
              <FeatureVariable feature='feature1' variable='header' >
                Default header
              </FeatureVariable>
            </h1>
            <p>
              <FeatureVariable feature='feature1' variable='content' >
                Content
              </FeatureVariable>
            </p>
          </Example>

          <Example title='Feature example'>
            <Feature
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
