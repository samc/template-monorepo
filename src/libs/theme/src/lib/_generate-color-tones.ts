import * as Utils from "@taygo/utils";

import * as TS from "@taygo/theme/ts";

const intensityMap = {
	[TS.ThemeColorToneLevel._50]: 0.95,
	[TS.ThemeColorToneLevel._100]: 0.9,
	[TS.ThemeColorToneLevel._200]: 0.75,
	[TS.ThemeColorToneLevel._300]: 0.6,
	[TS.ThemeColorToneLevel._400]: 0.3,
	[TS.ThemeColorToneLevel._600]: 0.9,
	[TS.ThemeColorToneLevel._700]: 0.75,
	[TS.ThemeColorToneLevel._800]: 0.6,
	[TS.ThemeColorToneLevel._900]: 0.49,
};

export function generateColorTone<TName extends string>(
	name: TName,
	color: string,
): ColorToneDictionary<TName> {
	const tones = {} as ColorToneDictionary<TName>;

	(
		[
			TS.ThemeColorToneLevel._50,
			TS.ThemeColorToneLevel._100,
			TS.ThemeColorToneLevel._200,
			TS.ThemeColorToneLevel._300,
			TS.ThemeColorToneLevel._400,
		] as const
	).forEach((level) => {
		const alias: TS.ThemeColorToneLevelAlias<
			TName,
			typeof level
		> = `${name}-${level}`;
		tones[alias] = Utils.lighten(color, intensityMap[level]);
	});

	(
		[
			TS.ThemeColorToneLevel._600,
			TS.ThemeColorToneLevel._700,
			TS.ThemeColorToneLevel._800,
			TS.ThemeColorToneLevel._900,
		] as const
	).forEach((level) => {
		const alias: TS.ThemeColorToneLevelAlias<
			TName,
			typeof level
		> = `${name}-${level}`;
		tones[alias] = Utils.darken(color, intensityMap[level]);
	});

	tones[`${name}-${TS.ThemeColorToneLevel._500}`] = `#${color}`.replace(
		"##",
		"#",
	);
	return tones;
}

export type ColorToneDictionary<TName extends string> = Record<
	TS.ThemeColorToneLevelAlias<TName, TS.ThemeColorToneLevel>,
	string
>;

export function generateColorTones<TNames extends string>(
	colors: Record<TNames, string>,
): Record<TNames, string> & ColorToneDictionary<TNames> {
	const tones = Object.entries(colors).reduce((acc, entry) => {
		const [name, color] = entry;
		acc = {
			...acc,
			...generateColorTone(name, color),
		};
		return acc;
	}, {} as ColorToneDictionary<TNames>);

	return { ...colors, ...tones };
}
