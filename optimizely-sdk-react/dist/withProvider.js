"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var OptimizelyContext_1 = require("./OptimizelyContext");
function withFn(a) {
    return [a, a];
}
function withOptimizely(Component) {
    return /** @class */ (function (_super) {
        __extends(WithOptimizely, _super);
        function WithOptimizely() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        WithOptimizely.prototype.render = function () {
            var _this = this;
            return (React.createElement(OptimizelyContext_1.OptimizelyContextConsumer, null, function (context) { return React.createElement(Component, __assign({}, _this.props, { optimizely: context })); }));
        };
        return WithOptimizely;
    }(React.Component));
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
