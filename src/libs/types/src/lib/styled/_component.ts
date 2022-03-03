import * as React from "react";
import * as Styled from "styled-components";
import * as System from "styled-system";

export type Component<
	TElement extends keyof JSX.IntrinsicElements | React.ComponentType<any>,
	TAttrs extends object = {},
	TVariants extends Record<string, System.VariantArgs> = Record<
		string,
		System.VariantArgs
	>,
> = Styled.StyledComponent<
	TElement,
	Styled.DefaultTheme,
	TAttrs & Component.Variant.Props<TVariants>
> & {
	variants?: TVariants;
};

export namespace Component {
	export type Props<TStyledComponent extends Styled.AnyStyledComponent> =
		TStyledComponent extends Styled.StyledComponent<
			infer TElement,
			infer TTheme,
			infer TProps
		>
			? TProps
			: never;

	export type Variants<
		TVariants extends Record<string, System.VariantArgs> = Record<
			string,
			System.VariantArgs
		>,
	> = {
		[V in keyof TVariants]: TVariants[V] extends Variant<TVariants[V]>
			? TVariants[V]
			: never;
	};

	export type Variant<
		TVariant extends System.VariantArgs = System.VariantArgs,
	> = TVariant extends System.VariantArgs<
		infer TStyle,
		infer TKeys,
		infer TPropName
	>
		? System.VariantArgs<TStyle, TKeys, TPropName>
		: never;

	export namespace Variant {
		export type Props<
			TVariants extends Record<string, System.VariantArgs> = Record<
				string,
				System.VariantArgs
			>,
		> = {
			[V in keyof TVariants]: TVariants[V] extends Variant<TVariants[V]>
				? keyof TVariants[V]["variants"]
				: never;
		};
	}
}
