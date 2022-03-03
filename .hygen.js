const ejs = require("ejs");
const fs = require("fs");

module.exports = {
	templates: `${__dirname}/.templates/lib`,
	helpers: {
		render: (path, data) => {
			let template;
			s;
			template = fs.readFileSync(path, "utf8");
			template = template.replace(/^---\n(.*)\n---/g, "\n");

			const output = ejs.render(template, data);
			return output;
		},
		replace: (path, regex, replacement, skip) => {
			let file;
			file = fs.readFileSync(path, "utf8");

			if (skip) {
				const match = file.match(skip);
				if (match?.groups?.target) {
					return null;
				}
			}

			file = file.replace(regex, replacement);

			fs.writeFileSync(path, file);
			return null;
		},
	},
};
