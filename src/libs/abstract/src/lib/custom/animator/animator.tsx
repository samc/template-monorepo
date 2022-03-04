import * as Spring from "@react-spring/web";
import * as React from "react";

import * as Primitives from "@taygo/abstract/primitives";

import * as TS from "@taygo/abstract/ts";
import * as Utils from "@taygo/abstract/utils";

export abstract class Animator<
	TProps extends Animator.Props<any>,
	TState extends Animator.State,
	TSprings extends object = TProps["springs"],
	TContext extends Animator.Context<TSprings> = Animator.Context<TSprings>,
> extends Primitives.PureComponent<TProps, React.ComponentState, TContext> {
	protected controller = new Spring.Controller<TSprings>({
		...this.props.springs,
		config: this.props.config,
	});
	protected config: Animator.Config = this.props.config;
	protected springs: TSprings = this.props.springs;

	// ===[Lifecycle]===

	public render(): React.ReactNode {
		const { children } = this.props;
		this.animate();
		return (
			<Animator.Context.Provider value={this.ctx}>
				{children}
			</Animator.Context.Provider>
		);
	}

	public componentWillUnmount(): void {
		this.unbindAnimations();
	}

	// ===[Context]===

	public static Context = Animator.createContext(Animator);
	public static useContext = Animator.createContextHook(Animator.Context);

	protected get ctx(): TContext {
		const { springs } = this.controller;
		return { springs } as TContext;
	}

	// ===[Methods]===

	private unbindAnimations(): void {
		this.controller.stop();
	}

	protected abstract animate(): void;
}

export namespace Animator {
	export type Config = Spring.SpringConfig;

	export interface Props<TSprings extends object> {
		config: Spring.SpringConfig;
		springs: TSprings;
	}
	export interface State extends React.ComponentState {}
	export interface Context<TSprings extends object> {
		springs: Spring.SpringValues<TSprings>;
	}
}
