module.exports = {
	extends: ["next", "prettier"],
	settings: {
		next: {
			rootDir: ["src/clients/*/", "src/libs/*/"],
		},
	},
	rules: {
		"@next/next/no-html-link-for-pages": "off",
	},
};
