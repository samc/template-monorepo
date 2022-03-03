import * as Tina from "@commitlint/cli";

import * as Templates from "../../templates";

const hero: Tina.TinaTemplate = {
	name: "hero",
	label: "Hero",
	ui: {
		defaultItem: {
			tagline: "Here's some text above the other text",
			headline: "This Big Text is Totally Awesome",
			text: "Phasellus scelerisque, libero eu finibus rutrum, risus risus accumsan libero, nec molestie urna dui a leo.",
		},
	},
	fields: [
		{
			type: "string",
			label: "Tagline",
			name: "tagline",
		},
		{
			type: "string",
			label: "Headline",
			name: "headline",
		},
		{
			label: "Text",
			name: "text",
			type: "rich-text",
		},
		{
			label: "Actions",
			name: "actions",
			type: "object",
			list: true,
			ui: {
				defaultItem: {
					label: "Action Label",
					type: "button",
					icon: true,
					link: "/",
				},
			},
			fields: [
				{
					label: "Label",
					name: "label",
					type: "string",
				},
				{
					label: "Type",
					name: "type",
					type: "string",
					options: [
						{ label: "Button", value: "button" },
						{ label: "Link", value: "link" },
					],
				},
				{
					label: "Icon",
					name: "icon",
					type: "boolean",
				},
				{
					label: "Link",
					name: "link",
					type: "string",
				},
			],
		},
		{
			type: "object",
			label: "Image",
			name: "image",
			fields: [
				{
					name: "src",
					label: "Image Source",
					type: "image",
				},
				{
					name: "alt",
					label: "Alt Text",
					type: "string",
				},
			],
		},
		{
			type: "string",
			label: "Color",
			name: "color",
			options: [
				{ label: "Default", value: "default" },
				{ label: "Tint", value: "tint" },
				{ label: "Primary", value: "primary" },
			],
		},
	],
};

export const blocks: Tina.TinaField = {
	type: "object",
	list: true,
	name: "blocks",
	label: "Sections",
	templates: [
		hero,
		Templates.feature,
		Templates.content,
		Templates.testimonial,
	],
};
