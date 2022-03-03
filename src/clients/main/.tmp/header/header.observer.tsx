import * as React from "react";

import * as Abstract from "@eden/abstract";
import * as Sensors from "@eden/sensors";

import * as TS from "@eden/client.main/ts";
import * as Utils from "@eden/client.main/utils";

import * as Constants from "./header.constants";
import * as Errors from "./header.errors";

import { Controller } from "./header.controller";

const defaultProps = Object.freeze<Observer.Props>({
	sensors: {
		measure: Sensors.Measure.defaultPayload,
		scroll: Sensors.Scroll.defaultContext,
	},
});

const defaultState = Object.freeze<Observer.State>({
	conditions: {
		offset: -100,
	},
});

const withSensors = Sensors.compose(
	Sensors.withMeasureSensor,
	Sensors.withScrollSensor,
);

@withSensors
export class Observer extends Abstract.Observer<
	Observer.Props,
	Observer.State
> {
	constructor(props: Observer.Props) {
		super(props);
	}

	public readonly id = Constants.Component.ID;
	public static readonly displayName = `${Constants.Component.NAME}.Observer`;
	public static readonly defaultProps: Observer.Props = defaultProps;
	public static readonly defaultState: Observer.State = defaultState;
	public readonly state: Observer.State = defaultState;

	// ===[Lifecycle]===

	public componentDidUpdate(
		prevProps: Readonly<Observer.Props>,
		prevState: Readonly<Observer.State>,
	): void {
		this.bindAnchors(prevProps, prevState);
		this.bindWatchers(prevProps, prevState);
	}

	// ===[Context]===

	public static contextType = Controller.Context;
	declare context: Controller.ContextType;

	public static Context: Abstract.ContextType<typeof Observer>;
	public static useContext: Abstract.ContextHookType<typeof Observer.Context>;

	// ===[Anchors]===

	protected bindAnchors(
		prevProps: Readonly<Observer.Props>,
		prevState: Readonly<Observer.State>,
	): void {
		this.anchorOffset(prevProps, prevState);
	}

	private anchorOffset(
		prevProps: Readonly<Observer.Props>,
		prevState: Readonly<Observer.State>,
	): void {
		const { data: prevScroll } = prevProps.sensors.scroll;
		const { data: currScroll } = this.props.sensors.scroll;

		if (prevScroll.y === currScroll.y) {
			return;
		}

		const { data: currResize } = this.props.sensors.measure;
		const offset = currScroll.y - currResize.height;

		return this.setCondition("offset", offset);
	}

	// ===[Watchers]===

	protected bindWatchers(
		prevProps: Readonly<Observer.Props>,
		prevState: Readonly<Observer.State>,
	): void {
		this.watchOffset(prevProps, prevState);
	}

	private watchOffset(
		prevProps: Readonly<Observer.Props>,
		prevState: Readonly<Observer.State>,
	): void {
		const { offset: prevOffset } = prevState.conditions;
		const { offset: currOffset } = this.state.conditions;
		if (prevOffset === currOffset) {
			return;
		}

		const { value: prevActive } = this.context.data.header.active;
		const currActive = currOffset >= 0;
		if (prevActive === currActive) {
			return;
		}

		this.context.data.header.active.update(currActive);
	}
}

export namespace Observer {
	export type Sensors = Sensors.WithSensorProps<typeof withSensors>;

	export interface Conditions {
		offset: number;
	}

	export interface Props extends Abstract.Observer.Props<Sensors> {}
	export interface State extends Abstract.Observer.State<Conditions> {}
	export interface Context extends Abstract.Observer.Context<Sensors> {}

	export type ContextType = React.ContextType<typeof Observer.Context>;
}
