---
to: "<%= options.observer && options.controller ? `${target}/${fileName}/${fileName}.animator.tsx` : null %>"
---
import * as Spring from "@react-spring/web";
import * as React from "react";

import * as Abstract from "@eden/abstract";

import * as TS from "$ts";
import * as Utils from "$utils";

import * as Constants from "./<%= fileName %>.constants";

import { Controller } from "./<%= fileName %>.controller";

const defaultSprings = Object.freeze<Animator.Springs>({
	// ...
});

const defaultProps = Object.freeze<Animator.Props>({
	config: Spring.config.wobbly,
	springs: defaultSprings,
});

export class Animator extends Abstract.Animator<
	Animator.Props,
	Animator.State,
> {
	public readonly id = Constants.Component.ID
	public static readonly displayName = `${Constants.Component.NAME}.Animator`;
	public static readonly defaultProps: Animator.Props = defaultProps;
	public static readonly defaultSprings: Animator.Springs = defaultSprings;

	// ===[Context]===

	public static contextType = Controller.Context;
	declare context: Controller.ContextType;

	public static Context: Abstract.ContextType<typeof Animator>;
	public static useContext: Abstract.ContextHookType<typeof Animator.Context>;

	// ===[Animations]===

	protected animate(): void {
		const {} = this.context.data.<%= name %>;

		this.controller.update({
			// ...
		});
	}
}

export namespace Animator {
	export interface Springs {
		// ...
	}

	export interface Props extends Abstract.Animator.Props<Animator.Springs> {}
	export interface State extends Abstract.Animator.State {}
	export interface Context extends Abstract.Animator.Context<Springs> {}

	export type ContextType = React.ContextType<typeof Animator.Context>;
}
