import { ComponentProps } from "./_component-props";

/**
 * Applies LibraryManagedAttributes (proper handling of defaultProps
 * and propTypes).
 */
export type LibraryManagedProps<C> = JSX.LibraryManagedAttributes<
	C,
	ComponentProps<C>
>;
