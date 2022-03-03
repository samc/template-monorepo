import { ComponentType } from "./_component-type";

export type InferContextFromComponent<
	TComponent extends ComponentType<any, any, any>,
> = TComponent extends ComponentType<any, any, infer TContext>
	? TContext
	: never;
