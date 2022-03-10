#!/usr/bin/env zx

import * as Commander from "commander";
import Conf from "conf";
import "zx/globals";

// ⌜                 ⌝
//   [[invoke.tools]]
// ⌞                 ⌟

/**
 * Open recommended documentation / applications for use during development of the project.
 *
 * @param {Conf} config
 * @returns {Commander.Command}
 */
export function tools(config) {
	const tools = new Commander.Command("tools").description(
		"Open recommended documentation / applications for use during development of the project",
	);

	tools.action(() => {
		$`autohotkey.exe ./.ahk/tools.ahk`;
	});

	return tools;
}
