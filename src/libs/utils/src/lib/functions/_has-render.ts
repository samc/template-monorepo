import { isFunction, isObject } from "./_";

/**
 * Returns type `T` if extension of `render` is valid.
 */
type HasRenderProp<T> = T extends {
	render: (props: unknown) => React.ReactNode;
}
	? T
	: never;

/**
 * Returns true if component props contains `render`.
 */
export function hasRender<T extends unknown>(
	props: T,
): props is HasRenderProp<T> {
	return (
		isObject(props) &&
		"render" in props &&
		isFunction((props as HasRenderProp<T>).render)
	);
}
