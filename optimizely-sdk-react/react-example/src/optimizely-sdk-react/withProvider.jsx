"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const OptimizelyContext_1 = require("./OptimizelyContext");
function withFn(a) {
    return [a, a];
}
function withOptimizely(Component) {
    return class WithOptimizely extends React.Component {
        render() {
            return (<OptimizelyContext_1.OptimizelyContextConsumer>
          {context => <Component {...this.props} optimizely={context}/>}
        </OptimizelyContext_1.OptimizelyContextConsumer>);
        }
    };
}
exports.withOptimizely = withOptimizely;
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
