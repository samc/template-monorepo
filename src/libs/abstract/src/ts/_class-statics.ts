import * as React from "react";

export interface ClassStatics<
	TProps = {},
	TState = React.ComponentState,
	TContext = {},
> extends React.StaticLifecycle<TProps, TState> {
	contextType?: React.Context<any> | undefined;
	contextTypes?: React.ValidationMap<any> | undefined;
	childContextTypes?: React.ValidationMap<any> | undefined;
	defaultProps?: Partial<TProps> | undefined;
	displayName?: string | undefined;
}
