import * as Immer from "@xstate/immer";

import { Header } from "./header.machine";

/**
 * Event type signatures.
 */
export enum Type {
	// ===[Default]===
	STATUS = "STATUS_UPDATE",
	DEBUG = "DEBUG_UPDATE",
	// ===[Custom]===
	// ...
}

export type Schema = StatusEvent | DebugEvent;

// ---[Status]-----------------------------------------------------------------

/**
 * Event signature for the {@link status `status`} updater.
 */
type StatusEvent = Immer.ImmerUpdateEvent<
	Type.STATUS,
	Header.Context["status"]
>;

/**
 * Updater for the {@link Header.Context.status `status`} context
 * property.
 */
export const status = Immer.createUpdater<Header.Context, StatusEvent>(
	Type.STATUS,
	(ctx, { input }) => {
		ctx.status = input;
	},
);

// ---[Debug]------------------------------------------------------------------

/**
 * Event signature for the {@link debug `debug`} updater.
 */
type DebugEvent = Immer.ImmerUpdateEvent<Type.DEBUG, Header.Context["debug"]>;

/**
 * Updater for the {@link Header.Context.debug `debug`} context
 * property.
 */
export const debug = Immer.createUpdater<Header.Context, DebugEvent>(
	Type.DEBUG,
	(ctx, { input }) => {
		ctx.debug = input;
	},
);
