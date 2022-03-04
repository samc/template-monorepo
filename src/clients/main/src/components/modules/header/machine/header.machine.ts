import * as XS from "xstate";

import * as Abstract from "@taygo/abstract";

import * as Updaters from "./header.machine.updaters";

/**
 * Available finite states for a Header Machine
 */
enum HeaderState {
	INIT = "init",
}

enum HeaderActivity {}
enum HeaderDelay {}
enum HeaderGuard {}
enum HeaderService {}

/**
 * Header {@link Header.Context context} for the
 * {@link Header `Header`} state machine
 */
const defaultContext = Object.freeze<Header.Context>({
	status: "",
	debug: true,
	// ...
});

/**
 * Header state machine
 */
export class Header extends Abstract.Machine<
	Header.Context,
	Header.States,
	Header.Events,
	Header.Services,
	Header.TypesMeta
> {
	public static defaultContext: Header.Context = defaultContext;

	public static State = HeaderState;
	public static Activity = HeaderActivity;
	public static Delay = HeaderDelay;
	public static Guard = HeaderGuard;
	public static Service = HeaderService;

	public get update() {
		return {
			status: Updaters.status,
			debug: Updaters.debug,
		};
	}

	protected init() {
		return XS.createMachine({
			context: Header.defaultContext,
			tsTypes: {} as import("./header.machine.typegen").Typegen0,
			schema: {
				context: {} as Header.Context,
				events: {} as Header.Events,
				services: {} as Header.Services,
			},
			id: "header",
			states: {
				[Header.State.INIT]: {
					on: {
						...this.updaters,
					},
				},
			},
		});
	}
}

export namespace Header {
	/**
	 * Context for the {@link Header `Header`} state machine
	 */
	export interface Context extends Abstract.Machine.DefaultContext {
		// ...
	}

	/**
	 * Event Schema for the {@link Header `Header`} state machine
	 */
	export type Events = Updaters.Schema;

	/**
	 * State Schema for the {@link Header `Header`} state machine
	 */
	export type States = {
		value: HeaderState.INIT;
		context: Header.Context;
	};

	/**
	 * Service Schema for the {@link Header `Header`} state machine
	 */
	export type Services = {
		// ...
	};

	/**
	 * Types Schema for the {@link Header `Header`} state machine
	 */
	export type TypesMeta = import("./machine.typegen").Typegen0;
}
