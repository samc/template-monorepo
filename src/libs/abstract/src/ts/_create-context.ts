import * as TS from "@taygo/abstract/ts";

import { InferContextFromComponent } from ".";

export type CreateContext<
	TComponent extends TS.ComponentType<any, any, any>,
	TContext = InferContextFromComponent<TComponent>,
> = (Component: TComponent) => React.Context<TContext>;

export type ContextType<
	TComponent extends TS.ComponentType<any, any, any>,
	TContext = InferContextFromComponent<TComponent>,
> = ReturnType<CreateContext<TComponent, TContext>>;
