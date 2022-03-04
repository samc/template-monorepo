#!/usr/bin/env zx

import * as Commander from "commander";
import Conf from "conf";
import "zx/globals";

// ⌜                     ⌝
//   [[eden.service]]
//
//   Available commands:
//   - run
// ⌞                     ⌟

/**
 * Run service level operations
 *
 * @param {Conf} config
 * @returns {Commander.Command}
 */
export function service(config) {
	const service = new Commander.Command("service").description(
		"Run service level operations",
	);

	// eden.service.run
	service
		.command("run [commands...]")
		.option("-s, --scope <service>", "service to run")
		.description("Runs a command at the service level")
		.action((commands, options) => {
			const { scope } = options;
			$`npx --workspace=@taygo/service.${scope} ${commands}`;
		});

	return service;
}
