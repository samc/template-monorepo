#!/usr/bin/env zx

import * as Commander from "commander";
import Conf from "conf";
import "zx/globals";

// ⌜              ⌝
//   [[eden.dev]]
// ⌞              ⌟

/**
 * Start all development workflows
 *
 * @param {Conf} config
 * @returns {Commander.Command}
 */
export function dev(config) {
	const dev = new Commander.Command("dev").description(
		"Start all development workflows",
	);

	dev.action(() => {
		$`npm run dev`;
	});

	return dev;
}
