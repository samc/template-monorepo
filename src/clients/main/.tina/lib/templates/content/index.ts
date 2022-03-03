import * as Tina from "@tinacms/cli";

import * as Fields from "../../fields";
import { defaultContent } from "./_";

export const content: Tina.TinaTemplate = {
	name: "content",
	label: "Content",
	ui: {
		defaultItem: defaultContent,
	},
	fields: [Fields.body, Fields.color],
};
