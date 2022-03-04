import * as Theme from "@taygo/theme";

import ThemeJson from "@taygo/client.main/content/theme/index.json";

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
