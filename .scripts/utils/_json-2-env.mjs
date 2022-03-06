import * as FS from "fs";

/**
 * A Generator that returns a list of environment variables from the provided
 * json object.
 *
 * @param {Object} json
 * @param {String} [prefix=] - The prefix to use for given environment variable.
 *
 *
 * @returns {Commander.Command}
 */
function* _json2env(json, prefix = "") {
	if (typeof json !== "object" || json == null) {
		throw new TypeError("Expected an object");
	}

	for (let [key, value] of Object.entries(json)) {
		// Always transform the incoming key to uppercase.
		key = key.toUpperCase();

		// Replace any dashes with underscores.
		key = key.replace("-", "_");

		if (typeof value === "object") {
			// If the current value in the iteration is a nested object, append the
			// current key with a trailing underscore and call `json2env`
			// recursively.
			key = `${prefix}${key}_`;
			yield* _json2env(value, key);
		} else {
			// If the value is not a json object, create the environment variable
			// entry, and yield.
			const env = `${prefix}${key}=${value}`;
			yield env;
		}
	}
}

/**
 * Generates a `.env` file from the provided `json` object at the designated
 * `path`.
 *
 * @param {Object} json
 * @param {String} path
 *
 * @returns {Promise<void>}
 */
export async function json2env(json, path) {
	const entries = [..._json2env(json)];
	const content = entries.join("\n");
	FS.promises.writeFile(path, content);
}
