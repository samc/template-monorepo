import * as Crypto from "crypto";
import * as FS from "fs";
import * as Path from "path";

const ALGO = "sha256";

/**
 * Determines if a file has changed and records a running hash of the file for
 * future comparison.
 *
 * @param {String} path - Path of the file to use for hash lookup / comparison.
 * @param {Object} [tmpdir=.tmp] - Directory to use for temporary fingerprint records.
 *
 * @returns {Boolean}
 */
export function fingerprint(path, tmpdir = ".tmp") {
	let hash = "";

	// Does the designated file exist?
	if (!!!FS.existsSync(Path.resolve(path))) {
		return false;
	}

	// Get the name of the current file.
	const name = Path.basename(path);

	// Handle the hash generation depending on the file type.
	if (FS.lstatSync(path).isDirectory()) {
		hash = getHashForDirectory(path);
	} else {
		hash = getHashForFile(path);
	}

	// If a fingerprint is not already saved, create one, and return true.
	const fingerprintPath = Path.resolve(
		tmpdir,
		"fingerprint",
		`${name}.${ALGO}`,
	);
	if (!!!FS.existsSync(fingerprintPath)) {
		FS.writeFileSync(fingerprintPath, hash, {
			encoding: "utf8",
		});
		return true;
	}

	// Get the hash from the saved fingerprint.
	const fingerprintHash = FS.readFileSync(fingerprintPath, {
		encoding: "utf8",
	}).toString();

	// Compare the hashes. If they are not equal, the file has changed.
	if (hash === fingerprintHash) {
		return false;
	}

	FS.writeFileSync(fingerprintPath, hash, {
		encoding: "utf8",
	});
	return true;
}

/**
 * Get the hash of the combined contents of all files in the designated
 * directory.
 *
 * @param {String} path - Path of the directory to use for hash lookup / comparison.
 *
 * @returns {String}
 */
function getHashForDirectory(path) {
	// List all of the files in the designated directory.
	const files = FS.readdirSync(path);

	// List all of the hashes for the designated files.
	const hashes = files.map((file) => getHashForFile(Path.resolve(path, file)));

	// Get the hash of the file's contents.
	const hash = Crypto.createHash(ALGO).update(hashes.join("")).digest("hex");

	return hash;
}

/**
 * Get the hash of the designated file's contents.
 *
 * @param {String} path - Path of the file to use for hash lookup / comparison.
 *
 * @returns {String}
 */
function getHashForFile(path) {
	// Get the content of the designated file.
	const content = FS.readFileSync(path);

	// Get the hash of the file's contents.
	const hash = Crypto.createHash(ALGO).update(content).digest("hex");

	return hash;
}
