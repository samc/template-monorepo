import * as Tina from "@tinacms/cli";

export const space: Tina.TinaField = {
	label: "Space",
	name: "space",
	type: "object",
	description:
		"Affects the following CSS properties: `margin`, margin-top, margin-right, margin-bottom, margin-left, padding, padding-top, padding-right, padding-bottom, padding-left, grid-gap, grid-column-gap, grid-row-gap",
	fields: [
		{
			type: "object",
			label: "Object",
			name: "object",
			ui: {
				component: "typed-group",
				fields: [
					{
						component: "text",
						name: "typed-text",
					},
				],
			},
			fields: [
				{
					label: "None (_)",
					name: "_",
					type: "number",
					required: true,
				},
				{
					label: "Extra Small (xs)",
					name: "xs",
					type: "number",
					required: true,
				},
				{
					label: "Small (s)",
					name: "s",
					type: "number",
					required: true,
				},
			],
		},
		{
			label: "None (_)",
			name: "_",
			type: "number",
			required: true,
		},
		{
			label: "Extra Small (xs)",
			name: "xs",
			type: "number",
			required: true,
		},
		{
			label: "Small (s)",
			name: "s",
			type: "number",
			required: true,
		},
		{
			label: "Medium (m)",
			name: "m",
			type: "number",
			required: true,
		},
		{
			label: "Large (l)",
			name: "l",
			type: "number",
			required: true,
		},
		{
			label: "Extra Large (xl)",
			name: "xl",
			type: "number",
			required: true,
		},
		{
			label: "Double XL (xxl)",
			name: "xxl",
			type: "number",
			required: true,
		},
		{
			label: "Triple XL (xxxl)",
			name: "xxxl",
			type: "number",
			required: true,
		},
	],
};
