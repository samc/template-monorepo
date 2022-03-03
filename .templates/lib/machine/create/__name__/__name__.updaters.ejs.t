---
to: "<%= type.name === 'client' ? `${dir}/${fileName}.updaters.ts` : type.name === 'lib' ? `${dir}/${fileName}.updaters.ts` : null %>"
---
import * as Immer from "@xstate/immer";

import { <%= className %> } from "./<%= fileName %>";

/**
 * Event type signatures.
 */
export enum Type {
	// ===[Default]===
	STATUS = "STATUS_UPDATE",
	DEBUG = "DEBUG_UPDATE"
	// ===[Custom]===
	// ...
}

export type Schema = StatusEvent | DebugEvent;

// ---[Status]-----------------------------------------------------------------

/**
 * Event signature for the {@link status `status`} updater.
 */
type StatusEvent = Immer.ImmerUpdateEvent<Type.STATUS, <%= className %>.Context["status"]>;

/**
 * Updater for the {@link <%= className %>.Context.status `status`} context
 * property.
 */
export const status = Immer.createUpdater<<%= className %>.Context, StatusEvent>(
	Type.STATUS,
	(ctx, { input }) => {
		ctx.status = input;
	},
);

// ---[Debug]------------------------------------------------------------------

/**
 * Event signature for the {@link debug `debug`} updater.
 */
type DebugEvent = Immer.ImmerUpdateEvent<Type.DEBUG, <%= className %>.Context["debug"]>;

/**
 * Updater for the {@link <%= className %>.Context.debug `debug`} context
 * property.
 */
export const debug = Immer.createUpdater<<%= className %>.Context, DebugEvent>(
	Type.DEBUG,
	(ctx, { input }) => {
		ctx.debug = input;
	},
);
