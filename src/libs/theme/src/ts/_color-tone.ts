export enum ThemeColorToneLevel {
	_50 = "50",
	_100 = "100",
	_200 = "200",
	_300 = "300",
	_400 = "400",
	_500 = "500",
	_600 = "600",
	_700 = "700",
	_800 = "800",
	_900 = "900",
}

export type ThemeColorToneLevelAlias<
	TName extends string,
	TToneLevel extends ThemeColorToneLevel,
> = `${TName}-${TToneLevel}`;
