import * as XS from "xstate";

import * as Abstract from "@eden/abstract";

import * as Updaters from "./machine.updaters";

/**
 * Available finite states for a App Machine
 */
enum AppState {
	INIT = "init",
}

enum AppActivity {}
enum AppDelay {}
enum AppGuard {}
enum AppService {}

/**
 * App {@link App.Context context} for the
 * {@link App `App`} state machine
 */
const defaultContext = Object.freeze<App.Context>({
	status: "",
	debug: true,
	// ...
});

/**
 * App state machine
 */
export class App extends Abstract.Machine<
	App.Context,
	App.States,
	App.Events,
	App.Services,
	App.TypesMeta
> {
	public static defaultContext: App.Context = defaultContext;

	public static State = AppState;
	public static Activity = AppActivity;
	public static Delay = AppDelay;
	public static Guard = AppGuard;
	public static Service = AppService;

	public get update() {
		return {
			status: Updaters.status,
			debug: Updaters.debug,
		};
	}

	protected init() {
		return XS.createMachine({
			context: App.defaultContext,
			tsTypes: {} as import("./machine.typegen").Typegen0,
			schema: {
				context: {} as App.Context,
				events: {} as App.Events,
				services: {} as App.Services,
			},
			id: "app",
			states: {
				[App.State.INIT]: {
					on: {
						...this.updaters,
					},
				},
			},
		});
	}
}

export namespace App {
	/**
	 * Context for the {@link App `App`} state machine
	 */
	export interface Context extends Abstract.Machine.DefaultContext {}

	/**
	 * Event Schema for the {@link App `App`} state machine
	 */
	export type Events = Updaters.Schema;

	/**
	 * State Schema for the {@link App `App`} state machine
	 */
	export type States = {
		value: AppState.INIT;
		context: App.Context;
	};

	/**
	 * Service Schema for the {@link App `App`} state machine
	 */
	export type Services = {
		// ...
	};

	/**
	 * Types Schema for the {@link App `App`} state machine
	 */
	export type TypesMeta = import("./machine.typegen").Typegen0;
}
