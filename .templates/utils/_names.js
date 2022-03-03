/**
 * Util function to generate different strings based off the provided name.
 *
 * @example
 * ```typescript
 * names("my-name")
 * @returns {name: "my-name", className: "MyName", propertyName: "myName", constantName: "MY_NAME", fileName: "my-name"}
 * ```
 *
 * @example
 * ```typescript
 * names("MyName")
 * @returns {name: "my-name", className: "MyName", propertyName: "myName", constantName: "MY_NAME", fileName: "my-name"}
 * ```
 *
 * @param {string} name - name to be converted.
 */
function names(name) {
	return {
		name,
		className: toClassName(name),
		propertyName: toPropertyName(name),
		constantName: toConstantName(name),
		fileName: toFileName(name),
	};
}
exports.names = names;

/**
 * Hyphenated to UpperCamelCase
 */
function toClassName(str) {
	return toCapitalCase(toPropertyName(str));
}

/**
 * Hyphenated to lowerCamelCase
 */
function toPropertyName(s) {
	return s
		.replace(/([^a-zA-Z0-9])+(.)?/g, (_, __, chr) =>
			chr ? chr.toUpperCase() : "",
		)
		.replace(/[^a-zA-Z\d]/g, "")
		.replace(/^([A-Z])/, (m) => m.toLowerCase());
}

/**
 * Hyphenated to CONSTANT_CASE
 */
function toConstantName(s) {
	return s.replace(/([^a-zA-Z0-9])/g, "_").toUpperCase();
}

/**
 * Upper camelCase to lowercase, hyphenated
 */
function toFileName(s) {
	return s
		.replace(/([a-z\d])([A-Z])/g, "$1_$2")
		.toLowerCase()
		.replace(/[ _]/g, "-");
}

/**
 * Capitalizes the first letter of a string
 */
function toCapitalCase(s) {
	return s.charAt(0).toUpperCase() + s.substr(1);
}
