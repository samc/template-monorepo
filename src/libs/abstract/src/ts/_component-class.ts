import React from "react";

import * as Primitives from "@eden/abstract/primitives";

import { ClassStatics } from "./_class-statics";

export interface ComponentClass<
	TProps = {},
	TState = React.ComponentState,
	TContext = {},
> extends ComponentClassConstructor<TProps, TState, TContext>,
		ClassStatics<TProps, TState, TContext> {}

export type ComponentClassConstructor<
	TProps = {},
	TState = React.ComponentState,
	TContext = {},
> = abstract new (props: TProps) => Primitives.Component<
	TProps,
	TState,
	TContext
>;
