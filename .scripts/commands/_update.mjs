#!/usr/bin/env zx

import * as Commander from "commander";
import * as FS from "fs";
import * as Path from "path";
import Conf from "conf";
import Enquirer from "enquirer";
import "zx/globals";

// ⌜                     ⌝
//   [[invoke.update]]
//
//   Available commands:
//   - project
//   - app
// ⌞                     ⌟

/**
 * Update project & application level dependencies.
 *
 * @param {Conf} config
 * @returns {Commander.Command}
 */
export function update(config) {
	const update = new Commander.Command("update")
		.description("Run code generators")
		.action(async () => {
			const { commands } = await Enquirer.prompt({
				type: "multiselect",
				name: "commands",
				message: "What updaters would you like to run?",
				choices: [
					{ name: "Project", value: "project" },
					{ name: "App", value: "app" },
				],
        result(names) {
          return Object.values(this.map(names));
        },
				indicator: "⊡",
			});

			for (const command of commands) {
				await $`invoke update ${command}`;
			}
		});

	// [[invoke.update.project]]
	update
		.command("project")
		.description("Update root level project dependencies")
		.option("--proto", "Update protobuf references", false)
		.option("--go", "Update go dependencies", false)
		.option("--node", "Update node dependencies", false)
		.option("-a, --all", "Update all dependencies", false)
		.action(async (options) => {
			const { proto, go, node, all } = options;
			if (all || proto) await updateProjectProto();
			if (all || node) await updateProjectNode();
			if (all || go) await updateProjectGo();
		});

	async function updateProjectProto() {
		return await $`npm run update:proto`;
	}

	async function updateProjectNode() {
		return await $`npm run update:project`;
	}

	async function updateProjectGo() {
		const content = await FS.promises.readFile("tools.go", "utf8");
		const deps = content.matchAll(
			/^\s+_\s\"(?<url>.*)\"\s+\/\/(?<version>.*)$/gm,
		);

		for (const dep of deps) {
			const { url, version } = dep.groups;
			await $`go install ${url}@${version}`;
		}
	}

	// [[invoke.update.app]]
	update
		.command("app")
		.description("Update application level dependencies")
		.argument("[domains...]", "Application domains to update")
		.option("-a, --all", "Update all application domains", false)
		.action(async (domains, options) => {
			const { all } = options;

			if (all) {
				return await $`npm run update`;
			}

			domains.length ||
				({ domains } = await Enquirer.prompt({
					type: "multiselect",
					name: "domains",
					message: "What updaters would you like to run?",
					choices: [
						{ name: "Clients", value: "clients" },
						{ name: "Libs", value: "libs" },
						{ name: "Proto", value: "proto" },
						{ name: "Functions", value: "functions" },
						{ name: "Template", value: "template" },
					],
					result(names) {
						return Object.values(this.map(names));
					},
					indicator: "⊡",
				}));

			for (const domain of domains) {
				await $`npm run update:${domain}`;
			}
		});

	return update;
}
