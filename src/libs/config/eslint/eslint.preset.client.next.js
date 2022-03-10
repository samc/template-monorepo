module.exports = {
	extends: ["next", "prettier"],
	settings: {
		next: {
			rootDir: ["src/clients/*/", "src/libs/*/"],
		},
	},
	rules: {
		"@next/next/no-document-import-in-page": "off",
		"@next/next/no-html-link-for-pages": "off",
    "react-hooks/exhaustive-deps": "off",
		"react-hooks/rules-of-hooks": "off",
	},
};
