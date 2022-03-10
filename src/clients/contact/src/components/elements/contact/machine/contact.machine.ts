import * as XS from "xstate";

import * as Abstract from "@taygo/abstract";
import * as Schema from "@taygo/client.contact/graphql/schema";

import * as Actions from "./contact.machine.actions";
import * as Updaters from "./contact.machine.updaters";

/**
 * Available finite states for a Contact Machine
 */
enum ContactState {
	INIT = "init",
	SUBMITTED = "submitted",
	SUCCESS = "success",
	ERROR = "error",
}

enum ContactActivity {}
enum ContactDelay {}
enum ContactGuard {}
enum ContactService {}

/**
 * Contact {@link Contact.Context context} for the
 * {@link Contact `Contact`} state machine
 */
const defaultContext = Object.freeze<Contact.Context>({
	status: "",
	debug: true,
	// ...
	email: "",
	name: "",
	message: "",
});

/**
 * Contact state machine
 */
export class Contact extends Abstract.Machine<
	Contact.Context,
	Contact.States,
	Contact.Events,
	Contact.Services,
	Contact.TypesMeta
> {
	public static defaultContext: Contact.Context = defaultContext;

	public static State = ContactState;
	public static Activity = ContactActivity;
	public static Delay = ContactDelay;
	public static Guard = ContactGuard;
	public static Service = ContactService;

	public get update() {
		return {
			status: Updaters.status,
			debug: Updaters.debug,
			email: Updaters.email,
			name: Updaters.name,
			message: Updaters.message,
		};
	}

	protected init() {
		return XS.createMachine({
			context: Contact.defaultContext,
			tsTypes: {} as import("./contact.machine.typegen").Typegen0,
			schema: {
				context: {} as Contact.Context,
				events: {} as Contact.Events,
				services: {} as Contact.Services,
			},
			id: "contact",
			initial: ContactState.INIT,
			states: {
				init: {
					on: {
						SUBMIT: {
							target: Contact.State.SUBMITTED,
						},
					},
				},
				submitted: {
					invoke: {
						src: Actions.submitContactForm,
						onDone: {
							target: Contact.State.SUCCESS,
							actions: [(...args) => console.info(args)],
						},
						onError: {
							target: Contact.State.ERROR,
							actions: [(...args) => console.error(args)],
						},
					},
				},
				success: {},
				error: {},
			},
			on: {
				...this.updaters,
			},
		});
	}
}

export namespace Contact {
	/**
	 * Context for the {@link Contact `Contact`} state machine
	 */
	export type Context = Abstract.Machine.DefaultContext &
		Schema.ContactCreateInput;

	/**
	 * Event Schema for the {@link Contact `Contact`} state machine
	 */
	export type Events = Updaters.Schema | { type: "SUBMIT" };

	/**
	 * State Schema for the {@link Contact `Contact`} state machine
	 */
	export type States = {
		value: ContactState.INIT;
		context: Contact.Context;
	};

	/**
	 * Service Schema for the {@link Contact `Contact`} state machine
	 */
	export type Services = {
		// ...
	};

	/**
	 * Types Schema for the {@link Contact `Contact`} state machine
	 */
	export type TypesMeta = import("./contact.machine.typegen").Typegen0;
}
