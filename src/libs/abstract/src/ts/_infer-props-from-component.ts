import { ComponentType } from "./_component-type";

export type InferPropsFromComponent<TComponent> =
	TComponent extends ComponentType<infer TProps, infer TState, infer TContext>
		? TProps
		: never;
