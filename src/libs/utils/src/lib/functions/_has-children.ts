import { isFunction, isObject } from "./_";

/**
 * Returns type `T` if extension of `children` is valid.
 */
type HasChildrenProp<T> = T extends {
	children: (props: unknown) => React.ReactNode;
}
	? T
	: never;

/**
 * Returns true if component props contains `children`.
 */
export function hasChildren<TProps extends unknown>(
	props: TProps,
): props is HasChildrenProp<TProps> {
	return (
		isObject(props) &&
		"children" in props &&
		isFunction((props as HasChildrenProp<TProps>).children)
	);
}
