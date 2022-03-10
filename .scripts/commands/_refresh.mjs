#!/usr/bin/env zx

import * as Commander from "commander";
import Conf from "conf";
import "zx/globals";

import * as Utils from "../utils/index.mjs";

// ⌜                   ⌝
//   [[invoke.refresh]]
// ⌞                   ⌟

/**
 * Refresh the local development environment.
 *
 * @param {Conf} config - Project configuration.
 * @returns {Commander.Command}
 */
export function refresh(config) {
	const refresh = new Commander.Command("refresh").description(
		"Refresh the local development environment",
	);

	refresh.action((options) => {
		if (Utils.fingerprint("package.json")) $`invoke update project --node`;
		if (Utils.fingerprint("tools.go")) $`invoke update project --go`;
		if (Utils.fingerprint(".config")) $`invoke generate config`;
		if (Utils.fingerprint(".linters")) $`invoke generate linters`;
	});

	return refresh;
}
