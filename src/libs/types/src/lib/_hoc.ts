import { RC } from "./_rc";

/**
 * Higher-order Component
 */
export type HOC<TProps extends object = {}> = (
	C: RC<TProps>,
	...args: unknown[]
) => RC<TProps>;
