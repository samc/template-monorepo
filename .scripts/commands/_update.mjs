#!/usr/bin/env zx

import * as Commander from "commander";
import * as FS from "fs";
import * as Path from "path";
import Conf from "conf";
import Enquirer from "enquirer";
import "zx/globals";

import * as Utils from "../utils/index.mjs";

const COMMANDS = ["project", "applications"];

// ⌜                     ⌝
//   [[invoke.update]]
//
//   Available commands:
//   - project
//   - applications
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
				choices: COMMANDS.map((command) => ({ name: command, value: command })),
				indicator: "⊡",
			});

			for (const command of commands) {
				await $`invoke update ${command} --all`;
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

	return update;
}
