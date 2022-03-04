import * as Hoist from "hoist-non-react-statics";
import * as React from "react";

import * as TS from "@taygo/universal/ts";
import * as Utils from "@taygo/universal/utils";

/**
 * Creates a Higher-Order Component (HOC) from a universally rendered component.
 *
 * - A `domain` name must be provided, this will act as the key / value pair to which
 * the data will be passed when your HOC consumes a React component.
 *
 * @example
 *
 * {
 *   foo: {
 *     ..data
 *   }
 * }
 *
 * - If a `type` is provided, the data will be nested under the parent `domain`.
 *
 * @example
 *
 * {
 *   foo: {
 *     bar: {
 *       ...data
 *     }
 *   }
 * }
 *
 * @param {Universal.UniversalComponent} UniversalComponent - A component rendered via the `Universal.render()` function
 * @param {String} domain - key to attribute data passed via your `UniversalComponent`
 * @param {String} [type] - type of the domain.
 *
 * @example
 *
 * const withSomeEnhancer = enhance(
 *   SomeEnhancer,
 *   "foo"
 * )
 *
 * @example
 *
 * const withSomeEnhancer = enhance(
 *   SomeEnhancer,
 *   "foo",
 *   "bar"
 * )
 */
export function enhance<
	TUniversalComponent extends TS.RC<
		Omit<TUniversalComponentProps, keyof TS.UniversalRenderProps> &
			TS.UniversalRenderProps<TUniversalComponentData>
	>,
	TUniversalComponentProps extends React.ComponentProps<TUniversalComponent>,
	TUniversalComponentData extends TS.InferUniversalDataFromProps<TUniversalComponentProps>,
	TUniversalComponentDomain extends string,
	TUniversalComponentType extends string,
	TUniversalComponentInjectedProps extends TS.InjectedUniversalData<
		TUniversalComponentData,
		TUniversalComponentDomain,
		TUniversalComponentType
	>,
>(
	UniversalComponent: TUniversalComponent,
	domain: TUniversalComponentDomain,
	type?: TUniversalComponentType,
): TS.Enhancer<TUniversalComponentInjectedProps, TUniversalComponentProps> {
	return function <
		TWrappedComponent extends TS.RC<TWrappedComponentProps>,
		TWrappedComponentProps extends Omit<
			React.ComponentProps<TWrappedComponent>,
			keyof TUniversalComponentInjectedProps
		> &
			TUniversalComponentInjectedProps,
	>(
		WrappedComponent: TWrappedComponent,
		universalProps?: TUniversalComponentProps,
	): TS.EnhancedComponent<TWrappedComponent> {
		class EnhancedComponent extends React.PureComponent<TWrappedComponentProps> {
			public render(): React.ReactNode {
				return (
					<UniversalComponent
						{...universalProps}
						{...({} as JSX.LibraryManagedAttributes<
							TUniversalComponent,
							Omit<TUniversalComponentProps, keyof TS.UniversalRenderProps> &
								TS.UniversalRenderProps<TUniversalComponentData>
						>)}
					>
						{(data) => {
							const injected = Object.freeze({
								...this.props,
								[domain]: {
									...this.props[domain],
									...(type ? { [type]: data } : { data }),
								},
							});

							return (
								<WrappedComponent
									{...injected}
									{...({} as JSX.LibraryManagedAttributes<
										TWrappedComponent,
										TWrappedComponentProps
									>)}
								/>
							);
						}}
					</UniversalComponent>
				);
			}
		}
		return Hoist.default(
			EnhancedComponent,
			WrappedComponent,
		) as TWrappedComponent & Hoist.NonReactStatics<TWrappedComponent>;
	};
}
