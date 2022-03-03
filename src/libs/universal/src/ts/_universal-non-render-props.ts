import { UniversalRenderProps } from ".";

/**
 * @todo: re-factor description
 * Universally rendered component props, without render props in `UniversalRenderProps`.
 */
export type UniversalNonRenderProps<
	TProps extends object,
	TData extends object = {},
> = Omit<TProps, keyof UniversalRenderProps<TData>>;
