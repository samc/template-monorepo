---
to: "<%= type.name === 'client' ? `${dir}/${fileName}.ts` : type.name === 'lib' ? `${dir}/${fileName}.ts` : null %>"
---
import * as XS from "xstate";

import * as Abstract from "@eden/abstract";

import * as Updaters from "./<%= fileName %>.updaters";

/**
 * Available finite states for a <%= className %> Machine
 */
enum <%= className %>State {
	INIT = "init",
}

enum <%= className %>Activity {}
enum <%= className %>Delay {}
enum <%= className %>Guard {}
enum <%= className %>Service {}

/**
 * <%= className %> {@link <%= className %>.Context context} for the
 * {@link <%= className %> `<%= className %>`} state machine
 */
const defaultContext = Object.freeze<<%= className %>.Context>({
	status: "",
	debug: true
	// ...
});

/**
 * <%= className %> state machine
 */
export class <%= className %> extends Abstract.Machine<
	<%= className %>.Context,
	<%= className %>.States,
	<%= className %>.Events,
	<%= className %>.Services,
	<%= className %>.TypesMeta
> {
	public static defaultContext: <%= className %>.Context = defaultContext;

	public static State = <%= className %>State;
	public static Activity = <%= className %>Activity;
	public static Delay = <%= className %>Delay;
	public static Guard = <%= className %>Guard;
	public static Service = <%= className %>Service;

	public get update() {
		return {
			status: Updaters.status,
			debug: Updaters.debug,
		};
	}

	protected __machine = XS.createMachine({
		context: <%= className %>.defaultContext,
		tsTypes: {} as import("./<%= fileName %>.typegen").Typegen0,
		schema: {
			context: {} as <%= className %>.Context,
			events: {} as <%= className %>.Events,
			services: {} as <%= className %>.Services,
		},
		id: "<%= propertyName %>",
		states: {
			[<%= className %>.State.INIT]: {
				on: {
					...this.updaters,
				},
			},
		},
	});
}

export namespace <%= className %> {
	/**
	 * Context for the {@link <%= className %> `<%= className %>`} state machine
	 */
	export interface Context extends Abstract.Machine.DefaultContext {
		// ...
	}

	/**
	 * Event Schema for the {@link <%= className %> `<%= className %>`} state machine
	 */
	export type Events = Updaters.Schema;

	/**
	 * State Schema for the {@link <%= className %> `<%= className %>`} state machine
	 */
	export type States = {
		value: <%= className %>State.INIT;
		context: <%= className %>.Context;
	};

	/**
	 * Service Schema for the {@link <%= className %> `<%= className %>`} state machine
	 */
	export type Services = {
		// ...
	};

	/**
	 * Types Schema for the {@link <%= className %> `<%= className %>`} state machine
	 */
	export type TypesMeta = import("./<%= fileName %>.typegen").Typegen0;
}
