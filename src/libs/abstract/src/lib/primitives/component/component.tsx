import * as React from "react";

import * as TS from "@taygo/abstract/ts";
import * as Utils from "@taygo/abstract/utils";

export abstract class Component<
	TProps extends Component.Props,
	TState extends Component.State = React.ComponentState,
	TContext extends Component.Context = {},
> extends React.Component<TProps, TState> {
	public abstract readonly id: string;

	// ===[Lifecycle]===

	public componentWillUnmount() {
		this.clearTimeouts();
	}

	// ===[Context]===

	public static createContext = Utils.createContext;
	public static createContextHook = Utils.createContextHook;

	protected abstract get ctx(): TContext;

	// ===[Timeouts]===

	private timeoutIds: number[] = [];

	/**
	 * Set a timeout and remember its ID.
	 * All stored timeouts will be cleared when component unmounts.
	 *
	 * @returns a "cancel" function that will clear timeout when invoked.
	 */
	public setTimeout(callback: () => void, timeout?: number) {
		const handle = window.setTimeout(callback, timeout);
		this.timeoutIds.push(handle);
		return () => window.clearTimeout(handle);
	}

	/**
	 * Clear all known timeouts.
	 */
	public clearTimeouts = () => {
		if (this.timeoutIds.length > 0) {
			for (const timeoutId of this.timeoutIds) {
				window.clearTimeout(timeoutId);
			}
			this.timeoutIds = [];
		}
	};
}

export namespace Component {
	export interface Props {}
	export interface State {}
	export interface Context {}
}
