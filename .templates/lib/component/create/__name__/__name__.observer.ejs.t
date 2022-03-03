---
to: "<%= options.observer && options.controller ? `${target}/${fileName}/${fileName}.observer.tsx` : null %>"
---
import * as React from "react";

import * as Abstract from "@eden/abstract";
import * as Sensors from "@eden/sensors";

import * as TS from "$ts";
import * as Utils from "$utils";

import * as Constants from "./<%= fileName %>.constants";
import * as Errors from "./<%= fileName %>.errors";

import { Controller } from "./<%= fileName %>.controller";

const defaultProps = Object.freeze<Observer.Props>({
	sensors: {},
});

const defaultState = Object.freeze<Observer.State>({
	conditions: {},
});

const withSensors = Sensors.compose();

@withSensors
export class Observer extends Abstract.Observer<Observer.Props, Observer.State> {
	public readonly id = Constants.Component.ID
	public static readonly displayName = `${Constants.Component.NAME}.Observer`;
	public static readonly defaultProps: Observer.Props = defaultProps;
	public static readonly defaultState: Observer.State = defaultState;
	public readonly state: Observer.State = defaultState;

	// ===[Lifecycle]===

	public componentDidUpdate(prevProps: Readonly<Observer.Props>, prevState: Readonly<Observer.State>): void {
		this.bindAnchors(prevProps, prevState);
		this.bindWatchers(prevProps, prevState);
	}

	// ===[Context]===

	public static contextType = Controller.Context;
	declare context: Controller.ContextType;

	public static Context: Abstract.ContextType<typeof Observer>;
	public static useContext: Abstract.ContextHookType<typeof Observer.Context>;

	// ===[Anchors]===

	protected bindAnchors(prevProps: Readonly<Observer.Props>, prevState: Readonly<Observer.State>): void {
		// ...
	}

	// ===[Watchers]===

	protected bindWatchers(prevProps: Readonly<Observer.Props>, prevState: Readonly<Observer.State>): void {
		// ...
	}
}

export namespace Observer {
	export interface Sensors extends Sensors.WithSensorProps<typeof withSensors> {}

	export interface Conditions {}

	export interface Props extends Abstract.Observer.Props<Sensors> {}
	export interface State extends Abstract.Observer.State<Conditions> {}
	export interface Context extends Abstract.Observer.Context<Sensors> {}

	export type ContextType = React.ContextType<typeof Observer.Context>;
}
