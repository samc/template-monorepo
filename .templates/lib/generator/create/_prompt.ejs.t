---
to: .templates/lib/new/<%= fileName %>/prompt.js
---
// see types of prompts:
// https://github.com/enquirer/enquirer/tree/master/examples

const path = require("path");
const util = require(`${process.cwd()}/.templates/util`);

const workspace = require(`${process.cwd()}/workspace.json`);
const config = require("./config.json");

const projects = Object.keys(workspace.projects);

const libraries = projects
	.filter((project) => project.includes("lib"))
	.map((project) => project.replace("lib.", ""));

const clients = projects
	.filter((project) => project.includes("client"))
	.map((project) => project.replace("client.", ""));

module.exports = {
	prompt: async ({ inquirer, args }) => {
		let { name, project, type } = args;
		let root, src, target;

		name ??
			({ name } = await inquirer.prompt({
				name: "name",
				type: "input",
				message: "What should we name this <%= h.inflection.humanize(name) %>?",
				initial: "default",
			}));

		type ??
			({ type } = await inquirer.prompt({
				name: "type",
				type: "autocomplete",
				message: "What type of project will the <%= h.inflection.humanize(name) %> belong to?",
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
						message: "What Client should we generate the <%= h.inflection.humanize(name) %> for?",
						choices: clients,
					}));
					({ target } = config.client);
					break;
				case "lib":
					({ project } = await inquirer.prompt({
						name: "project",
						type: "autocomplete",
						message: "What Library should we generate the <%= h.inflection.humanize(name) %> for?",
						choices: libraries,
					}));
					({ target } = config.library);
					break;
			}
		}
		root = path.join(process.cwd(), "src", `${type}s`, project);
		src = path.join(root, "src");
		target = path.join(src, target);

		return {
			// ===[Overrides]===
			...utils.names(name),
			project: utils.names(project),
			type: utils.names(type),
			// ===[Paths]===
			root,
			src,
			target,
			// ===[Dynamic]===
			options,
			//
			...args,
		};
	},
};
