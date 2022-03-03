import * as Theme from "@eden/theme";

import ThemeJson from "@eden/client.main/content/theme/index.json";

export const defaultTheme = {
	space: ThemeJson.space,
	colors: {
		...Theme.generateColorTones(ThemeJson.colors),
		modes: {
			dark: {},
		},
	},
};

export type DefaultTheme = typeof defaultTheme;
