import { ComponentType } from "./_component-type";

export type InferStateFromComponent<TComponent> =
	TComponent extends ComponentType<infer TProps, infer TState, infer TContext>
		? TState
		: never;
