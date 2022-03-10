import * as Immer from "@xstate/immer";

import { Contact } from "./contact.machine";

/**
 * Event type signatures.
 */
export enum Type {
	// ===[Default]===
	STATUS = "STATUS_UPDATE",
	DEBUG = "DEBUG_UPDATE",
	// ===[Custom]===
	MESSAGE = "MESSAGE_UPDATE",
	EMAIL = "EMAIL_UPDATE",
	NAME = "NAME_UPDATE",
}

export type Schema =
	| StatusEvent
	| DebugEvent
	| NameEvent
	| EmailEvent
	| NameEvent
	| MessageEvent;

// ---[Status]-----------------------------------------------------------------

/**
 * Event signature for the {@link status `status`} updater.
 */
type StatusEvent = Immer.ImmerUpdateEvent<
	Type.STATUS,
	Contact.Context["status"]
>;

/**
 * Updater for the {@link Contact.Context.status `status`} context
 * property.
 */
export const status = Immer.createUpdater<Contact.Context, StatusEvent>(
	Type.STATUS,
	(ctx, { input }) => {
		ctx.status = input;
	},
);

// ---[Debug]------------------------------------------------------------------

/**
 * Event signature for the {@link debug `debug`} updater.
 */
type DebugEvent = Immer.ImmerUpdateEvent<Type.DEBUG, Contact.Context["debug"]>;

/**
 * Updater for the {@link Contact.Context.debug `debug`} context
 * property.
 */
export const debug = Immer.createUpdater<Contact.Context, DebugEvent>(
	Type.DEBUG,
	(ctx, { input }) => {
		ctx.debug = input;
	},
);

// ---[Name]------------------------------------------------------------------

/**
 * Event signature for the {@link name `name`} updater.
 */
type NameEvent = Immer.ImmerUpdateEvent<Type.NAME, Contact.Context["name"]>;

/**
 * Updater for the {@link Name.Context.name `name`} context
 * property.
 */
export const name = Immer.createUpdater<Contact.Context, NameEvent>(
	Type.NAME,
	(ctx, { input }) => {
		ctx.name = input;
	},
);

// ---[Email]------------------------------------------------------------------

/**
 * Event signature for the {@link email `email`} updater.
 */
type EmailEvent = Immer.ImmerUpdateEvent<Type.EMAIL, Contact.Context["email"]>;

/**
 * Updater for the {@link Email.Context.email `email`} context
 * property.
 */
export const email = Immer.createUpdater<Contact.Context, EmailEvent>(
	Type.EMAIL,
	(ctx, { input }) => {
		ctx.email = input;
	},
);

// ---[Message]------------------------------------------------------------------

/**
 * Event signature for the {@link message `message`} updater.
 */
type MessageEvent = Immer.ImmerUpdateEvent<
	Type.MESSAGE,
	Contact.Context["message"]
>;

/**
 * Updater for the {@link Message.Context.message `message`} context
 * property.
 */
export const message = Immer.createUpdater<Contact.Context, MessageEvent>(
	Type.MESSAGE,
	(ctx, { input }) => {
		ctx.message = input;
	},
);
