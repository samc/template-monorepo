import * as Utils from "@eden/utils";

import * as TS from "@eden/theme/ts";

const defaultAlphaLevels = [
	TS.ThemeColorAlphaLevel._0,
	TS.ThemeColorAlphaLevel._5,
	TS.ThemeColorAlphaLevel._10,
	TS.ThemeColorAlphaLevel._20,
	TS.ThemeColorAlphaLevel._25,
	TS.ThemeColorAlphaLevel._30,
	TS.ThemeColorAlphaLevel._40,
	TS.ThemeColorAlphaLevel._50,
	TS.ThemeColorAlphaLevel._60,
	TS.ThemeColorAlphaLevel._70,
	TS.ThemeColorAlphaLevel._75,
	TS.ThemeColorAlphaLevel._80,
	TS.ThemeColorAlphaLevel._90,
	TS.ThemeColorAlphaLevel._95,
	TS.ThemeColorAlphaLevel._100,
];

function transform<
	TValue extends string,
	TLevel extends TS.ThemeColorAlphaLevel,
>(color: TValue, level: TLevel) {
	return `${color}${Math.round((level / 100) * 255).toString(16)}` as const;
}

export function generateHexAlphaLevels<
	TName extends string,
	TColor extends string,
>(
	colors: Record<TName, TColor>,
	levels = defaultAlphaLevels,
): HexAlphaColors<TName, TColor> {
	const alphas = Object.entries(colors).reduce<
		Record<TS.ThemeColorAlphaLevelAlias<TName>, TColor>
	>((acc, [name, color]) => {
		levels.forEach((level) => {
			const alias: TS.ThemeColorAlphaLevelAlias = `${name}-a${level}`;
			acc[alias] = Utils.isString(color)
				? transform(color, level)
				: generateHexAlphaLevels(color, levels);
		});
		return acc;
	}, {} as Record<TS.ThemeColorAlphaLevelAlias<TName>, TColor>);

	return { ...colors, ...alphas };
}

export type HexAlphaColors<
	TName extends string,
	TColor extends string,
> = Record<TName, TColor> &
	Record<
		| `${TName}-a0`
		| `${TName}-a5`
		| `${TName}-a10`
		| `${TName}-a20`
		| `${TName}-a25`
		| `${TName}-a30`
		| `${TName}-a40`
		| `${TName}-a50`
		| `${TName}-a60`
		| `${TName}-a70`
		| `${TName}-a75`
		| `${TName}-a80`
		| `${TName}-a90`
		| `${TName}-a95`
		| `${TName}-a100`,
		TColor
	>;
