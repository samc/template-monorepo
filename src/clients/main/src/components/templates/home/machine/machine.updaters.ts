import * as Immer from "@xstate/immer";

import { Home } from "./machine";

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
type StatusEvent = Immer.ImmerUpdateEvent<Type.STATUS, Home.Context["status"]>;

/**
 * Updater for the {@link Home.Context.status `status`} context
 * property.
 */
export const status = Immer.createUpdater<Home.Context, StatusEvent>(
	Type.STATUS,
	(ctx, { input }) => {
		ctx.status = input;
	},
);

// ---[Debug]------------------------------------------------------------------

/**
 * Event signature for the {@link debug `debug`} updater.
 */
type DebugEvent = Immer.ImmerUpdateEvent<Type.DEBUG, Home.Context["debug"]>;

/**
 * Updater for the {@link Home.Context.debug `debug`} context
 * property.
 */
export const debug = Immer.createUpdater<Home.Context, DebugEvent>(
	Type.DEBUG,
	(ctx, { input }) => {
		ctx.debug = input;
	},
);
