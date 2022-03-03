import { UniversalRenderProps } from ".";

/**
 * Component props for a universally rendered component.
 */
export type UniversalProps<
	TProps extends object,
	TData extends object = {},
> = TProps & UniversalRenderProps<TData>;
