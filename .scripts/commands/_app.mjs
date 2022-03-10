#!/usr/bin/env zx

import * as Commander from "commander";
import Conf from "conf";
import "zx/globals";

// ⌜                     ⌝
//   [[invoke.app]]
//
//   Available commands:
//   - run
// ⌞                     ⌟

/**
 * Run application level operations
 *
 * @param {Conf} config
 * @returns {Commander.Command}
 */
export function app(config) {
	const app = new Commander.Command("app").description(
		"Run application level operations",
	);

	// [[invoke.application.run]]
	app
		.command("run [commands...]")
		.option("-t, --type <type>", "the type of application")
		.option("-n, --name <name>", "the name of the application")
		.action((commands, options) => {
			const { type, name } = options;
			$`npm --workspace=@taygo/${type}.${name} ${commands}`;
		});

	return app;
}
