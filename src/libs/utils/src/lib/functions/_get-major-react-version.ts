import * as React from "react";

/**
 * Given the version number MAJOR.MINOR.PATCH of the installed React library,
 * returns the MAJOR version integer.
 */
export function getReactMajorVersion(): number {
	const majorVersionString = React.version.slice(0, React.version.indexOf("."));
	const majorVersionNumber = Number.parseInt(majorVersionString);
	return majorVersionNumber;
}
