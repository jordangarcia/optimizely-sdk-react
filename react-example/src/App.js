import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './App.css';

import Homepage from './Homepage'

import {
  OptimizelyProvider,
} from './react-sdk';


class App extends Component {
  static propTypes = {
    datafile: PropTypes.object,
  };

  render() {
    const { datafile } = this.props;

    return (
      <OptimizelyProvider
        datafile={datafile}
        //datafileUrl="https://cdn.optimizely.com/datafiles/GaXr9RoDhRcqXJm3ruskRa.json?OPTIMIZELY_NOCACHE=1"
      >
        <div className="App">
          <Homepage />
        </div>
      </OptimizelyProvider>
    );
  }
}

export default App;
