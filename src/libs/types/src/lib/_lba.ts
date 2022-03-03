import { RC } from "./_rc";

/**
 * Shorthand to access the `JSX.LibraryManagedAttributes` prop requirements for a React
 * component. Also adds new prop requirements from `TNeedsProps`.
 */
export type LBA<
	TComponent extends RC,
	TNeedsProps = {},
> = JSX.LibraryManagedAttributes<
	TComponent,
	React.ComponentProps<TComponent> & TNeedsProps
>;
