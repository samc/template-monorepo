const ejs = require("ejs");
const fs = require("fs");

const utils = require("./.templates/lib/client/utils");

const schema = require("./api/schema.json");

module.exports = {
	templates: "./.templates/lib",
	helpers: {
		...utils,
		models: Array.from(utils.models(schema.nested.taygo.nested)),
		render: (path, data) => {
			let template;
			template = fs.readFileSync(path, "utf8");
			template = template.replace(/^---\n(.*)\n---/g, "\n");

			const output = ejs.render(template, data);
			return output;
		},
	},
};
