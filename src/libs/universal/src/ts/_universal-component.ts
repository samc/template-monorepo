import * as React from "react";

import { RC, UniversalProps } from ".";

/**
 * Signature for a React component rendered via `Universal.render()`
 */
export type UniversalComponent<
	TProps extends object,
	TData extends object = {},
> = RC<UniversalProps<TProps, TData>>;
