import React, { Component } from 'react';
import logo from './logo.svg';

import {
  withOptimizely,
} from './react-sdk';

class Homepage extends Component {
  constructor(props) {
    super(props)
    console.log('Homepage', props)
  }

  render() {
    return (
      <div>
        <h1>
          Header
        </h1>
        <p>
          Content
        </p>
      </div>
    );
  }
}

export default withOptimizely(Homepage)
