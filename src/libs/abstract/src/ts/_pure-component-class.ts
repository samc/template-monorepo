import React from "react";

import * as Primitives from "@taygo/abstract/primitives";

import { ClassStatics } from "./_class-statics";

export interface PureComponentClass<
	TProps = {},
	TState = React.ComponentState,
	TContext = {},
> extends PureComponentClassConstructor<TProps, TState, TContext>,
		ClassStatics<TProps, TState, TContext> {}

export type PureComponentClassConstructor<
	TProps = {},
	TState = React.ComponentState,
	TContext = {},
> = abstract new (props: TProps) => Primitives.PureComponent<
	TProps,
	TState,
	TContext
>;
