import * as React from "react";
import {
  OptimizelyContextConsumer,
  OptimizelySDKReactAPI
} from "./OptimizelyContext";

interface WithOptimizelyProps {
  optimizely: OptimizelySDKReactAPI | null;
}

function withFn<C>(a: C): C[] {
  return [a, a];
}

export function withOptimizely<P>(
  Component: React.ComponentType<P & WithOptimizelyProps>
): React.ComponentType<P> {
  return class WithOptimizely extends React.Component<P> {
    render() {
      return (
        <OptimizelyContextConsumer>
          {context => <Component {...this.props} optimizely={context} />}
        </OptimizelyContextConsumer>
      );
    }
  };
}

// type WrappedComponentPropsExceptProvided = Exclude<keyof WrappedComponentProps, keyof WithOptimizelyProps>;
// type ForwardedProps = Pick<WrappedComponentProps, WrappedComponentPropsExceptProvided>;

// function withOptimizely<C extends React.ComponentType>(
//   Comp: C
// ) : C {
//   return class WithOptimizely extends React.Component {
//     render() {
//       return <Comp />;
//     }
//   };
// }

// const withOptimizely = <C>(
//   Component: C<P>
// ) : C<P> =>
//   class WithOptimizely extends React.Component<P, {}> {
//     render() {
//       return (
//         <OptimizelyContextConsumer>
//           {context => <Component {...this.props} optimizely={context} />}
//         </OptimizelyContextConsumer>
//       );
//     }
//   };
