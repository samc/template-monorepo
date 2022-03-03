import * as Polished from "polished";

/**
 * Sets both `height` and `width` to the provided length.
 */
export function square(length: string | number) {
	return Polished.size(length, length);
}
