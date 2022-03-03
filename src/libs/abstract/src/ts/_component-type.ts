import React from "react";

import { ComponentClass } from "./_component-class";
import { PureComponentClass } from "./_pure-component-class";

export type ComponentType<
	TProps = {},
	TState = React.ComponentState,
	TContext = {},
> =
	| ComponentClass<TProps, TState, TContext>
	| PureComponentClass<TProps, TState, TContext>;
