const util = require("util");

const conf = require("conf");
const ejs = require("ejs");
const exec = util.promisify(require("child_process").exec);
const fs = require("fs");
const { run: shift } = require("jscodeshift/src/Runner");

module.exports = {
	templates: `${__dirname}/.templates/lib`,
	helpers: {
    call: async (...commands) => {
      try {
        for (const command of commands) {
          await exec(command);
        }
      } catch(err) {
        console.error(err);
      }
    },
		render: async (path, data) => {
			let template;
			template = await fs.promises.readFile(path, "utf8");
			template = template.replace(/^---\n(.*)\n---/g, "\n");

			const output = ejs.render(template, data);
			return output;
		},
		create: async (locals) => {
			const { data } = locals;

			new conf({
				cwd: data.targetdir,
				configName: `${data.fileName}.codemod`,
				defaults: {
					generator: {
						version: locals.data.config.version,
						additions: [],
					},
				},
			});

			return null;
		},
		add: async (locals) => {
			const { data } = locals;

      if (data.update) {
        return;
      }

			const config = new conf({
				cwd: data.targetdir,
				configName: `${data.fileName}.codemod`,
			});

			const additions = config.get("generator.additions", []);
			config.set("generator.additions", [
				...additions,
				...Object.values(data.additions).map((addition) => {
					const { name, type } = addition;
					return { name, type };
				}),
			]);

			return null;
		},
		transform: async (transformer, locals) => {
			const { attributes, data } = locals;

			if (shouldSkip(attributes)) {
				return;
			}

			await shift(transformer, [attributes.to], {
				verbose: 1,
				parser: "tsx",
				data,
			});

			return null;
		},
	},
};

function shouldSkip(attributes) {
	if (attributes.skip_if) {
		const contents = fs.readFileSync(attributes.to, "utf8");
		const match = contents.match(attributes.skip_if);
		return Boolean(match);
	}

	return false;
}
