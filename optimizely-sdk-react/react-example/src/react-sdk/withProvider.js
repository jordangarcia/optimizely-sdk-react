import React from 'react'
import OptimizelyContext from './OptimizelyContext'

export default function withOptimizely(Component) {
  return props => {
    return (
      <OptimizelyContext.Consumer>
        {context => <Component {...props} optimizely={context} />}
      </OptimizelyContext.Consumer>
    );
  }
}

