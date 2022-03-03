#!/usr/bin/env zx

import * as Commander from "commander";
import Conf from "conf";
import "zx/globals";

// ⌜                   ⌝
//   [[eden.clean]]
//
//   Available options:
//   - --all
// ⌞                   ⌟

/**
 * Remove build artifacts, downloaded dependencies, and generated files
 *
 * @param {Conf} config
 * @returns {Commander.Command}
 */
export function clean(config) {
	const clean = new Commander.Command("clean").description(
		"Remove build artifacts, downloaded dependencies, and generated files",
	);

	clean.option(
		"-a",
		"--all",
		"initiate clean operation for all workspace entities",
		false,
	);

	clean.action((options) => {
		$`git clean -Xdf`;
		$`rm -rf ./.github/linters/*`;
		if (options.all) $`npm run clean`;
	});

	return clean;
}
