import * as Tina from "@tinacms/cli";

import * as Fields from "../../fields";

import { defaultTestimonial } from "./_";

export const testimonial: Tina.TinaTemplate = {
	name: "testimonial",
	label: "Testimonial",
	ui: {
		defaultItem: defaultTestimonial,
	},
	fields: [Fields.quote, Fields.author, Fields.color],
};
