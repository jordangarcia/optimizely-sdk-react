import React, { Component } from 'react';
import { FeatureVariable } from './react-sdk';

class Homepage extends Component {
  render() {
    return (
      <div>
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
      </div>
    );
  }
}

export default Homepage
