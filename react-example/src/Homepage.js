import React, { Component } from 'react';
import { FeatureVariable } from './react-sdk';

import Example from './Example'

class FeatureVariableExample extends Component {
  render() {
    return (
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
    );
  }
}

export default FeatureVariableExample
