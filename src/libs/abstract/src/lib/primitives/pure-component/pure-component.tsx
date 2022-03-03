import * as React from "react";

import * as TS from "@eden/abstract/ts";
import * as Utils from "@eden/abstract/utils";

export abstract class PureComponent<
	TProps = {},
	TState = React.ComponentState,
	TContext = {},
> extends React.PureComponent<TProps, TState> {
	public abstract readonly id: string;

	// ===[Lifecycle]===

	public componentWillUnmount() {
		this.clearTimeouts();
	}

	// ===[Context]===

	public static createContext = Utils.createContext;
	public static createContextHook = Utils.createContextHook;

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
