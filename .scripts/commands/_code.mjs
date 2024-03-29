#!/usr/bin/env zx

import * as Commander from "commander";
import Conf from "conf";
import "zx/globals";

// ⌜                ⌝
//   [[invoke.code]]
// ⌞                ⌟

/**
 * Launch the Visual Studio Code workspace
 *
 * @param {Conf} config
 * @returns {Commander.Command}
 */
export function code(config) {
	const code = new Commander.Command("code").description(
		"Launch the Visual Studio Code workspace",
	);

	code.action(() => {
		$`code .vscode/mono.code-workspace`;
	});

	return code;
}
