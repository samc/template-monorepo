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
//   - workspace
//   - entity
// ⌞                     ⌟

/**
 * Update workspace & entity level dependencies.
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
					{ name: "workspace", message: "Workspace" },
					{ name: "entity", message: "Entity" },
				],
				indicator: "⊡",
			});

			for (const command of commands) {
				await $`invoke update ${command}`;
			}
		});

	// [[invoke.update.workspace]]
	update
		.command("workspace")
		.description("Update root level workspace dependencies")
		.option("--go", "Update go dependencies", false)
		.option("--node", "Update node dependencies", false)
		.option("-a, --all", "Update all dependencies", false)
		.action(async (options) => {
			const { go, node, all } = options;
			if (all || node) await updateWorkspaceNode();
			if (all || go) await updateWorkspaceGo();
		});

	async function updateWorkspaceNode() {
		return await $`npm run update:workspace:node`;
	}

	async function updateWorkspaceGo() {
		const content = await FS.promises.readFile("tools.go", "utf8");
		const deps = content.matchAll(
			/^\s+_\s\"(?<url>.*)\"\s+\/\/(?<version>.*)$/gm,
		);

		for (const dep of deps) {
			const { url, version } = dep.groups;
			await $`go install ${url}@${version}`;
		}
	}

	// [[invoke.update.entity]]
	update
		.command("entity")
		.description("Update entity level dependencies")
		.argument("[entities...]", "Entities to update")
		.option("-a, --all", "Update all entities", false)
		.action(async (entities, options) => {
			const { all } = options;

			if (all) {
				return await $`npm run update`;
			}

			entities.length ||
				({ entities } = await Enquirer.prompt({
					type: "multiselect",
					name: "entities",
					message: "What updaters would you like to run?",
					choices: [
						{ name: "clients", message: "Clients" },
						{ name: "libs", message: "Libs" },
						{ name: "proto", message: "Proto" },
						{ name: "functions", message: "Functions" },
						{ name: "template", message: "Template" },
					],
					indicator: "⊡",
				}));

			for (const entity of entities) {
				await $`npm run update:${entity}`;
			}
		});

	return update;
}
