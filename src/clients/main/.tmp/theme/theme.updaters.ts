import * as Immer from "@xstate/immer";

import { Theme } from "./theme";

/**
 * Event type signatures.
 */
export enum Type {
	// ===[Default]===
	STATUS = "STATUS_UPDATE",
	DEBUG = "DEBUG_UPDATE",
	// ===[Custom]===
	CONFIG = "CONFIG_UPDATE",
}

export type Schema = StatusEvent;

// ---[Status]-----------------------------------------------------------------

/**
 * Event signature for the {@link status `status`} updater.
 */
type StatusEvent = Immer.ImmerUpdateEvent<Type.STATUS, Theme.Context["status"]>;

/**
 * Updater for the {@link Theme.Context.status `status`} context
 * property.
 */
export const status = Immer.createUpdater<Theme.Context, StatusEvent>(
	Type.STATUS,
	(ctx, { input }) => {
		ctx.status = input;
	},
);

// ---[Debug]------------------------------------------------------------------

/**
 * Event signature for the {@link debug `debug`} updater.
 */
type DebugEvent = Immer.ImmerUpdateEvent<Type.DEBUG, Theme.Context["debug"]>;

/**
 * Updater for the {@link Theme.Context.debug `debug`} context
 * property.
 */
export const debug = Immer.createUpdater<Theme.Context, DebugEvent>(
	Type.DEBUG,
	(ctx, { input }) => {
		ctx.debug = input;
	},
);

// ---[Config]-----------------------------------------------------------------

/**
 * Event signature for the {@link config `config`} updater.
 */
type ConfigEvent = Immer.ImmerUpdateEvent<Type.CONFIG, Theme.Context["config"]>;

/**
 * Updater for the {@link Theme.Context.config `config`} context
 * property.
 */
export const config = Immer.createUpdater<Theme.Context, ConfigEvent>(
	Type.CONFIG,
	(ctx, { input }) => {
		ctx.config = input;
	},
);
