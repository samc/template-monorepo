import * as Spring from "@react-spring/web";
import * as React from "react";

import * as Abstract from "@taygo/abstract";

import * as TS from "@taygo/client.contact/ts";
import * as Utils from "@taygo/client.contact/utils";

import * as Constants from "./contact.constants";

import { Controller } from "./contact.controller";

const defaultSprings = Object.freeze<Animator.Springs>({
	// ...
});

const defaultProps = Object.freeze<Animator.Props>({
	config: Spring.config.wobbly,
	springs: defaultSprings,
});

export class Animator extends Abstract.Animator<
	Animator.Props,
	Animator.State
> {
	public readonly id = Constants.Component.ID;
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
		const {} = this.context.data.contact;

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