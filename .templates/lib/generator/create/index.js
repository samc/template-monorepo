// see types of prompts:
// https://github.com/enquirer/enquirer/tree/master/examples

const utils = require(`${process.cwd()}/.templates/utils`);

module.exports = {
	prompt: async ({ inquirer, args }) => {
		let { name } = args;

		name ??
			({ name } = await inquirer.prompt({
				name: "name",
				type: "input",
				message: "What should we name this generator?",
				required: true,
			}));

		return {
			...utils.names(name),
			...args,
		};
	},
};
