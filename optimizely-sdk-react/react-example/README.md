# optimizely-sdk-react

### Examples

#### Providing Optimizely

`index.js`

```js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

;(async function () {
  const resp = await fetch('https://optimizely.s3.amazonaws.com/datafiles/BsSyVRsUbE3ExgGCJ9w1to.json', { mode: 'cors' });
  let datafile = await resp.json();

  ReactDOM.render(<App datafile={datafile} />, document.getElementById('root'));
})();
```

`App.js`

```js
import React, { Component } from 'react';
import { OptimizelyProvider } from './react-sdk';

class App extends Component {
  static propTypes = {
    datafile: PropTypes.object,
  };

  render() {
    const { datafile } = this.props;

    return (
      <OptimizelyProvider datafile={datafile} userId='jordan'>
        {/* APP GOES HERE */}
      </OptimizelyProvider>
    );
  }
}
```


#### Is feature enabled

*`<Feature />`*

```js
import { Feature } from './react-sdk';

class App extends Component {
  render() {
    return (
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
    );
  }
}
```


#### Feature variable

*`<FeatureVariable />`*

```js
import { FeatureVariable } from './react-sdk';

class App extends Component {
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
```

