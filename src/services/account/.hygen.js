const ejs = require("ejs");
const fs = require("fs");

const utils = require("./.templates/lib/service/utils");

const schema = require("./api/schema.json");

console.log(Array.from(utils.models(schema.nested.eden.nested)));

module.exports = {
	templates: "./.templates/lib",
	helpers: {
		...utils,
		entity: schema.nested.eden.nested.account.nested["Account"],
		service: schema.nested.eden.nested.account.nested["AccountService"],
		schema: schema.nested.eden.nested,
		models: Array.from(utils.models(schema.nested.eden.nested)),
		render: (path, data) => {
			let template;
			template = fs.readFileSync(path, "utf8");
			template = template.replace(/^---\n(.*)\n---/g, "\n");

			const output = ejs.render(template, data);
			return output;
		},
	},
};
