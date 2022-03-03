import * as Tina from "@commitlint/cli";

export const color: Tina.TinaField = {
	label: "Color",
	name: "color",
	type: "string",
	options: [
		{ label: "Default", value: "default" },
		{ label: "Tint", value: "tint" },
		{ label: "Primary", value: "primary" },
	],
