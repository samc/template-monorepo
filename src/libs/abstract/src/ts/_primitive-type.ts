import React from "react";

import { PureComponentClass } from "./_pure-component-class";

export type PrimitiveType<
	TProps = any,
	TState = any,
	TContext = any,
> = PureComponentClass<TProps, TState, TContext>;
