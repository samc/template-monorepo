import * as XS from "xstate";

import * as Abstract from "@taygo/abstract";

import * as Updaters from "./global.machine.updaters";

/**
 * Available finite states for a Global Machine
 */
enum GlobalState {
	INIT = "init",
}

enum GlobalActivity {}
enum GlobalDelay {}
enum GlobalGuard {}
enum GlobalService {}

/**
 * Global {@link Global.Context context} for the
 * {@link Global `Global`} state machine
 */
const defaultContext = Object.freeze<Global.Context>({
	status: "",
	debug: true,
	// ...
});

/**
 * Global state machine
 */
export class Global extends Abstract.Machine<
	Global.Context,
	Global.States,
	Global.Events,
	Global.Services,
	Global.TypesMeta
> {
	public static defaultContext: Global.Context = defaultContext;

	public static State = GlobalState;
	public static Activity = GlobalActivity;
	public static Delay = GlobalDelay;
	public static Guard = GlobalGuard;
	public static Service = GlobalService;

	public get update() {
		return {
			status: Updaters.status,
			debug: Updaters.debug,
		};
	}

	protected init() {
		return XS.createMachine({
			context: Global.defaultContext,
			tsTypes: {} as import("./global.machine.typegen").Typegen0,
			schema: {
				context: {} as Global.Context,
				events: {} as Global.Events,
				services: {} as Global.Services,
			},
			id: "default",
			states: {
				[Global.State.INIT]: {
					on: {
						...this.updaters,
					},
				},
			},
		});
	}
}

export namespace Global {
	/**
	 * Context for the {@link Global `Global`} state machine
	 */
	export interface Context extends Abstract.Machine.DefaultContext {
		// ...
	}

	/**
	 * Event Schema for the {@link Global `Global`} state machine
	 */
	export type Events = Updaters.Schema;

	/**
	 * State Schema for the {@link Global `Global`} state machine
	 */
	export type States = {
		value: GlobalState.INIT;
		context: Global.Context;
	};

	/**
	 * Service Schema for the {@link Global `Global`} state machine
	 */
	export type Services = {
		// ...
	};

	/**
	 * Types Schema for the {@link Global `Global`} state machine
	 */
	export type TypesMeta = import("./global.typegen").Typegen0;
}
