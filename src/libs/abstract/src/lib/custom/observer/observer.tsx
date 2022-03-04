import * as Immer from "immer";
import * as React from "react";

import * as Primitives from "@taygo/abstract/primitives";

import * as TS from "@taygo/abstract/ts";
import * as Utils from "@taygo/abstract/utils";

export abstract class Observer<
	TProps extends Observer.Props<TSensors>,
	TState extends Observer.State<TConditions>,
	TSensors extends object = TProps["sensors"],
	TConditions extends object = TState["conditions"],
	TContext extends Observer.Context<TSensors> = Observer.Context<TSensors>,
> extends Primitives.PureComponent<TProps, TState, TContext> {
	// ===[Lifecycle]===

	public render(): React.ReactNode {
		const { children } = this.props;
		return (
			<Observer.Context.Provider value={this.ctx}>
				{children}
			</Observer.Context.Provider>
		);
	}

	// ===[Context]===

	public static Context = Observer.createContext(Observer);
	public static useContext = Observer.createContextHook(Observer.Context);

	protected get ctx(): TContext {
		const { sensors } = this.props;
		return { sensors } as TContext;
	}

	// ===[Methods]===

	protected abstract bindAnchors(
		prevProps: Readonly<TProps>,
		prevState: Readonly<TState>,
	): void;
	protected abstract bindWatchers(
		prevProps: Readonly<TProps>,
		prevState: Readonly<TState>,
	): void;

	@Utils.debug()
	public setCondition<TName extends keyof TConditions>(
		name: TName,
		value: TConditions[TName],
	): void {
		this.setState(
			Immer.produce(this.state, (draft: TState) => {
				const { conditions } = draft;
				conditions[name] = value;
			}),
		);
	}
}

export namespace Observer {
	export interface Props<TSensors extends object> {
		sensors: TSensors;
	}

	export interface State<TConditions extends object> {
		conditions: TConditions;
	}

	export interface Context<TSensors extends object> {
		sensors: TSensors;
	}
}
