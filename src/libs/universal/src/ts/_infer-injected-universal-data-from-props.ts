import { InjectedUniversalData } from ".";

/**
 * Infers the injected data structure from a universally rendered component via the component
 * props of a wrapped or enhanced component.
 */
export type InferInjectedUniversalDataFromProps<TProps> =
	TProps extends InjectedUniversalData<infer TData, infer TDomain, infer TType>
		? InjectedUniversalData<TData, TDomain, TType>
		: never;
