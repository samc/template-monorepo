import * as React from "react";

export type CreateContextHook<TContext extends React.Context<any>> = (
	Context: TContext,
) => () => React.ContextType<TContext>;

export type ContextHookType<TContext extends React.Context<any>> = ReturnType<
	CreateContextHook<TContext>
>;
