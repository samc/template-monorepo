import * as Tina from "@tinacms/cli";

import * as Fields from "../../fields";

import { defaultFeature } from "./_";

export const items: Tina.TinaField = {
	label: "Feature Items",
	name: "items",
	type: "object",
	list: true,
	ui: {
		defaultItem: {
			...defaultFeature,
		},
	},
	fields: [Fields.icon, Fields.title, Fields.text],
};
