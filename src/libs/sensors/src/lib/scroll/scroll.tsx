import * as React from "react";

import * as Abstract from "@eden/abstract";
import * as Universal from "@eden/universal";

import * as TS from "@eden/sensors/ts";
import * as Utils from "@eden/sensors/utils";

import * as Constants from "./scroll.constants";
import * as Errors from "./scroll.errors";

const defaultProps = Object.freeze<Scroll.Props>({
	throttle: Constants.Config.THROTTLE,
});

const defaultState = Object.freeze<Scroll.State>({
	data: {
		x: 0,
		y: 0,
	},
});

const defaultContext = Object.freeze<Scroll.Context>({
	target: React.createRef<HTMLElement>(),
	data: defaultState.data,
});

export class Scroll extends Abstract.Sensor<
	Scroll.Props,
	Scroll.State,
	Scroll.Data
> {
	constructor(props: Scroll.Props) {
		super(props);
	}

	public readonly id = Constants.Component.ID;
	public static readonly displayName = `${Constants.Component.NAME}.Scroll`;
	public static readonly defaultProps: Scroll.Props = defaultProps;
	public static readonly defaultState: Scroll.State = defaultState;
	public static readonly defaultContext: Scroll.Context = defaultContext;
	public state: Scroll.State = defaultState;

	// ===[Context]===

	public static Context: Abstract.ContextType<typeof Scroll>;
	public static useContext: Abstract.ContextHookType<typeof Scroll.Context>;

	// ===[Events]===

	protected bindEvents(): void {
		Utils.on(this.element, "scroll", this.handleEvent);
	}

	protected unbindEvents(): void {
		Utils.off(this.element, "scroll", this.handleEvent);
	}

	protected handleEvent = Utils.throttle((event: Event): void => {
		if (this.unmounted) {
			return;
		}

		let x, y: number;

		if (this.target instanceof Element) {
			x = this.target.scrollLeft;
			y = this.target.scrollTop;
		} else {
			x = window.scrollX;
			y = window.scrollY;
		}

		this.setData({
			x,
			y,
		});
	}, this.props.throttle);
}

export namespace Scroll {
	export type Data = {
		/**
		 * The X (horizontal) coordinate (in pixels) of the target element
		 * relative to the document.
		 *
		 * @default 0
		 */
		x: number;

		/**
		 * The Y (vertical) coordinate (in pixels) of the target element
		 * relative to the document.
		 *
		 * @default 0
		 */
		y: number;
	};

	export interface Props extends Abstract.Sensor.Props<Scroll.Context> {}
	export interface State extends Abstract.Sensor.State<Scroll.Data> {}
	export interface Context extends Abstract.Sensor.Context<Scroll.State> {}

	export type ContextType = React.ContextType<typeof Scroll.Context>;
}

export const withScrollSensor = Universal.enhance(Scroll, "sensors", "scroll");
