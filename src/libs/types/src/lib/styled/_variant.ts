import * as System from "styled-system";

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

export type Variant<TVariant extends System.VariantArgs = System.VariantArgs> =
	TVariant extends System.VariantArgs<
		infer TStyle,
		infer TKeys,
		infer TPropName
	>
		? System.VariantArgs<TStyle, TKeys, TPropName>
		: never;

export type VariantProps<TVariants extends object = {}> = {
	[V in keyof TVariants]: TVariants[V] extends Variant<TVariants[V]>
		? keyof TVariants[V]["variants"]
		: never;
};
