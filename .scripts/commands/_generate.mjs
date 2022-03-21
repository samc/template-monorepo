#!/usr/bin/env zx

import * as Commander from "commander";
import * as FS from "fs";
import * as Path from "path";
import Conf from "conf";
import Enquirer from "enquirer";
import Inflection from "inflection";
import "zx/globals";

import * as Utils from "../utils/index.mjs";

const DEFAULT_LINTER_DIRS = ["./", "./.github/.linters"];

/*
 *   ⌜                     ⌝
 *     [[invoke.generate]]
 *
 *     Available commands:
 *      - config
 *      - linters
 *      - template
 *   ⌞                     ⌟
 */

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

	/*
	 *   ⌜                            ⌝
	 *     [[invoke.generate.config]]
	 *   ⌞                            ⌟
	 */ generate
		.command("config")
		.description("Generate root level configuration files")
		.action(async () => {
			// Generate a dotenv file that mimics the project configuration.
			await Utils.json2env(config.store, ".env");
		});

	/*
	 *   ⌜                             ⌝
	 *     [[invoke.generate.linters]]
	 *
	 *     Available options:
	 *      --dir
	 *   ⌞                             ⌟
	 */
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

	/*
	 *   ⌜                              ⌝
	 *     [[invoke.generate.template]]
	 *   ⌞                              ⌟
	 */
	generate
		.command("template")
		.description("Generate a new application or component")
		.allowUnknownOption(true)
		.option("-g, --generator [generator]", "Name of the  generator")
		.option("-a, --action [action]", "Action to perform for the generator")
		.option("-f, --force", "Force the generator to overwrite all files", false)
		.action(async (options, command) => {
			let { generator, action, force } = options;
			const { args } = command;

			const generators = await FS.promises.readdir(
				Path.resolve(".templates/lib"),
			);

			generator ||
				({ generator } = await Enquirer.prompt({
					type: "autocomplete",
					name: "generator",
					message: "What generator do you want to use?",
					choices: generators.map((generator) => ({
						name: Inflection.humanize(generator),
						value: generator,
					})),
				}));

			const actions = (
				await FS.promises.readdir(Path.resolve(".templates/lib", generator))
			).filter((entity) =>
				FS.lstatSync(
					Path.resolve(".templates/lib", generator, entity),
				).isDirectory(),
			);

			(action && actions.includes(action)) ||
				({ action } = await Enquirer.prompt({
					type: "autocomplete",
					name: "action",
					message: "What do action do you want to perform?",
					choices: actions.map((action) => ({
						name: Inflection.humanize(action),
						value: action,
					})),
				}));
			await nothrow($`HYGEN_OVERWRITE=${
				force ? 1 : 0
			} hygen ${generator} ${action} ${args}`);
		});

	return generate;
}
