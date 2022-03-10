import * as XS from "xstate";

import * as Abstract from "@taygo/abstract";

import * as Updaters from "./machine.updaters";

/**
 * Available finite states for a Home Machine
 */
enum HomeState {
	INIT = "init",
}

enum HomeActivity {}
enum HomeDelay {}
enum HomeGuard {}
enum HomeService {}

/**
 * Home {@link Home.Context context} for the
 * {@link Home `Home`} state machine
 */
const defaultContext = Object.freeze<Home.Context>({
	status: "",
	debug: true,
	// ...
});

/**
 * Home state machine
 */
export class Home extends Abstract.Machine<
	Home.Context,
	Home.States,
	Home.Events,
	Home.Services,
	Home.TypesMeta
> {
	public static defaultContext: Home.Context = defaultContext;

	public static State = HomeState;
	public static Activity = HomeActivity;
	public static Delay = HomeDelay;
	public static Guard = HomeGuard;
	public static Service = HomeService;

	public get update() {
		return {
			status: Updaters.status,
			debug: Updaters.debug,
		};
	}

	protected init() {
		return XS.createMachine({
			context: Home.defaultContext,
			tsTypes: {} as import("./machine.typegen").Typegen0,
			schema: {
				context: {} as Home.Context,
				events: {} as Home.Events,
				services: {} as Home.Services,
			},
			id: "template.home",
			states: {
				init: {
					on: {
						...this.updaters,
					},
				},
			},
		});
	}
}

export namespace Home {
	/**
	 * Context for the {@link Home `Home`} state machine
	 */
	export type Context = {
		/**
		 * Current status of the Machine instance
		 */
		status: string;

		/**
		 * Indicates the debug state of the Machine
		 */
		debug: boolean;
	};

	/**
	 * Event Schema for the {@link Home `Home`} state machine
	 */
	export type Events = Updaters.Schema;

	/**
	 * State Schema for the {@link Home `Home`} state machine
	 */
	export type States = {
		value: HomeState.INIT;
		context: Home.Context;
	};

	/**
	 * Service Schema for the {@link Home `Home`} state machine
	 */
	export type Services = {
		// ...
	};

	/**
	 * Types Schema for the {@link Home `Home`} state machine
	 */
	export type TypesMeta = import("./machine.typegen").Typegen0;
}
