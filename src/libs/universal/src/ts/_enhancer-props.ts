import { Enhancer } from ".";

/**
 * Infers the prop-type of injected component props via a enhanced component.
 */
export type EnhancerProps<TEnhancer> = TEnhancer extends Enhancer<
	infer TInjectedProps
>
	? TInjectedProps
	: never;
