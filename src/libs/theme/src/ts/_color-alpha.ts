export enum ThemeColorAlphaLevel {
	_0 = 0,
	_5 = 5,
	_10 = 10,
	_20 = 20,
	_25 = 25,
	_30 = 30,
	_40 = 40,
	_50 = 50,
	_60 = 60,
	_70 = 70,
	_75 = 75,
	_80 = 80,
	_90 = 90,
	_95 = 95,
	_100 = 100,
}

export type ThemeColorAlphaLevelAlias<T extends string | number = string> =
	`${T}-a${ThemeColorAlphaLevel}`;
