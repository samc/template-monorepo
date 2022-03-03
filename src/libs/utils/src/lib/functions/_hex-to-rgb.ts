import * as TS from "@eden/utils/ts";

export function hexToRgb(hex: string): TS.Rgb | null {
	const sanitizedHex = hex.replaceAll("##", "#");
	const colorParts = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(
		sanitizedHex,
	);

	if (!colorParts) {
		return null;
	}

	const [, r, g, b] = colorParts;

	return {
		r: parseInt(r, 16),
		g: parseInt(g, 16),
		b: parseInt(b, 16),
	} as TS.Rgb;
}
