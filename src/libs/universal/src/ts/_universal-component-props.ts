import { UniversalComponent } from ".";

/**
 * Signature for universal component props.
 */
export type UniversalComponentProps<TComponent> =
	TComponent extends UniversalComponent<infer TProps> ? TProps : never;
