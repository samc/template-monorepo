import * as Tina from "@tinacms/cli";

import { blocks } from "./_blocks";

export const pages: Tina.TinaCollection = {
	label: "Pages",
	name: "pages",
	path: ".tina/data/pages",
	fields: [blocks],
};
