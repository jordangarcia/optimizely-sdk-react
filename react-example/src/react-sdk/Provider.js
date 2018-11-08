import React, { Component } from 'react'
import PropTypes from 'prop-types'

import OptimizelyContext from './OptimizelyContext'

class OptimizelyProvider extends Component {
  constructor(props) {
    super(props)

    const {
      datafile,
    } = props

    this.state = {
      datafile,
    }
  }

  render() {
    return (
      <OptimizelyContext.Provider value={this.state}>
        {this.props.children}
      </OptimizelyContext.Provider>
    )
  }
}

OptimizelyProvider.propTypes = {
  context: PropTypes.object,
  children: PropTypes.any
}

export default OptimizelyProvider
