import * as Immer from "@xstate/immer";

import { Global } from "./global.machine";

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
	Global.Context["status"]
>;

/**
 * Updater for the {@link Global.Context.status `status`} context
 * property.
 */
export const status = Immer.createUpdater<Global.Context, StatusEvent>(
	Type.STATUS,
	(ctx, { input }) => {
		ctx.status = input;
	},
);

// ---[Debug]------------------------------------------------------------------

/**
 * Event signature for the {@link debug `debug`} updater.
 */
type DebugEvent = Immer.ImmerUpdateEvent<Type.DEBUG, Global.Context["debug"]>;

/**
 * Updater for the {@link Global.Context.debug `debug`} context
 * property.
 */
export const debug = Immer.createUpdater<Global.Context, DebugEvent>(
	Type.DEBUG,
	(ctx, { input }) => {
		ctx.debug = input;
	},
);
