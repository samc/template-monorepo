// see types of prompts:
// https://github.com/enquirer/enquirer/tree/master/examples

const path = require("path");

const utils = require(`../utils`);

const root = process.cwd();
const src = path.join(root, "src");

module.exports = {
	prompt: async ({ inquirer, args }) => {
		let { name } = args;

		name ??
			({ name } = await inquirer.prompt({
				name: "name",
				type: "input",
				message: "What's the name of the service?",
				initial: "default",
			}));

		return {
			...args,
			// ===[Overrides]===
			...utils.names(name),
			// ===[Paths]===
			root,
			src,
			//
		};
	},
};
