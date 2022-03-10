#!/usr/bin/env zx

import * as Commander from "commander";
import Conf from "conf";
import "zx/globals";

// ⌜                     ⌝
//   [[invoke.init]]
//
//   Available commands:
//   - git
// ⌞                     ⌟

/**
 * Bootstrap the project environment
 *
 * @param {Conf} config
 * @returns {Commander.Command}
 */
export function init(config) {
  const commands = ["git"];

	const init = new Commander.Command("init").description(
		"Bootstrap the project environment",
	).action(async () => {
    for (const command of commands) {
      await $`invoke init ${command}`;
    }
  });

	// [[invoke.init.git]]
	init
		.command("git")
		.description("Initialize all `git` scope modifications")
		.action(async () => {
			await $`git flow init`;
			await $`git config gitflow.path.hooks .husky`;
		});

	init.hook("postAction", () => {
		config.set({ init: true });
	});

	return init;
}
