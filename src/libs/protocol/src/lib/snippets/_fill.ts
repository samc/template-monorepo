import * as Polished from "polished";

/**
 * Expand to fill the dimensions of the container.
 */
export function fill(): ReturnType<typeof Polished.size> {
	return Polished.size("100%", "100%");
}
