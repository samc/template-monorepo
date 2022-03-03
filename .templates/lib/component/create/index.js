// see types of prompts:
// https://github.com/enquirer/enquirer/tree/master/examples

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
		let { name, type, project, variant } = args;
		let root, src, target;
		let options;

		name ??
			({ name } = await inquirer.prompt({
				name: "name",
				type: "input",
				message: "What should we name this Component?",
				initial: "default",
			}));

		type ??
			({ type } = await inquirer.prompt({
				name: "type",
				type: "autocomplete",
				message: "What type of project will the Component belong to?",
				choices: [
					{ name: "client", value: "client" },
					{ name: "library", value: "lib" },
				],
			}));

		variant ??
			({ variant } = await inquirer.prompt({
				name: "variant",
				type: "autocomplete",
				message: "What type of Component do you want to generate?",
				choices: components,
			}));
		({ options } = common.components.variants[variant]);

		if (!!!project) {
			switch (type) {
				case "client":
					({ project } = await inquirer.prompt({
						name: "project",
						type: "autocomplete",
						message: "What Client should we generate the Component for?",
						choices: clients,
					}));
					({ target } = config.client);
					break;
				case "lib":
					({ project } = await inquirer.prompt({
						name: "project",
						type: "autocomplete",
						message: "What Library should we generate the Component for?",
						choices: libraries,
					}));
					({ target } = config.library);
					break;
			}
		}
		root = path.join(process.cwd(), "src", `${type}s`, project);
		src = path.join(root, "src");
		target = path.join(src, target, `${variant}s`);

		return {
			// ===[Overrides]===
			...utils.names(name),
			project: utils.names(project),
			type: utils.names(type),
			variant: utils.names(variant),
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
