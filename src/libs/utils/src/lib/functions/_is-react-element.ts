/**
 * Returns true if `node` is of type <ReactElement>. If `node` is not,
 * returns false.
 */
export function isReactElement<T = unknown>(
	node: React.ReactNode,
): node is React.ReactElement<T> {
	return (
		typeof node === "object" &&
		typeof (node as React.ReactElement<T>).type !== "undefined" &&
		typeof (node as React.ReactElement<T>).props !== "undefined"
	);
}
