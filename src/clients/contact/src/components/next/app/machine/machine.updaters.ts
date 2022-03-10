import * as Immer from "@xstate/immer";

import { App } from "./machine";

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
type StatusEvent = Immer.ImmerUpdateEvent<Type.STATUS, App.Context["status"]>;

/**
 * Updater for the {@link App.Context.status `status`} context
 * property.
 */
export const status = Immer.createUpdater<App.Context, StatusEvent>(
	Type.STATUS,
	(ctx, { input }) => {
		ctx.status = input;
	},
);

// ---[Debug]------------------------------------------------------------------

/**
 * Event signature for the {@link debug `debug`} updater.
 */
type DebugEvent = Immer.ImmerUpdateEvent<Type.DEBUG, App.Context["debug"]>;

/**
 * Updater for the {@link App.Context.debug `debug`} context
 * property.
 */
export const debug = Immer.createUpdater<App.Context, DebugEvent>(
	Type.DEBUG,
	(ctx, { input }) => {
		ctx.debug = input;
	},
);
