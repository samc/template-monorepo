import * as Tina from "@tinacms/cli";

import * as Fields from "../../fields";

import { defaultFeature } from "./_";
import { items } from "./_items";

export const feature: Tina.TinaTemplate = {
	name: "features",
	label: "Features",
	ui: {
		defaultItem: {
			items: [defaultFeature, defaultFeature, defaultFeature],
		},
	},
	fields: [items, Fields.color],
};
