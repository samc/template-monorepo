import * as Immer from "immer";
import * as React from "react";

import * as Universal from "@eden/universal";

import * as Primitives from "@eden/abstract/primitives";

import * as TS from "@eden/abstract/ts";
import * as Utils from "@eden/abstract/utils";

export abstract class Sensor<
	TProps extends Sensor.Props<TContext>,
	TState extends Sensor.State<TData>,
	TData extends object,
	TContext extends Sensor.Context<TState> = Sensor.Context<TState>,
> extends Primitives.PureComponent<TProps, TState, TContext> {
	constructor(props: TProps) {
		super(props);
	}

	protected target: React.RefObject<HTMLElement> =
		React.createRef<HTMLElement>();
	protected element!: React.RefObject<HTMLElement>["current"] | Window;
	protected unmounted = false;

	// ===[Lifecycle]===

	public render(): React.ReactNode {
		return (
			<Sensor.Context.Provider value={this.ctx}>
				{Universal.render(this.props, this.ctx)}
			</Sensor.Context.Provider>
		);
	}

	public componentDidMount(): void {
		this.bindElement();
		this.bindEvents();
	}

	public componentWillUnmount(): void {
		this.unmounted = true;
		this.unbindEvents();
	}

	// ===[Context]===

	public static Context = Sensor.createContext(Sensor);
	public static useContext = Sensor.createContextHook(Sensor.Context);

	protected get ctx(): TContext {
		const { state, target } = this;
		return { ...state, target } as TContext;
	}

	// ===[Methods]===

	protected bindElement(): void {
		this.element = this.target.current || window;
	}

	protected setData(data: TData): void {
		this.setState(
			Immer.produce(this.state, (draft: TState) => {
				draft.data = data;
			}),
		);
	}

	protected abstract bindEvents(): void;
	protected abstract unbindEvents(): void;
	protected abstract handleEvent: ReturnType<typeof Utils.throttle>;
}

export namespace Sensor {
	export interface Props<TData extends object>
		extends Universal.UniversalRenderProps<TData> {
		/**
		 * Default time in ms (milliseconds) to throttle action
		 * events.
		 *
		 * @default 100
		 */
		throttle: number;
	}

	export interface State<TData extends object = {}> {
		data: TData;
	}

	export type Context<TState extends object = {}> = TState & {
		target: React.RefObject<HTMLElement>;
	};
}
