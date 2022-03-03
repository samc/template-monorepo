import * as Tina from "@tinacms/cli";

export const quote: Tina.TinaField = {
	label: "Quote",
	name: "quote",
	type: "string",
	ui: {
		component: "textarea",
	},
};
