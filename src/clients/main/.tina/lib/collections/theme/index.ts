import * as Tina from "@tinacms/cli";

import { colors } from "./_colors";
import { space } from "./_space";

export const theme: Tina.TinaCollection = {
	label: "Theme",
	name: "theme",
	path: ".tina/data/theme",
	format: "json",
	fields: [colors, space],
};
