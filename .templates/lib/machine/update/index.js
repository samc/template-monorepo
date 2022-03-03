// see types of prompts:
// https://github.com/enquirer/enquirer/tree/master/examples

const fs = require("fs");
const inflection = require("inflection");
const path = require("path");

const common = require(`${process.cwd()}/.templates/common`);
const utils = require(`${process.cwd()}/.templates/utils`);

const workspace = require(`${process.cwd()}/workspace.json`);
const config = require("./config.json");

const projects = Object.keys(workspace.projects);
const components = Object.keys(common.components.variants);

const libraries = projects
	.filter((project) => project.includes("lib"))
	.map((project) => project.replace("lib.", ""));

const clients = projects
	.filter((project) => project.includes("client"))
	.map((project) => project.replace("client.", ""));

module.exports = {
	prompt: async ({ inquirer, args }) => {
		let { type, project, component, machine, additions } = args;
		let root, src, target;
		let name, updater;

		if (machine && component) {
			throw new Error(
				"You can't specify both machine and component arguments.",
			);
		}

		type ??
			({ type } = await inquirer.prompt({
				name: "type",
				type: "autocomplete",
				message: "What type of project does the machine belong to?",
				required: true,
				choices: [
					{ name: "client", value: "client" },
					{ name: "library", value: "lib" },
				],
			}));

		if (!!!project) {
			switch (type) {
				case "client":
					({ project } = await inquirer.prompt({
						name: "project",
						type: "autocomplete",
						message: "What Client does the machine belong to?",
						required: true,
						choices: clients,
					}));
					({ target } = config.client);
					break;
				case "lib":
					({ project } = await inquirer.prompt({
						name: "project",
						type: "autocomplete",
						message: "What Library does the machine belong to?",
						required: true,
						choices: libraries,
					}));
					({ target } = config.lib);
					break;
			}
		}
		root = path.join(process.cwd(), "src", `${type}s`, project);
		src = path.join(root, "src");
		target = path.join(src, target);

		if (!!!machine && !!!component) {
			({ component } = await inquirer.prompt({
				name: "component",
				type: "toggle",
				message: "Does the machine belong to a component?",
				enabled: "Yes",
				disabled: "No",
			}));
			target = target.replace("machines", "components");

			({ component } = await inquirer.prompt({
				name: "component",
				type: "autocomplete",
				message: "What type of Component does the machine belong to?",
				required: true,
				choices: components,
			}));
			console.log(component);
			target = path.join(target, `${component}s`);

			({ component } = await inquirer.prompt({
				name: "component",
				type: "autocomplete",
				message: `What ${inflection.capitalize(
					component,
				)} does the Machine belong to?`,
				required: true,
				choices: fs
					.readdirSync(target)
					.filter((file) => !!!file.endsWith(".ts")),
			}));
			target = path.join(target, component, "machine");
			name = "machine";
		}

		if (!!!machine && !!!component) {
			({ machine } = await inquirer.prompt({
				name: "machine",
				type: "autocomplete",
				message: "What's the name of the existing machine?",
				required: true,
				choices: fs
					.readdirSync(target)
					.filter((file) => !!!file.endsWith(".ts")),
			}));
			target = path.join(target, machine);
			name = machine;
		}

		additions ??
			({ additions } = await inquirer.prompt({
				name: "additions",
				type: "multiselect",
				message: "What additions should we make?",
				required: true,
				choices: [{ name: "updater", message: "Add an updater" }],
				indicator: "⊡",
			}));

		if (additions.includes("updater")) {
			({ updater } = await inquirer.prompt({
				name: "updater",
				type: "input",
				required: true,
				message: "What name should we gives this updater?",
			}));
		}

		return {
			// ===[Overrides]===
			type: utils.names(type),
			project: utils.names(project),
			...(component && { component: utils.names(component) }),
			...(machine && { machine: utils.names(machine) }),
			// ===[Paths]===
			root,
			src,
			target,
			// ===[Dynamic]===
			...utils.names(name),
			...(updater && { updater: utils.names(updater) }),
			//
			...args,
		};
	},
};
