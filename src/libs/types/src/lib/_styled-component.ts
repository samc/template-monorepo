import * as React from "react";
import * as Styled from "styled-components";
import * as System from "styled-system";

export type StyledComponent<
	TElement extends keyof JSX.IntrinsicElements | React.ComponentType<any>,
	TProps extends object = {},
	TStyle = object,
	K extends string = string,
	TPropName = string,
	TVariants extends {
		[V in keyof TVariants]: <
			TStyle = object,
			K extends string = string,
			TPropName = string,
		>(
			props: System.VariantArgs<TStyle, K, TPropName>,
		) => (...args: any[]) => any;
	} = any,
> = Styled.StyledComponent<TElement, Styled.DefaultTheme, TProps> & {
	variant?: System.VariantArgs<TStyle, K, TPropName>;
	variants?: TVariants;
	_variants?: TVariants extends {
		[V in keyof TVariants]: TVariants[V] extends System.VariantArgs<
			infer TStyle,
			infer TKeys,
			infer TPropName
		>
			? System.VariantArgs<TStyle, TKeys, TPropName>
			: never;
	}
		? TVariants
		: never;
};

export type SC<
	TElement extends keyof JSX.IntrinsicElements | React.ComponentType<any>,
	TProps extends object = {},
> = StyledComponent<TElement, TProps>;
