import * as Tina from "@tinacms/cli";

import * as Collections from "./lib/collections";
import * as Fields from "./lib/fields";

const posts: Tina.TinaCollection = {
	label: "Blog Posts",
	name: "posts",
	path: ".tina/data/posts",
	format: "mdx",
	fields: [
		{
			type: "string",
			label: "Title",
			name: "title",
		},
		{
			type: "image",
			name: "heroImg",
			label: "Hero Image",
		},
		{
			type: "rich-text",
			label: "Excerpt",
			name: "excerpt",
		},
		{
			type: "reference",
			label: "Author",
			name: "author",
			collections: ["authors"],
		},
		{
			type: "datetime",
			label: "Posted Date",
			name: "date",
			ui: {
				dateFormat: "MMMM DD YYYY",
				timeFormat: "hh:mm A",
			},
		},
		{
			type: "rich-text",
			label: "Body",
			name: "_body",
			templates: [
				{
					name: "DateTime",
					label: "Date & Time",
					inline: true,
					fields: [
						{
							name: "format",
							label: "Format",
							type: "string",
							options: ["utc", "iso", "local"],
						},
					],
				},
				{
					name: "BlockQuote",
					label: "Block Quote",
					fields: [
						{
							name: "children",
							label: "Quote",
							type: "rich-text",
						},
						{
							name: "authorName",
							label: "Author",
							type: "string",
						},
					],
				},
				{
					name: "NewsletterSignup",
					label: "Newsletter Sign Up",
					fields: [
						{
							name: "children",
							label: "CTA",
							type: "rich-text",
						},
						{
							name: "placeholder",
							label: "Placeholder",
							type: "string",
						},
						{
							name: "buttonText",
							label: "Button Text",
							type: "string",
						},
						{
							name: "disclaimer",
							label: "Disclaimer",
							type: "rich-text",
						},
					],
					ui: {
						defaultItem: {
							placeholder: "Enter your email",
							buttonText: "Notify Me",
						},
					},
				},
			],
			isBody: true,
		},
	],
};

const global: Tina.TinaCollection = {
	label: "Global",
	name: "global",
	path: ".tina/data/global",
	format: "json",
	fields: [
		{
			type: "object",
			label: "Header",
			name: "header",
			fields: [
				Fields.icon,
				{
					type: "string",
					label: "Color",
					name: "color",
					options: [
						{ label: "Default", value: "default" },
						{ label: "Primary", value: "primary" },
					],
				},
				{
					type: "object",
					label: "Nav Links",
					name: "nav",
					list: true,
					ui: {
						defaultItem: {
							href: "home",
							label: "Home",
						},
					},
					fields: [
						{
							type: "string",
							label: "Link",
							name: "href",
						},
						{
							type: "string",
							label: "Label",
							name: "label",
						},
					],
				},
			],
		},
		{
			type: "object",
			label: "Footer",
			name: "footer",
			fields: [
				{
					type: "string",
					label: "Color",
					name: "color",
					options: [
						{ label: "Default", value: "default" },
						{ label: "Primary", value: "primary" },
					],
				},
				{
					type: "object",
					label: "Social Links",
					name: "social",
					fields: [
						{
							type: "string",
							label: "Facebook",
							name: "facebook",
						},
						{
							type: "string",
							label: "Twitter",
							name: "twitter",
						},
						{
							type: "string",
							label: "Instagram",
							name: "instagram",
						},
						{
							type: "string",
							label: "Github",
							name: "github",
						},
					],
				},
			],
		},
		{
			type: "object",
			label: "Theme",
			name: "theme",
			fields: [
				{
					type: "string",
					label: "Primary Color",
					name: "color",
					options: [
						{
							label: "Blue",
							value: "blue",
						},
						{
							label: "Teal",
							value: "teal",
						},
						{
							label: "Green",
							value: "green",
						},
						{
							label: "Red",
							value: "red",
						},
						{
							label: "Pink",
							value: "pink",
						},
						{
							label: "Purple",
							value: "purple",
						},
						{
							label: "Orange",
							value: "orange",
						},
						{
							label: "Yellow",
							value: "yellow",
						},
					],
				},
				{
					type: "string",
					name: "font",
					label: "Font Family",
					options: [
						{
							label: "System Sans",
							value: "sans",
						},
						{
							label: "Nunito",
							value: "nunito",
						},
						{
							label: "Lato",
							value: "lato",
						},
					],
				},
				{
					type: "string",
					name: "icon",
					label: "Icon Set",
					options: [
						{
							label: "Boxicons",
							value: "boxicon",
						},
						{
							label: "Heroicons",
							value: "heroicon",
						},
					],
				},
				{
					type: "string",
					name: "darkMode",
					label: "Dark Mode",
					options: [
						{
							label: "System",
							value: "system",
						},
						{
							label: "Light",
							value: "light",
						},
						{
							label: "Dark",
							value: "dark",
						},
					],
				},
			],
		},
	],
};

export default Tina.defineSchema({
	collections: [
		posts,
		global,
		Collections.theme,
		Collections.authors,
		Collections.pages,
	],
});
