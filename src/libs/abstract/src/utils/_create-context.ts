import * as React from "react";

import * as TS from "@taygo/abstract/ts";

/**
 * Creates a factory that returns a context `Component` with a given context type.
 */
export function createContext<
	TComponent extends TS.ComponentType<any, any, any>,
	TContext = TS.InferContextFromComponent<TComponent>,
>(Component: TComponent): React.Context<TContext> {
	return React.createContext<TContext>({} as TContext);
}
