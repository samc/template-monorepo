import * as React from "react";

import * as TS from "@eden/abstract/ts";

/**
 * Creates a context hook factory for an abstract component with a given context type.
 */
export function createContextHook<TContext>(
	Context: React.Context<TContext>,
): () => TContext {
	return function (): TContext {
		const context = React.useContext(Context);
		if (!!!context) {
			const target = Context.displayName;
			console.error({
				target,
				message: `Hook \`<useContext>\` must be used within the \`<${target}.Context.Provider>\`.`,
			});
		}
		return context;
	};
}
