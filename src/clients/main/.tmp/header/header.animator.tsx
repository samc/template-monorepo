import * as Spring from "@react-spring/web";
import * as React from "react";

import * as Abstract from "@eden/abstract";

import * as TS from "@eden/client.main/ts";
import * as Utils from "@eden/client.main/utils";

import * as Constants from "./header.constants";

import { Controller } from "./header.controller";

const defaultProps = Object.freeze<Animator.Props>({
	config: Spring.config.gentle,
	springs: {
		background: "rgba(255, 255, 255, 0)",
		y: 0,
	},
});

export class Animator extends Abstract.Animator<
	Animator.Props,
	Animator.State
> {
	public readonly id = Constants.Component.ID;
	public static readonly displayName = `${Constants.Component.NAME}.Animator`;
	public static readonly defaultProps: Animator.Props = defaultProps;

	// ===[Context]===

	public static contextType = Controller.Context;
	declare context: Controller.ContextType;

	public static Context: Abstract.ContextType<typeof Animator>;
	public static useContext: Abstract.ContextHookType<typeof Animator.Context>;

	// ===[Animations]===

	protected animate(): void {
		this.animateActive();
	}

	private animateActive(): void {
		const { springs } = this.props;
		const { value: active } = this.context.data.header.active;

		this.controller.start({
			y: active ? -20 : springs.y,
		});

		this.controller.start({
			background: active ? "rgba(255, 255, 255, 1)" : springs.background,
		});
	}
}

export namespace Animator {
	export interface Springs {
		background: string;
		y: number;
	}

	export interface Props extends Abstract.Animator.Props<Animator.Springs> {}
	export interface State extends Abstract.Animator.State {}
	export interface Context
		extends Abstract.Animator.Context<Animator.Springs> {}

	export type ContextType = React.ContextType<typeof Animator.Context>;
}
