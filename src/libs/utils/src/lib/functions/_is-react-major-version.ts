import { getReactMajorVersion } from "./_get-major-react-version";

/**
 * Given the version number MAJOR.MINOR.PATCH of the installed React library,
 * returns true if the MAJOR version integer is equal to the major version
 * provided
 */

export function isReactMajorVersion(expectedMajorVersion: number): boolean {
	const majorVersion = getReactMajorVersion();
	return Boolean(expectedMajorVersion === majorVersion);
}
