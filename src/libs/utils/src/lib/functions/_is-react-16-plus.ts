import { getReactMajorVersion } from "./_get-major-react-version";

/**
 * Given the version number MAJOR.MINOR.PATCH of the installed React library,
 * returns true if the MAJOR version integer is greater than or equal
 * to version `16`.
 */
export function isReact16Plus(): boolean {
	const majorVerison = getReactMajorVersion();
	return Boolean(majorVerison >= 16);
}
