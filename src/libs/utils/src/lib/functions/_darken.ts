import { hexToRgb } from "./_hex-to-rgb";
import { rgbToHex } from "./_rgb-to-hex";

export function darken(hex: string, intensity: number): string {
	const color = hexToRgb(hex);

	if (!color) {
		return "";
	}

	const r = Math.round(color.r * intensity);
	const g = Math.round(color.g * intensity);
	const b = Math.round(color.b * intensity);

	return rgbToHex(r, g, b);
}
