import * as Tina from "@tinacms/cli";

import * as Fields from "../../fields";

export const authors: Tina.TinaCollection = {
	label: "Authors",
	name: "authors",
	path: ".tina/data/authors",
	fields: [Fields.avatar, Fields.name],
};
