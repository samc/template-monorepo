/**
 * TypeScript's definitions don't include this, though it has decent support in
 * modern browsers.
 *
 * See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/getCanonicalLocales
 */
declare namespace Intl {
	function getCanonicalLocales(locales: readonly string[]): Locales;
}
