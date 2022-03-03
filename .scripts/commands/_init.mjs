#!/usr/bin/env zx

import * as Commander from "commander";
import Conf from "conf";
import "zx/globals";

// ⌜                     ⌝
//   [[eden.init]]
//
//   Available commands:
//   - git
//   - tree
// ⌞                     ⌟

/**
 * Bootstrap the project environment
 *
 * @param {Conf} config
 * @returns {Commander.Command}
 */
export function init(config) {
	const init = new Commander.Command("init").description(
		"Bootstrap the project environment",
	);

	// eden.init.git
	init
		.command("git")
		.description("Initialize all `git` scope modifications")
		.action(() => {
			$`git flow init`;
			$`git config gitflow.path.hooks .husky`;
		});

	// eden.init.tree
	init.command("coffee").action(() => {
		console.log("brew coffee");
	});

	init.hook("postAction", () => {
		config.set({ init: true });
	});

	return init;
}
