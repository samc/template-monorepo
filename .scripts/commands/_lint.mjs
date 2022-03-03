#!/usr/bin/env zx

import * as Commander from "commander";
import Conf from "conf";
import "zx/globals";

// ⌜                        ⌝
//   [[eden.lint]]
//
//   Available options:
//   - --all
//   - --fix
//   - --filter [linters...]
// ⌞                        ⌟

/**
 * Run the universal code checker
 *
 * @param {Conf} config
 * @returns {Commander.Command}
 */
export function lint(config) {
	const lint = new Commander.Command("lint").description(
		"Run the universal code checker",
	);

	lint
		.option("-a, --all", "check all files instead of only changed files", false)
		.option(
			"-f, --fix",
			"automatically apply all fixes without prompting",
			false,
		)
		.option(
			"--filter [linters...]",
			"run specific linters (comma-separated, remove using leading -, e.g. --filter -eslint)",
		);

	lint.action((options) => {
		const { all, fix, filter } = options;
		const flags = [`--all=${all}`, `--fix=${fix}`];
		if (filter) {
			flags.push(`--filter=${options.filters.join(",")}`);
		}
		$`trunk check ${flags}`;
	});

	return lint;
}
