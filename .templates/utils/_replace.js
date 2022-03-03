/**
 * Util function to replace matching text in a designated file.
 *
 * @param {string} path - path of the file.
 * @param {string} needle - regex statement used for match operation.
 * @param {string} replacement - replacement text.
 * @param {string} [skip] - regex statement, if provided, attempt a global match against the designated file. If a match is found, the `replace` operation will terminate.
 */
function replace(path, needle, replacement, skip) {
  let file;
  file = fs.readFileSync(path, "utf8");

  if (skip) {
    const match = file.match(skip);
    if (match?.groups?.target) {
      return null;
    }
  }

  file = file.replace(needle, replacement);

  fs.writeFileSync(path, file);
  return null;
}
exports.replace = replace;
