import * as Immer from "immer";
import * as React from "react";
import * as XS from "xstate";

import * as Custom from "@taygo/abstract/custom";
import * as Primitives from "@taygo/abstract/primitives";
import * as TS from "@taygo/abstract/ts";
import * as Utils from "@taygo/abstract/utils";

export abstract class Controller<
	TProps extends Controller.Props<TMachines>,
	TState extends Controller.State<TMachines>,
	TMachines extends Controller.Machines<TMachines>,
	TContext extends Controller.Context<TMachines> = Controller.Context<TMachines>,
> extends Primitives.PureComponent<TProps, TState, TContext> {
	constructor(props: TProps) {
		super(props);

		this.state = {
			machines: Object.entries(this.props.machines).reduce((acc, entry) => {
				const [m, { machine }] = entry;
				acc[m] = machine.initialState as Custom.Machine.StateFrom<
					typeof machine
				>;
				return acc;
			}, {} as Controller.Machine.States<TMachines>),
		} as TState;

		this.service = Object.entries(this.props.machines).reduce((acc, entry) => {
			const [m, { machine }] = entry;
			const service = XS.interpret(machine, {
				devTools: true,
			}).onTransition((state) => {
				this.setMachineState(
					m,
					state as Custom.Machine.StateFrom<typeof machine>,
				);
			});
			acc[m] = service as Custom.Machine.InterpreterFrom<typeof machine>;
			return acc;
		}, {} as Controller.Machine.Services<TMachines>);

		this.dispatch = Object.entries(this.props.machines).reduce((acc, entry) => {
			const [m, { machine }] = entry;
			const dispatcher: XS.PayloadSender<
				Custom.Machine.EventsFrom<typeof machine>
			> = this.service[m].send;
			acc[m] = dispatcher;
			return acc;
		}, {} as Controller.Machine.Dispatchers<TMachines>);
	}

	// ===[Lifecycle]===

	public render(): React.ReactNode {
		const { children } = this.props;
		return (
			<Controller.Context.Provider value={this.ctx}>
				{children}
			</Controller.Context.Provider>
		);
	}

	public componentDidMount(): void {
		this.bindServices();
	}

	public componentWillUnmount(): void {
		this.unbindServices();
	}

	// ===[Context]===

	public static Context = Controller.createContext(Controller);
	public static useContext = Controller.createContextHook(Controller.Context);

	protected get ctx(): TContext {
		const { data, dispatch, service } = this;
		return { data, dispatch, service } as TContext;
	}

	// ===[Collections]===

	protected get data(): Controller.Machine.Data<TMachines> {
		return Object.entries(this.state.machines).reduce((acc, entry) => {
			const [m, machine] = entry;
			type context = Custom.Machine.ContextFrom<TMachines[typeof m]>;
			acc[m] = Object.entries(machine.context).reduce((acc, entry) => {
				const [v, value] = entry;
				acc[v] = {
					value,
					update: (value: context[typeof v]) =>
						this.service[m].send(
							this.props.machines[m].update[v].update(value),
						),
				};
				return acc;
			}, {} as Controller.Machine.Data<TMachines>[typeof m]);
			return acc;
		}, {} as Controller.Machine.Data<TMachines>);
	}

	protected service: Controller.Machine.Services<TMachines>;
	protected dispatch: Controller.Machine.Dispatchers<TMachines>;

	// ===[Methods]===

	private bindServices(): void {
		Object.values(this.service).forEach((service) => {
			service.start();
		});
	}

	private unbindServices(): void {
		Object.values(this.service).forEach((service) => {
			service.stop();
		});
	}

	/**
	 * Set the instance of a bound state machine. Invoked by a service when a
	 * state machine transitions to a new state.
	 */
	private setMachineState<
		TName extends keyof TMachines,
		TMachine extends TMachines[TName],
	>(name: TName, value: Custom.Machine.StateFrom<TMachine>): void {
		this.setState(
			Immer.produce((draft: TState) => {
				draft.machines[name] = value;
			}),
		);
	}
}

export namespace Controller {
	export interface Props<
		TMachines extends Controller.Machine.AnyMachines<TMachines>,
	> {
		machines: TMachines;
	}

	export interface State<
		TMachines extends Controller.Machine.AnyMachines<TMachines>,
	> {
		machines: Controller.Machine.States<TMachines>;
	}

	export type Machines<TMachines> = Controller.Machine.AnyMachines<TMachines>;

	export interface Context<
		TMachines extends Controller.Machine.AnyMachines<TMachines>,
	> {
		data: Controller.Machine.Data<TMachines>;
		dispatch: Controller.Machine.Dispatchers<TMachines>;
    service: Controller.Machine.Services<TMachines>;
	}

	export namespace Machine {
		export type AnyMachines<TMachines> = Record<
			keyof TMachines,
			Custom.Machine
		>;

		// ===[Collections]===

		export type Data<
			TMachines extends Controller.Machine.AnyMachines<TMachines>,
		> = {
			[M in keyof TMachines]: {
				[C in keyof Custom.Machine.ContextFrom<TMachines[M]>]: {
					value: Custom.Machine.ContextFrom<TMachines[M]>[C];
					update: (value: Custom.Machine.ContextFrom<TMachines[M]>[C]) => void;
				};
			};
		};

		export type Contexts<
			TMachines extends Controller.Machine.AnyMachines<TMachines>,
		> = {
			[M in keyof TMachines]: Custom.Machine.ContextFrom<TMachines[M]>;
		};

		export type Events<
			TMachines extends Controller.Machine.AnyMachines<TMachines>,
		> = {
			[M in keyof TMachines]: {
				[C in keyof Custom.Machine.ContextFrom<TMachines[M]>]: {
					set: Setter<Custom.Machine.ContextFrom<TMachines[M]>[C]>;
				};
			};
		};

		export type Dispatchers<
			TMachines extends Controller.Machine.AnyMachines<TMachines>,
		> = {
			[M in keyof TMachines]: XS.PayloadSender<
				Custom.Machine.EventsFrom<TMachines[M]>
			>;
		};

		export type Services<
			TMachines extends Controller.Machine.AnyMachines<TMachines>,
		> = {
			[M in keyof TMachines]: Custom.Machine.InterpreterFrom<TMachines[M]>;
		};

		export type States<
			TMachines extends Controller.Machine.AnyMachines<TMachines>,
		> = {
			[M in keyof TMachines]: Custom.Machine.StateFrom<TMachines[M]>;
		};

		// ===[Actors]===

		export type Dispatcher<TEvent extends XS.EventObject> =
			XS.PayloadSender<TEvent>;

		export type Setter<TPayload> = (payload: TPayload) => void;
	}
}
