import * as X from "@xstyled/styled-components";
import * as XS from "xstate";

import * as Abstract from "@eden/abstract";

import * as Constants from "./theme.constants";
import * as Updaters from "./theme.updaters";

/**
 * Available finite states for a Theme Machine
 */
enum ThemeState {
	INIT = "init",
}

enum ThemeActivity {}
enum ThemeDelay {}
enum ThemeGuard {}
enum ThemeService {}

/**
 * Default {@link Theme.Options options} for the
 * {@link Theme `Theme`} state machine
 * @see {@link XS.MachineOptions}
 */
const defaultOptions = Object.freeze<Theme.Options>({
	actions: {},
	activities: {},
	delays: {},
	guards: {},
	services: {},
});

/**
 * Default {@link Theme.Context context} for the
 * {@link Theme `Theme`} state machine
 */
const defaultContext = Object.freeze<Theme.Context>({
	status: "",
	debug: true,
	config: Constants.defaultTheme,
});

/**
 * Theme state machine
 */
export class Theme extends Abstract.Machine<
	Theme.Context,
	Theme.EventsSchema,
	Theme.StateSchema
> {
	public static id = "theme";
	public static defaultContext: Theme.Context = defaultContext;
	public static defaultOptions: Theme.Options = defaultOptions;

	public static State = ThemeState;
	public static Activity = ThemeActivity;
	public static Delay = ThemeDelay;
	public static Guard = ThemeGuard;
	public static Service = ThemeService;

	public get update(): Abstract.Machine.Update<Theme.Context> {
		return {
			status: Updaters.status,
			debug: Updaters.debug,
			config: Updaters.config,
		};
	}

	public init(
		overrides?: Theme.Overrides,
		options: Theme.Options = Theme.defaultOptions,
	) {
		return XS.createMachine<
			Theme.Context,
			Theme.EventsSchema,
			Theme.StateSchema
		>(
			{
				id: Theme.id,
				context: {
					...Theme.defaultContext,
				},
				initial: Theme.State.INIT,
				states: {
					[Theme.State.INIT]: {
						entry: XS.send(
							this.update.status.update("Theme Machine initiated."),
						),
					},
				},
				on: {
					[this.update.status.type]: { actions: this.update.status.action },
					[this.update.debug.type]: { actions: this.update.debug.action },
					[this.update.config.type]: { actions: this.update.config.action },
				},
			},
			options,
		);
	}
}

export namespace Theme {
	/**
	 * Context for the {@link Theme `Theme`} state machine
	 */
	export type Context = Abstract.Machine.Context & {
		/**
		 * @todo
		 */
		config: X.Theme;
	};

	/**
	 * Configuration overrides for the {@link Theme `Theme`} state machine
	 */
	export type Overrides = Abstract.Machine.Overrides<
		Theme.Context,
		Theme.EventsSchema,
		Theme.StateSchema
	>;

	/**
	 * Options for the {@link Theme `Theme`} state machine
	 * @see {@link XS.MachineOptions}
	 */
	export type Options = Abstract.Machine.Options<
		Theme.Context,
		Theme.EventsSchema
	>;

	/**
	 * Event Schema for the {@link Theme `Theme`} state machine
	 */
	export type EventsSchema = Updaters.Schema;

	/**
	 * State Schema for the {@link Theme `Theme`} state machine
	 */
	export type StateSchema = {
		value: ThemeState.INIT;
		context: Theme.Context;
	};

	/**
	 * A dictionary of all context updaters available for the {@link Theme `Theme`}
	 * state machine
	 */
	export type Updaters = Abstract.Machine.Update<Theme.Context>;
}
