import * as Tina from "@commitlint/cli";

export const text: Tina.TinaField = {
	label: "Text",
	name: "text",
	type: "string",
	ui: {
		component: "textarea",
	},
};
