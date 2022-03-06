#!/usr/bin/env zx

import * as Commander from "commander";
import * as FS from "fs";
import * as Path from "path";
import Conf from "conf";
import "zx/globals";

import * as Utils from "../utils/index.mjs";

const DEFAULT_LINTER_DIRS = ["./", "./.github/.linters"];

// ⌜                     ⌝
//   [[invoke.generate]]
//
//   Available commands:
//   - env
//   - linters
// ⌞                     ⌟

/**
 * Run code generators.
 *
 * @param {Conf} config
 * @returns {Commander.Command}
 */
export function generate(config) {
	const generate = new Commander.Command("generate").description(
		"Run code generators",
	);

	// [[invoke.generate.config]]
	generate
		.command("config")
		.description("Generate root level configuration files")
		.action(async () => {
      // Generate a dotenv file that mimics the project configuration.
      await Utils.json2env(config.store, ".env")
    });

	// [[invoke.generate.linters]]
	generate
		.command("linters")
		.description(
			"Copy linter configuration files located in the root level `.linters` directory to the designated directories",
		)
		.option(
			"-d, --dir [dir...]",
			"Directories to output linters",
			DEFAULT_LINTER_DIRS,
		)
		.action(async (options) => {
			const { dir: dirs } = options;

			const configs = await FS.promises.readdir(".linters");

			for (const dir of dirs) {
				for (const config of configs) {
					await FS.promises.copyFile(
						Path.resolve(".linters", config),
						Path.resolve(dir, config),
					);
				}
			}
		});

	return generate;
}
